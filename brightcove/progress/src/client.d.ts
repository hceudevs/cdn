import { Http } from "./http";
import { ProgressPlugin } from "./plugin";
export declare class ProgressPluginClient {
    protected window: Window;
    protected http: Http;
    plugin: typeof ProgressPlugin;
    constructor(window: Window, http: Http);
    load(): any;
    private onPluginAvailable;
}
