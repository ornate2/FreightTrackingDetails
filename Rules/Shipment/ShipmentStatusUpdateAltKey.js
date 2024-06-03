import ApplicationSettings from "../Library/ApplicationSettings";
import CommonLibrary from "../Library/CommonLibrary";
import ValidationLibrary from "../Library/ValidationLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ShipmentStatusUpdateAltKey(clientAPI) {

    try {
        let altKey = CommonLibrary.getStateVariable(clientAPI, 'ShipmentStatusUpdate').altKey;
        return altKey;

    } catch (error) {
        return '';
    }



}

