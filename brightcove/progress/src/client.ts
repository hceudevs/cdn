import {Http}           from "./http";
import {ProgressPlugin} from "./plugin";
import {interval}       from "rxjs";
import {first}          from "rxjs/operators";

export class ProgressPluginClient {

    plugin: typeof ProgressPlugin;

    constructor(protected window: Window, protected http: Http) {
        this.load().then();
    }

    async load() {
        this.plugin = window['ProgressPlugin'];
        if (this.plugin) {
            this.onPluginAvailable();
            return;
        }
        await interval(500).pipe(first()).toPromise();
        return await this.load();
    }

    private onPluginAvailable() {
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
