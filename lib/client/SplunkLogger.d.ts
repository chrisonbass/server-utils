interface SplunkLoggerArgs {
    token: string;
    url: string;
    source: string;
}
interface SplunkPayloadMetadata {
    source?: string;
    sourcetype?: string;
    event?: string;
    fields?: object;
}
interface LogArg {
    message: object;
    metadata?: SplunkPayloadMetadata;
}
interface SplunkPayload {
    message: any;
    metadata?: SplunkPayloadMetadata;
    severity: "info" | "error" | "debug";
}
interface SplunkLoggerInstance {
    info: (event: LogArg) => void;
    debug: (event: LogArg) => void;
    error: (event: LogArg) => void;
    send: (event: SplunkPayload) => void;
}
export default function SplunkLogger({ token, url, source }: SplunkLoggerArgs): SplunkLoggerInstance;
export {};
