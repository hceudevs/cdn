import { Http } from "./http";
export declare class ProgressPluginClient {
    private iframe;
    private http;
    constructor(iframe: HTMLIFrameElement, http: Http);
    sendProgress(): Promise<void>;
}
