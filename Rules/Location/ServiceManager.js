
import GetCurrentLocation from './GetCurrentLocation';


export default class ServiceManager {
    constructor() {
        this._instance = null;
        this._isEnabled = true;
        this._watchIDs = [];
    }

    static getInstance() {
        return this._instance || (this._instance = new this());
    }

   

    isTrackingEnabled() {
        return this._isEnabled;
    }


    getCurrentLocation() {
        if (this._isEnabled) {
            return GetCurrentLocation();
        }
        return Promise.resolve();
    }
}
