import {Http}             from "./http";
import {default as Axios} from "axios";

export class CemsHttp implements Http {
    constructor(private enrollmentId: number) {
        console.log(this.enrollmentId);
    }

    async getProgress(): Promise<number> {
        try {
            let result = await Axios.get('/enrollment/' + this.enrollmentId + '/progress');
            return result.data;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    async setProgress(value: number): Promise<void> {
        try {
            let result = await Axios.post('/enrollment/' + this.enrollmentId + '/progress', {progress: value});
            return result.data;
        } catch (e) {
            console.error(e);
        }
    }

}

window['CemsHttp'] = CemsHttp;
