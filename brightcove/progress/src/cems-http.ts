import {Http}             from "./http";
import {default as Axios} from "axios";

export class CemsHttp implements Http {
    constructor(private enrollmentId: number) {

    }

    async getProgress(): Promise<number> {
        try {
            return await Axios.get('/enrollment/' + this.enrollmentId + '/progress');
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    async setProgress(value: number): Promise<void> {
        try {
            return await Axios.post('/enrollment/' + this.enrollmentId + '/progress', {progress: value});
        } catch (e) {
            console.error(e);
        }
    }

}

window['CemsHttp'] = CemsHttp;
