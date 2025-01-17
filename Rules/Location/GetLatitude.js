/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
import * as geolocation from "@nativescript/geolocation";
import { CoreTypes } from "@nativescript/core";
export default async function GetLatitude(clientAPI) {
    var logger = clientAPI.getLogger();
    console.log("Current Log Level: " + logger.getLevel());
    // check if geolocation is not enabled
    var locationIsEnabled = await geolocation.isEnabled();
    if (!locationIsEnabled) {
        // request for the user to enable it
        await geolocation.enableLocationRequest();
    }
    // Get current location with high accuracy
    return geolocation.getCurrentLocation({
        desiredAccuracy: CoreTypes.Accuracy.high, //This will return the finest location available
        updateDistance: 5, //Update distance filter in meters.
        timeout: 11000 //How long to wait for a location in ms.
    }).then(function (loc) {
        if (loc) {
            return loc.latitude;
        }
    }, function (e) {
        logger.log(e.message, 'ERROR');
    });
}
