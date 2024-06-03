import CommonLibrary from "../Library/CommonLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function TriggerProofOfDelivery(clientAPI) {

    return clientAPI.executeAction('/FrieghtAppDetail/Actions/ProofOfDelivery/PoolOfDeliveryDialogMessage.action').then(function (result) {
        if (result.data === true) {
            CommonLibrary.setStateVariable(clientAPI, 'ShowEmailIDField', true);
            return clientAPI.executeAction("/FrieghtAppDetail/Actions/ProofOfDelivery/NavToProofOfDeliveryMaterialList.action");
        } else {
            CommonLibrary.setStateVariable(clientAPI, 'ShowEmailIDField', false);
            return clientAPI.executeAction("/FrieghtAppDetail/Actions/ProofOfDelivery/ProofDeliveryCaptureSignature.action");
        }
    });
}