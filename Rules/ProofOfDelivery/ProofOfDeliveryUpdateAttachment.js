import ApplicationSettings from "../Library/ApplicationSettings";
import CommonLibrary from "../Library/CommonLibrary";
import ValidationLibrary from "../Library/ValidationLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ProofOfDeliveryUpdateAttachment(clientAPI) {

    try {
        let attachment = CommonLibrary.getStateVariable(clientAPI, 'ShipmentStatusUpdate').attachment;
        return attachment;

    } catch (error) {
        return '';
    }



}

