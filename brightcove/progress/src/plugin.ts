import {fromEvent}                             from "rxjs";
import {filter, first, map, tap, throttleTime} from "rxjs/operators";
import {async}                                 from "rxjs/internal/scheduler/async";

declare const videojs: any;

export class ProgressPlugin {
    static readonly PING         = 'video.progress.ping';
    static readonly PONG         = 'video.progress.pong';
    static readonly GET_PROGRESS = 'video.progress.get';
    static readonly SET_PROGRESS = 'video.progress.set';
    progress                     = 0;
    duration                     = 0;

    constructor(private player: any) {
        fromEvent(window, 'message')
            .pipe(tap((event: any) => {
                if (event.data.event) {
                    console.log('PLUGIN', event);
                }
            }))
            .pipe(filter((event: any) => event.data.event === ProgressPlugin.GET_PROGRESS))
            .subscribe(event => {
                this.progress = event.data.data;
                this.progress = ((event.data.data) / 100) * player.duration;
                if (this.progress > 0) {
                    player.currentTime(this.progress);
                    player.play();
                }
            });
        fromEvent(player, 'loadstart')
            .subscribe(() => {
                this.duration = player.mediainfo.duration;
                this.getProgress();
            });
        fromEvent(player, 'timeupdate')
            .pipe(throttleTime(5000, async, {leading: true, trailing: true}))
            .subscribe(() => {
                console.log(player.currentTime());
                let progress = player.currentTime();
                // When the integer value changes, then update the cookie
                if (Math.round(progress) > this.progress) {
                    this.progress = Math.round(progress) - 2;
                    this.trackProgress();
                }
            });
        fromEvent(player, 'ended')
            .subscribe(() => {
                console.log(player.currentTime());
                this.progress = 100;
                this.trackProgress();
            });

        window.postMessage({
            event: ProgressPlugin.PING
        }, '*');
    }

    trackProgress() {
        window.postMessage({
            event: ProgressPlugin.SET_PROGRESS,
            data : (this.progress / this.duration) * 100
        }, '*');
    }

    getProgress() {
        window.postMessage({
            event: ProgressPlugin.GET_PROGRESS
        }, '*');
    }


}

videojs.registerPlugin('progress', function (options) {
    let player = this;
    console.log('player', player);
    let pluginHandler = new ProgressPlugin(player);
});
