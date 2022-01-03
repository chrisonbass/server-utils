"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple Express function for sending a response back with a status code
 *
 * @param res
 * @param code
 * @param body
 */
function respondWithCode(res, code, body) {
    res.status(code);
    res.send(body);
}
exports.default = respondWithCode;
