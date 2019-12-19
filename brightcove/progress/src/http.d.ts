export interface Http {
    getProgress(): Promise<number>;
    setProgress(value: number): Promise<void>;
}
