import {fromEvent, Subject}             from "rxjs";
import {first, takeUntil, throttleTime} from "rxjs/operators";
import {async}                          from "rxjs/internal/scheduler/async";
import {ProgressEvents}                 from "./events";

declare const videojs: any;

export class ProgressPlugin {
    progress     = 0;
    duration     = 0;
    targetOrigin = '*';

    pinged = new Subject();

    constructor(private player: any) {
        console.log('Progress Plugin Loaded!');
        fromEvent(window, 'message')
            .subscribe((event: MessageEvent) => {
                let data = JSON.parse(event.data || '{}');
                if (data.event === ProgressEvents.PING) {
                    this.pinged.next();
                    this.targetOrigin = event.origin;
                    window.postMessage(JSON.stringify({
                        event: ProgressEvents.PONG
                    }), this.targetOrigin);
                    fromEvent(player, 'loadstart')
                        .pipe(takeUntil(this.pinged))
                        .pipe(first())
                        .subscribe(() => {
                            this.duration = player.mediainfo.duration;
                            this.getProgress();
                        });
                    fromEvent(player, 'timeupdate')
                        .pipe(takeUntil(this.pinged))
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
                        .pipe(takeUntil(this.pinged))
                        .subscribe(() => {
                            this.progress = 100;
                            this.trackProgress();
                        });
                }
                if (data.event === ProgressEvents.GET_PROGRESS_RESPONSE) {
                    this.targetOrigin = event.origin;
                    this.progress     = data.data;
                    this.progress     = ((data.data) / 100) * this.duration;
                    if (this.progress > 0) {
                        player.currentTime(this.progress);
                        player.play();
                    }
                }
            });
    }

    trackProgress() {
        window.postMessage(JSON.stringify({
            event: ProgressEvents.SET_PROGRESS,
            data : (this.progress / this.duration) * 100
        }), this.targetOrigin);
    }

    getProgress() {
        window.postMessage(JSON.stringify({
            event: ProgressEvents.GET_PROGRESS
        }), this.targetOrigin);
    }


}

videojs.registerPlugin('progress', function (options) {
    let player        = this;
    let pluginHandler = new ProgressPlugin(player);
});
