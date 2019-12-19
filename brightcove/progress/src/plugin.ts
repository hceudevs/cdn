import {fromEvent}                             from "rxjs";
import {filter, first, map, tap, throttleTime} from "rxjs/operators";
import {async}                                 from "rxjs/internal/scheduler/async";
import {ProgressEvents}                        from "./events";

declare const videojs: any;

export class ProgressPlugin {
    progress = 0;
    duration = 0;

    constructor(private player: any) {
        fromEvent(window, 'message')
            .pipe(tap((event: any) => {
                if (event.data.event) {
                    console.log('PLUGIN', event.data.event);
                }
            }))
            .pipe(filter((event: any) => event.data.event === ProgressEvents.GET_PROGRESS_RESPONSE))
            .subscribe(event => {
                this.progress = event.data.data;
                this.progress = ((event.data.data) / 100) * player.duration;
                if (this.progress > 0) {
                    player.currentTime(this.progress);
                    player.play();
                }
            });
        fromEvent(player, 'loadstart')
            .pipe(first())
            .subscribe(() => {
                this.duration = player.mediainfo.duration;
                console.log('PLUGIN GET PROGRESS');
                this.getProgress();
            });
        fromEvent(player, 'timeupdate')
            .pipe(throttleTime(5000, async, {trailing: true}))
            .subscribe(() => {
                let progress = player.currentTime();
                console.log(progress, this.progress);
                // When the integer value changes, then update the cookie
                if (Math.round(progress) > this.progress) {
                    console.log('We are here');
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
            event: ProgressEvents.PING
        }, '*');
    }

    trackProgress() {
        window.postMessage({
            event: ProgressEvents.SET_PROGRESS,
            data : (this.progress / this.duration) * 100
        }, '*');
    }

    getProgress() {
        window.postMessage({
            event: ProgressEvents.GET_PROGRESS
        }, '*');
    }


}

videojs.registerPlugin('progress', function (options) {
    let player = this;
    console.log('player', player);
    let pluginHandler = new ProgressPlugin(player);
});
