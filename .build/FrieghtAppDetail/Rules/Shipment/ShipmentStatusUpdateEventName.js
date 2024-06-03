import ApplicationSettings from "../Library/ApplicationSettings";
import CommonLibrary from "../Library/CommonLibrary";
import ValidationLibrary from "../Library/ValidationLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ShipmentStatusUpdateEventName(clientAPI) {

    try {
        let eventName = CommonLibrary.getStateVariable(clientAPI, 'ShipmentStatusUpdate').eventName;
        return eventName;

    } catch (error) {
        return '';
    }



}

