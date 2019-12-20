import { Http } from "./http";
export declare class ProgressPluginClient {
    private window;
    private http;
    connected: boolean;
    constructor(window: Window, http: Http);
    ping(): Promise<void>;
    sendProgress(): Promise<void>;
}
