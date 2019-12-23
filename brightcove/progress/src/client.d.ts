import { Http } from "./http";
export declare class ProgressPluginClient {
    protected window: Window;
    protected http: Http;
    constructor(window: Window, http: Http);
    sendProgress(): Promise<void>;
}
