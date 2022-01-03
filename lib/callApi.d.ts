interface ApiOptions {
    body?: any;
    headers?: Object;
    method?: string;
}
export default function callApi(url: string, options?: ApiOptions): Promise<any>;
export {};
