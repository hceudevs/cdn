import {ProgressPluginClient} from "./client";
import {Http}                 from "./http";

let progress   = 0;
let http: Http = {
    async getProgress() {
        console.log('retrieving progress', progress);
        return progress;
    },
    async setProgress(value) {
        progress = value;
        console.log('Received progress', value);
    }
};
let client     = new ProgressPluginClient(document.getElementById('plugin') as HTMLIFrameElement, http);
