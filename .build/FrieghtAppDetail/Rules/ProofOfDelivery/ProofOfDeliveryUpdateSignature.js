import ApplicationSettings from "../Library/ApplicationSettings";
import CommonLibrary from "../Library/CommonLibrary";
import ValidationLibrary from "../Library/ValidationLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ProofOfDeliveryUpdateSignature(clientAPI) {

    try {
        let signature = CommonLibrary.getStateVariable(clientAPI, 'ShipmentStatusUpdate').signature;
        return signature;

    } catch (error) {
        return '';
    }



}

