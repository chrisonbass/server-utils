var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as http from 'http';
;
export default function callApi(url, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const _a = options || {}, { headers, body } = _a, userRequestOptions = __rest(_a, ["headers", "body"]);
        let requestBody = body;
        let requestHeaders = headers;
        const requestUrl = new URL(url);
        return new Promise((resolve, reject) => {
            const path = requestUrl.search ? `${requestUrl.pathname}${requestUrl.search}` : requestUrl.pathname;
            const requestOptions = Object.assign({ host: requestUrl.hostname, path, port: requestUrl.port }, userRequestOptions);
            const request = http.request(requestOptions, (res) => {
                let data = '';
                res.on('data', (line) => {
                    data += line;
                });
                res.on('end', () => {
                    const status = res.statusCode;
                    let parsedData = '';
                    if (data && data.trim()) {
                        try {
                            parsedData = JSON.parse(data.trim());
                        }
                        catch (e) {
                            parsedData = data.trim();
                        }
                    }
                    if (status >= 200 && status < 400) {
                        resolve(parsedData);
                    }
                    else {
                        reject(parsedData);
                    }
                });
            });
            request.on('error', (err) => {
                reject(err);
            });
            if (requestHeaders && Object.keys(requestHeaders).length) {
                Object.keys(requestHeaders).forEach((header) => {
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
            }
            else {
                request.end();
            }
        });
    });
}
