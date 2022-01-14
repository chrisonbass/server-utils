var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import toCamelCase from "../util/toCamelCase";
import callApi from "../callApi";
export default class UserServiceClient {
    constructor(args) {
        const { url, realm, client, clientSecret, hostName } = args;
        this.url = url;
        this.realm = realm;
        this.client = client;
        this.clientSecret = clientSecret || null;
        this.hostName = hostName || null;
    }
    parseToken(token) {
        const tokenBody = Buffer.from(token.split(/\./)[1], 'base64').toString('utf8');
        return JSON.parse(tokenBody);
    }
    checkToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let parsedToken = this.parseToken(token);
            let userRecord = null;
            try {
                const issuer = new URL(parsedToken.iss);
                const requestUrl = new URL(`${this.url}realms/${this.realm}/` +
                    `protocol/openid-connect/userinfo`);
                const hostName = issuer.hostname;
                const request = yield callApi(requestUrl.toString(), {
                    headers: {
                        "Host": hostName,
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (request && request.sub) { // .sub is the id in the response
                    let temp = {};
                    Object.keys(request).forEach((key) => {
                        temp[toCamelCase(key)] = request[key];
                    });
                    userRecord = temp;
                }
            }
            catch (e) {
                console.error("Error checking user token\n", e, "\n");
                userRecord = null;
            }
            return userRecord;
        });
    }
}
