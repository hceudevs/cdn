import {ProgressPluginClient} from "./client";
import {CemsHttp}             from "./cems-http";

export class CemsProgressPluginClient extends ProgressPluginClient {

    constructor(window: Window, enrollmentId: number) {
        super(window, new CemsHttp(enrollmentId));
    }
}

window['CemsProgressPluginClient'] = CemsProgressPluginClient;
