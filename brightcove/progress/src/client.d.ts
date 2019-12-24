import { Http } from "./http";
import { ProgressPlugin } from "./plugin";
export declare class ProgressPluginClient {
    protected http: Http;
    plugin: typeof ProgressPlugin;
    tick: number;
    timeout: number;
    constructor(http: Http);
    load(): any;
    private onPluginAvailable;
}
