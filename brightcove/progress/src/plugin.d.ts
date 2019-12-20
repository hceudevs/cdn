import { Subject } from "rxjs";
export declare class ProgressPlugin {
    private player;
    progress: number;
    duration: number;
    pinged: Subject<unknown>;
    constructor(player: any);
    trackProgress(): void;
    getProgress(): void;
}
