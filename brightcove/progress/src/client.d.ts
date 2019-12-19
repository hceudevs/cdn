import { Http } from "./http";
export declare class ProgressPluginClient {
    private iframe;
    private http;
    static readonly PING = "video.progress.ping";
    static readonly PONG = "video.progress.pong";
    static readonly GET_PROGRESS = "video.progress.get";
    static readonly SEND_PROGRESS = "video.progress.set";
    hasPinged: boolean;
    constructor(iframe: HTMLIFrameElement, http: Http);
    ping(): Promise<void>;
    onReady(): Promise<void>;
    sendProgress(): Promise<void>;
}
