import toCamelCase from "../util/toCamelCase";
import callApi from "../callApi";

interface UserServiceClientArgs {
  url: string,
  realm: string,
  client: string,
  clientSecret?: string | null | undefined,
  hostName?: string | null | undefined 
}

interface UserRecord {
	sub: string
	emailVerified: boolean,
	name: string,
	preferredUsername: string,
	givenName: string,
	familyName: string,
	email: string
}

export default class UserServiceClient implements UserServiceClientArgs {
  url: string;
  realm: string;
  client: string;
  clientSecret?: string | null | undefined;
  hostName?: string | null | undefined;

  constructor(args: UserServiceClientArgs) {
    const {url, realm, client, clientSecret, hostName} = args;
    this.url = url;
    this.realm = realm;
    this.client = client;    
    this.clientSecret = clientSecret || null;
    this.hostName = hostName || null;
  }

  parseToken(token: string) {
    const tokenBody = Buffer.from(token.split(/\./)[1], 'base64').toString('utf8');
    return JSON.parse(tokenBody);
  }

  async checkToken(token: string): Promise<UserRecord | null> {
    let parsedToken = this.parseToken(token);
    let userRecord: UserRecord | null = null;
    try {
      const issuer = new URL(parsedToken.iss);
      const requestUrl = new URL(`${this.url}realms/${this.realm}/` +
        `protocol/openid-connect/userinfo`);
      const hostName = issuer.hostname;
      const request = await callApi(requestUrl.toString(), {
        headers: {
          "Host": hostName,
          "Authorization": `Bearer ${token}` 
        }
      });
      if (request && request.sub) { // .sub is the id in the response
        let temp: {[key: string] : any} = {};
        Object.keys(request).forEach((key: string) => {
          temp[toCamelCase(key)] = request[key];
        });
        userRecord = (temp as UserRecord);
      }
    } catch (e) {
      console.error("Error checking user token\n", e, "\n");
      userRecord = null;
    }
    return userRecord;
  }
}