import * as http from 'http';

interface ApiOptions {
    body?: any,
    headers?: Object,
    method?: string
};

export default async function callApi(url: string, options?: ApiOptions) {
    const {
        headers,
        body,
        ...userRequestOptions
    } = options || {};
    let requestBody = body;
    let requestHeaders: any = headers;
    const requestUrl = new URL(url);
    return new Promise((resolve: (response: any) => void, reject: (errorResponse: any) => void) => {
        const path = requestUrl.search ? `${requestUrl.pathname}${requestUrl.search}` : requestUrl.pathname;
        const requestOptions: any = {
           host: requestUrl.hostname,
           path,
           port: requestUrl.port,
           ...userRequestOptions 
        };
        const request = http.request(requestOptions, (res: any) => {
            let data = '';
            res.on('data', (line: string) => {
                data += line;
            });
            res.on('end', () => {
                const status = res.statusCode;
                let parsedData = '';
                if (data && data.trim()) {
                    try {
                        parsedData = JSON.parse(data.trim());
                    } catch (e) {
                        parsedData = data.trim();
                    }
                } 
                if (status >= 200 && status < 400) {
                    resolve(parsedData);
                } else {
                    reject(parsedData);
                }
            });
        });
        request.on('error', (err: any) => {
            reject(err);
        });
        if (requestHeaders && Object.keys(requestHeaders).length) {
            Object.keys(requestHeaders).forEach((header: string) => {
                request.setHeader(header.toLowerCase(), requestHeaders[header]);
            });
        }
        if (requestBody) {
            const data = new TextEncoder().encode(JSON.stringify(requestBody));             
            request.setHeader('Content-Type', 'application/json');
            request.setHeader('Content-Length', data.length);
            request.write(data, () => {
                request.end();
            });
        } else {
            request.end();
        }
    });
}
