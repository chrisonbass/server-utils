"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts a mixed-cased string to Camel Case
 *
 * @param text - the kabab, snake
 * @returns
 */
function toCamelCase(text) {
    return "".concat(text).trim()
        // remove special character,
        // and switch letter to upper case
        .replace(/[-_]+\w/, function (matched) {
        return matched.replace(/[-_]+/, '').toUpperCase();
    })
        .replace(/^([A-Z])/, function (m) { return m.toLowerCase(); });
}
exports.default = toCamelCase;
