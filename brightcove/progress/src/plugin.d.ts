import { Subject } from "rxjs";
export declare class ProgressPlugin {
    private player;
    progress: number;
    duration: number;
    retrievedProgress: boolean;
    static onLoaded: Subject<void>;
    static onSetProgress: Subject<number>;
    static onGetProgress: Subject<number>;
    listenForGetProgress(): void;
    listenForProgressEvents(): void;
    constructor(player: any);
    trackProgress(progress: number): void;
}
