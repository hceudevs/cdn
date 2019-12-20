import {Http}                from "./http";
import {fromEvent, interval} from "rxjs";
import {ProgressEvents}      from "./events";
import {first}               from "rxjs/operators";

export class ProgressPluginClient {

    connected = false;

    constructor(private window: Window, private http: Http) {
        console.log('Progress Plugin Client Loaded!');
        fromEvent(this.window, 'message')
            .subscribe(async (event: MessageEvent) => {
                let data = JSON.parse(event.data || '{}');
                if (data.event === ProgressEvents.PONG) {
                    this.connected = true;
                }
                if (data.event === ProgressEvents.GET_PROGRESS) {
                    await this.sendProgress();
                }
                if (data.event === ProgressEvents.SET_PROGRESS) {
                    await this.http.setProgress(data);
                }
            });
        this.ping().then();
    }

    async ping() {
        if (!this.connected) {
            this.window.postMessage(JSON.stringify({
                event: ProgressEvents.PING
            }), '*');
            await interval(500).pipe(first()).toPromise();
            await this.ping();
        }
    }

    async sendProgress() {
        this.window.postMessage(JSON.stringify({
            event: ProgressEvents.GET_PROGRESS_RESPONSE,
            data : await this.http.getProgress()
        }), '*');
    }
}

window['ProgressPluginClient'] = ProgressPluginClient;
