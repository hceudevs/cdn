import {fromEvent}           from "rxjs";
import {first, throttleTime} from "rxjs/operators";
import {async}               from "rxjs/internal/scheduler/async";
import {ProgressEvents}      from "./events";

declare const videojs: any;

export class ProgressPlugin {
    progress          = 0;
    duration          = 0;
    retrievedProgress = false;

    listenForWindowEvents() {
        fromEvent(window, 'message')
            .subscribe((event: MessageEvent) => {
                let data = JSON.parse(event.data || '{}');
                if (data.event === ProgressEvents.GET_PROGRESS_RESPONSE) {
                    this.progress = data.data;
                    this.progress = ((data.data) / 100) * this.duration;
                    if (this.progress > 0) {
                        this.player.currentTime(this.progress);
                        this.player.play();
                    }
                    this.retrievedProgress = true;
                }
            });
    }

    listenForBrightcoveEvents() {
        fromEvent(this.player, 'loadstart')
            .pipe(first())
            .subscribe(() => {
                console.log('Load Start');
                this.duration = this.player.mediainfo.duration;
                this.getProgress();
            });
        fromEvent(this.player, 'timeupdate')
            .pipe(throttleTime(5000, async, {trailing: true}))
            .subscribe(() => {
                console.log('Time Update');
                let progress = this.player.currentTime();
                // When the integer value changes, then update the cookie
                this.trackOnceLoaded(progress);
            });
        fromEvent(this.player, 'ended')
            .subscribe(() => {
                this.progress = 100;
                this.trackProgress();
            });
    }

    listenForHapyakEvents() {
        let hapYak = this.player.hapyakViewer;
        fromEvent(hapYak, 'customtrackingevent')
            .subscribe((event: any) => {
                if (['Progress', 'Seeked', 'Resume'].indexOf(event.properties['Action']) !== -1) {
                    this.progress = Number(event.properties['Video Percent Complete'] || 0);
                    if (this.duration === 0) {
                        this.duration = Number(event.properties['Video Duration'] || 0);
                        if (this.duration !== 0) {
                            this.getProgress();
                        }
                    }
                    this.trackProgress();
                }
            });
    }

    constructor(private player: any) {
        console.log('Progress Plugin Loaded!', player);
        this.listenForWindowEvents();
        if (player.hapyakViewer) {
            console.log('Listening for HapYak Events');
            this.listenForHapyakEvents();
        } else {
            console.log('Listening for Brightcove Events');
            this.listenForBrightcoveEvents();
        }
    }

    private trackOnceLoaded(progress: number) {
        if (this.retrievedProgress) {
            this.progress = Math.round(progress) - 2;
            this.trackProgress();
        }
    }

    trackProgress() {
        window.parent.postMessage(JSON.stringify({
            event: ProgressEvents.SET_PROGRESS,
            data : (this.progress / this.duration) * 100
        }), '*');
    }

    getProgress() {
        window.parent.postMessage(JSON.stringify({
            event: ProgressEvents.GET_PROGRESS
        }), '*');
    }


}

videojs.registerPlugin('progress', function (options) {
    let player        = this;
    let pluginHandler = new ProgressPlugin(player);
});
