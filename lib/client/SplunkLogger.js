"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var splunk_logging_1 = require("splunk-logging");
function SplunkLogger(_a) {
    var token = _a.token, url = _a.url, source = _a.source;
    var env = process.env.NODE_ENV || "dev";
    var LOG = new splunk_logging_1.Logger({ token: token, url: url });
    LOG.error = function (err, context) {
        console.log("SplunkLogger Error", err, "context", context);
    };
    function send(_a) {
        var message = _a.message, metadata = _a.metadata, severity = _a.severity;
        var payload = {
            message: __assign({ env: env }, (message || {})),
            metadata: __assign(__assign({}, (metadata || {})), { source: source }),
            severity: severity
        };
        LOG.send(payload);
    }
    function info(_a) {
        var message = _a.message, metadata = _a.metadata;
        send({
            message: message,
            metadata: metadata,
            severity: "info"
        });
    }
    function error(_a) {
        var message = _a.message, metadata = _a.metadata;
        send({
            message: message,
            metadata: metadata,
            severity: "error"
        });
    }
    function debug(_a) {
        var message = _a.message, metadata = _a.metadata;
        send({
            message: message,
            metadata: metadata,
            severity: "debug"
        });
    }
    return {
        send: send,
        info: info,
        error: error,
        debug: debug
    };
}
exports.default = SplunkLogger;
