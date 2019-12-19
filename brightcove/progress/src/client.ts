import {Http}                from "./http";
import {fromEvent, interval} from "rxjs";
import {first, map}          from "rxjs/operators";

export class ProgressPluginClient {
    static readonly PING         = 'video.progress.ping';
    static readonly GET_PROGRESS = 'video.progress.get';
    static readonly SET_PROGRESS = 'video.progress.set';

    constructor(private iframe: HTMLIFrameElement, private http: Http) {
        fromEvent(iframe.contentWindow, 'message')
            .pipe(map((event: any) => event.data))
            .subscribe(async (data) => {
                if (data.event) {
                    console.log('CLIENT', data);
                }
                if (data.event === ProgressPluginClient.GET_PROGRESS) {
                    await this.sendProgress();
                }
                if (data.event === ProgressPluginClient.SET_PROGRESS) {
                    await this.http.setProgress(data);
                }
            });
    }

    async sendProgress() {
        this.iframe.contentWindow.postMessage({
            event: ProgressPluginClient.GET_PROGRESS,
            data : await this.http.getProgress()
        }, '*');
    }
}
