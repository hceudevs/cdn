export declare class ProgressPlugin {
    private player;
    progress: number;
    duration: number;
    constructor(player: any);
    trackProgress(): void;
    getProgress(): void;
}
