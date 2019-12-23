import {Http}           from "./http";
import {fromEvent}      from "rxjs";
import {ProgressEvents} from "./events";

export class ProgressPluginClient {


    constructor(protected window: Window, protected http: Http) {
        console.log('Progress Plugin Client Loaded!');
        fromEvent(window, 'message')
            .subscribe(async (event: MessageEvent) => {
                let data = JSON.parse(event.data || '{}');
                if (data.event === ProgressEvents.GET_PROGRESS) {
                    await this.sendProgress();
                }
                if (data.event === ProgressEvents.SET_PROGRESS) {
                    await this.http.setProgress(data);
                }
            });
    }

    async sendProgress() {
        this.window.postMessage(JSON.stringify({
            event: ProgressEvents.GET_PROGRESS_RESPONSE,
            data : await this.http.getProgress()
        }), '*');
    }
}

window['ProgressPluginClient'] = ProgressPluginClient;
