import { Http } from "./http";
import { ProgressPlugin } from "./plugin";
export declare class ProgressPluginClient {
    protected http: Http;
    plugin: typeof ProgressPlugin;
    constructor(http: Http);
    load(): any;
    private onPluginAvailable;
}
