import {ProgressPluginClient} from "./client";
import {Http}                 from "./http";

let progress   = 0;
let http: Http = {
    async getProgress() {
        return progress;
    },
    async setProgress(value) {
        progress = value;
    }
};
let client     = new ProgressPluginClient(document.getElementById('plugin') as HTMLIFrameElement, http);
