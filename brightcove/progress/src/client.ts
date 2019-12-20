import {Http}                from "./http";
import {fromEvent, interval} from "rxjs";
import {first, map}          from "rxjs/operators";
import {ProgressEvents}      from "./events";

export class ProgressPluginClient {

    constructor(private iframe: HTMLIFrameElement, private http: Http) {
        fromEvent(window.top, 'message')
            .pipe(map((event: any) => JSON.parse(event.data || '{}')))
            .subscribe(async (data) => {
                if (data.event === ProgressEvents.GET_PROGRESS) {
                    await this.sendProgress();
                }
                if (data.event === ProgressEvents.SET_PROGRESS) {
                    await this.http.setProgress(data);
                }
            });
    }

    async sendProgress() {
        window.top.postMessage(JSON.stringify({
            event: ProgressEvents.GET_PROGRESS_RESPONSE,
            data : await this.http.getProgress()
        }), '*');
    }
}

window['ProgressPluginClient'] = ProgressPluginClient;
