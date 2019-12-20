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
            .pipe(map((event: any) => JSON.parse(event.data || '{}')))
            .pipe(filter((data: any) => data.event === ProgressEvents.GET_PROGRESS_RESPONSE))
            .subscribe(data => {
                this.progress = data.data;
                this.progress = ((data.data) / 100) * this.duration;
                if (this.progress > 0) {
                    player.currentTime(this.progress);
                    player.play();
                }
            });
        fromEvent(player, 'loadstart')
            .pipe(first())
            .subscribe(() => {
                this.duration = player.mediainfo.duration;
                this.getProgress();
            });
        fromEvent(player, 'timeupdate')
            .pipe(throttleTime(5000, async, {trailing: true}))
            .subscribe(() => {
                let progress = player.currentTime();
                // When the integer value changes, then update the cookie
                if (Math.round(progress) > this.progress) {
                    this.progress = Math.round(progress) - 2;
                    this.trackProgress();
                }
            });
        fromEvent(player, 'ended')
            .subscribe(() => {
                this.progress = 100;
                this.trackProgress();
            });

        window.postMessage(JSON.stringify({
            event: ProgressEvents.PING
        }), '*');
    }

    trackProgress() {
        window.postMessage(JSON.stringify({
            event: ProgressEvents.SET_PROGRESS,
            data : (this.progress / this.duration) * 100
        }), '*');
    }

    getProgress() {
        window.postMessage(JSON.stringify({
            event: ProgressEvents.GET_PROGRESS
        }), '*');
    }


}

videojs.registerPlugin('progress', function (options) {
    let player        = this;
    let pluginHandler = new ProgressPlugin(player);
});
