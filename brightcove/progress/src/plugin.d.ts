export declare class ProgressPlugin {
    private player;
    static readonly PING = "video.progress.ping";
    static readonly PONG = "video.progress.pong";
    static readonly GET_PROGRESS = "video.progress.get";
    static readonly SEND_PROGRESS = "video.progress.set";
    progress: number;
    constructor(player: any);
    trackProgress(): void;
    getProgress(): Promise<number>;
}
