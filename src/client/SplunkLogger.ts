import {Logger} from 'splunk-logging';

interface SplunkLoggerArgs {
  token: string,
  url: string,
  source: string
}

interface SplunkPayloadMetadata {
  source?: string, // app name
  sourcetype?: string, // type of source _json
  event?: string,
  fields?: object
}

interface LogArg {
  message: object,
  metadata?: SplunkPayloadMetadata
}

interface SplunkPayload {
  message: any,
  metadata?: SplunkPayloadMetadata,
  severity: "info" | "error" | "debug"
}

interface SplunkLoggerInstance {
  info: (event: LogArg) => void,
  debug: (event: LogArg) => void,
  error: (event: LogArg) => void,
  send: (event: SplunkPayload) => void,
}

export default function SplunkLogger({token, url, source}: SplunkLoggerArgs): SplunkLoggerInstance {
  const env = process.env.NODE_ENV || "dev";

  const LOG = new Logger({token, url});

  LOG.error = function(err: any, context: any) {
    console.log("SplunkLogger Error", err, "context", context);
  };

  function send({message, metadata, severity}: SplunkPayload) {
    const payload = {
      message: {
        env,
        ...(message || {})
      }, 
      metadata: {
        ...(metadata || {}),
        source,
      }, 
      severity
    };
    LOG.send(payload);
  }

  function info({message, metadata}: LogArg) {
    send({
      message, 
      metadata,
      severity: "info"
    });
  }

  function error({message, metadata}: LogArg) {
    send({
      message, 
      metadata,
      severity: "error"
    });
  }

  function debug({message, metadata}: LogArg) {
    send({
      message, 
      metadata,
      severity: "debug"
    });
  }

  return {
    send,
    info,
    error,
    debug
  };
}