import {Http} from "./http";

class ProgressPluginClient {
    static readonly PING          = 'video.progress.ping';
    static readonly PONG          = 'video.progress.pong';
    static readonly GET_PROGRESS  = 'video.progress.get';
    static readonly SEND_PROGRESS = 'video.progress.set';

    hasPinged = false;

    constructor(private iframe: HTMLIFrameElement, private http: Http) {
        iframe.contentWindow.addEventListener('message', (event) => {
            if (event.data.event === ProgressPluginClient.PONG) {
                console.log('plugin', 'PONGed');
                if (!this.hasPinged) {
                    this.hasPinged = true;
                    this.onReady().then();
                }
            }
            if (event.data.event === ProgressPluginClient.SEND_PROGRESS) {
                this.http.setProgress(event.data).then();
            }
        });
        this.ping().then();
    }

    ping() {
        return new Promise(resolve => {
            if (!this.hasPinged) {
                this.iframe.contentWindow.postMessage({
                    event: ProgressPluginClient.PING
                }, '*');
                return new Promise(resolve => setTimeout(() => resolve(), 300))
                    .then(() => this.ping());
            }
            resolve();
        });
    }

    onReady() {
        return this.sendProgress();
    }

    sendProgress() {
        return this.http.getProgress().then(result => {
            this.iframe.contentWindow.postMessage({
                event: ProgressPluginClient.GET_PROGRESS,
                data : result
            }, '*');
        });
    }
}
