import { Http } from "./http";
export declare class CemsHttp implements Http {
    private enrollmentId;
    constructor(enrollmentId: number);
    getProgress(): Promise<number>;
    setProgress(value: number): Promise<void>;
}
