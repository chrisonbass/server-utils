"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = exports.randomHash = void 0;
var crypto_1 = require("crypto");
var randomHash = function (length) {
    if (length === void 0) { length = 20; }
    return (0, crypto_1.randomBytes)(length).toString('hex');
};
exports.randomHash = randomHash;
var uuid = function () { return (0, crypto_1.randomUUID)(); };
exports.uuid = uuid;
