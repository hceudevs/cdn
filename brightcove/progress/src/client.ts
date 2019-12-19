import {Http}                from "./http";
import {fromEvent, interval} from "rxjs";
import {first, map}          from "rxjs/operators";

export class ProgressPluginClient {
    static readonly PING          = 'video.progress.ping';
    static readonly GET_PROGRESS  = 'video.progress.get';
    static readonly SEND_PROGRESS = 'video.progress.set';
    hasPinged                     = false;

    constructor(private iframe: HTMLIFrameElement, private http: Http) {
        fromEvent(iframe.contentWindow, 'message')
            .pipe(map((event: any) => event.data))
            .subscribe(async (data) => {
                if (data.event === ProgressPluginClient.PING) {
                    if (!this.hasPinged) {
                        this.hasPinged = true;
                        await this.onReady();
                    }
                }
                if (data.event === ProgressPluginClient.SEND_PROGRESS) {
                    await this.http.setProgress(data);
                }
            });
    }

    onReady() {
        return this.sendProgress();
    }

    async sendProgress() {
        this.iframe.contentWindow.postMessage({
            event: ProgressPluginClient.GET_PROGRESS,
            data : await this.http.getProgress()
        }, '*');
    }
}
