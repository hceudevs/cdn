import {fromEvent, Subject}  from "rxjs";
import {first, throttleTime} from "rxjs/operators";
import {async}               from "rxjs/internal/scheduler/async";

declare const videojs: any;

export class ProgressPlugin {
    progress = 0;
    duration = 0;

    static onLoaded      = new Subject<void>();
    static onSetProgress = new Subject<number>();
    static onGetProgress = new Subject<number>();

    listenForGetProgress() {
        ProgressPlugin.onGetProgress
                      .subscribe(value => {
                          this.progress = (value / 100) * this.duration;
                          if (this.progress > 0) {
                              this.player.currentTime(this.progress);
                              this.player.play();
                          }
                          this.listenForProgressEvents();
                      });
    }

    listenForProgressEvents() {
        fromEvent(this.player, 'timeupdate')
            .pipe(throttleTime(5000, async, {trailing: true}))
            .subscribe(() => {
                let progress = this.player.currentTime();
                // When the integer value changes, then update the cookie
                this.trackProgress(Math.round(progress) - 2);
            });
        fromEvent(this.player, 'ended')
            .subscribe(() => {
                this.trackProgress(100);
            });
    }

    constructor(private player: any) {
        console.log('Progress Plugin Loaded!', player);
        this.listenForGetProgress();
        fromEvent(this.player, 'loadstart')
            .pipe(first())
            .subscribe(() => {
                this.duration = this.player.mediainfo.duration;
                ProgressPlugin.onLoaded.next();
            });

    }

    trackProgress(progress: number) {
        this.progress = progress;
        ProgressPlugin.onSetProgress.next((this.progress / this.duration) * 100);
    }


}

window['ProgressPlugin'] = ProgressPlugin;
videojs.registerPlugin('progress', function (options) {
    let player        = this;
    let pluginHandler = new ProgressPlugin(player);
});
