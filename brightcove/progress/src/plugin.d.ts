export declare class ProgressPlugin {
    private player;
    progress: number;
    duration: number;
    retrievedProgress: boolean;
    listenForWindowEvents(): void;
    listenForBrightcoveEvents(): void;
    listenForHapyakEvents(): void;
    constructor(player: any);
    private trackOnceLoaded;
    trackProgress(): void;
    getProgress(): void;
}
