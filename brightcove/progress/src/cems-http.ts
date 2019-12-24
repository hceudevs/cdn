import {Http}             from "./http";
import {default as Axios} from "axios";

export class CemsHttp implements Http {
    constructor(private enrollmentId: number) {
        if (!this.enrollmentId) {
            console.log('No Enrollment ID, not tracking progress!');
        }
    }

    async getProgress(): Promise<number> {
        try {
            if (!this.enrollmentId) {
                return 0;
            }
            let result = await Axios.get('/enrollment/' + this.enrollmentId + '/progress');
            return result.data;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    async setProgress(value: number): Promise<void> {
        try {
            if (!this.enrollmentId) {
                return null;
            }
            let result = await Axios.post('/enrollment/' + this.enrollmentId + '/progress', {percent: value});
            return result.data;
        } catch (e) {
            console.error(e);
        }
    }

}

window['CemsHttp'] = CemsHttp;
