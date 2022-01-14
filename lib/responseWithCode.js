/**
 * Simple Express function for sending a response back with a status code
 *
 * @param res
 * @param code
 * @param body
 */
export default function respondWithCode(res, code, body) {
    res.status(code);
    res.send(body);
}
