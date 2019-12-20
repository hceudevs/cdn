import { Http } from "./http";
export declare class ProgressPluginClient {
    private window;
    private http;
    constructor(window: Window, http: Http);
    sendProgress(): Promise<void>;
}
