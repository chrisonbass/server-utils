interface UserServiceClientArgs {
    url: string;
    realm: string;
    client: string;
    clientSecret: string | null | undefined;
    hostName: string | null | undefined;
}
interface UserRecord {
    sub: string;
    emailVerified: boolean;
    name: string;
    preferredUsername: string;
    givenName: string;
    familyName: string;
    email: string;
}
export default class UserServiceClient implements UserServiceClientArgs {
    url: string;
    realm: string;
    client: string;
    clientSecret: string | null | undefined;
    hostName: string | null | undefined;
    constructor(args: UserServiceClient);
    checkToken(token: string): Promise<UserRecord | null>;
}
export {};
