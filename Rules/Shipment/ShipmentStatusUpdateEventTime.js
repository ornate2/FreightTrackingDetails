import ApplicationSettings from "../Library/ApplicationSettings";
import CommonLibrary from "../Library/CommonLibrary";
import ValidationLibrary from "../Library/ValidationLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ShipmentStatusUpdateEventName(clientAPI) {

    try {
       let eventTime = new Date().toJSON();
       return eventTime;

    } catch (error) {
        return '';
    }



}

