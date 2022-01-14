import toCamelCase from "../util/toCamelCase";
import callApi from "../callApi";

interface UserServiceClientArgs {
  url: string,
  realm: string,
  client: string,
  clientSecret: string | null | undefined,
  hostName: string | null | undefined
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
  clientSecret: string | null | undefined;
  hostName: string | null | undefined;

  constructor(args: UserServiceClient) {
    const {url, realm, client, clientSecret, hostName} = args;
    this.url = url;
    this.realm = realm;
    this.client = client;    
    this.clientSecret = clientSecret || null;
    this.hostName = hostName || null;
  }

  async checkToken(token: string): Promise<UserRecord | null> {
    let userRecord: UserRecord | null = null;
    try {
      const requestUrl = new URL(`${this.url}realms/${this.realm}/` +
        `protocol/openid-connect/userinfo`);
      const hostName = this.hostName || requestUrl.hostname;
      const request = await callApi(hostName.toString(), {
        headers: {
          "Host": hostName,
          "Authorization": `Bearer ${token}` 
        }
      });
      if (request.ok) {
        const requestJson = await request.json();
        let temp: {[key: string] : any} = {};
        Object.keys(requestJson).forEach((key: string) => {
          temp[toCamelCase(key)] = requestJson[key];
        });
        userRecord = (temp as UserRecord);
      }
    } catch (e) {
      userRecord = null;
    }
    return userRecord;
  }
}