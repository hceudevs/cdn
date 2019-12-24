import {ProgressPluginClient} from "./client";
import {CemsHttp}             from "./cems-http";

export class CemsProgressPluginClient extends ProgressPluginClient {

    constructor(enrollmentId: number) {
        super(new CemsHttp(enrollmentId));
    }
}

window['CemsProgressPluginClient'] = CemsProgressPluginClient;
