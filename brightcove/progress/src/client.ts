import {Http}           from "./http";
import {ProgressPlugin} from "./plugin";

export class ProgressPluginClient {

    plugin: typeof ProgressPlugin;

    constructor(protected window: Window, protected http: Http) {
        this.plugin = window['ProgressPlugin'];
        this.plugin.onSetProgress.subscribe(async (progress: number) => {
            console.log('Set Progress');
            await this.http.setProgress(progress);
        });
        this.plugin.onLoaded.subscribe(async () => {
            console.log('Getting Progress');
            this.plugin.onGetProgress.next(await this.http.getProgress());
        });
        console.log('Progress Plugin Client Loaded!');
    }
}

window['ProgressPluginClient'] = ProgressPluginClient;
