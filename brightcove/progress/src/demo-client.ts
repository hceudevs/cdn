import {ProgressPluginClient} from "./client";
import {Http}                 from "./http";

let progress   = 0;
let http: Http = {
    async getProgress() {
        console.log('Getting Progress', progress);
        return progress;
    },
    async setProgress(value) {
        progress = value;
        console.log('Setting Progress', value);
    }
};
let client     = new ProgressPluginClient(document.getElementById('plugin') as HTMLIFrameElement, http);
