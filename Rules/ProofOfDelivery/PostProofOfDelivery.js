/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
import libCom from '../Library/CommonLibrary';
import base64 from '../Library/Base64Library';
import IsAndroid from '../Library/IsAndroid';
export default async function PostProofOfDelivery(clientAPI) {

    try {
        let currentObject = clientAPI.getPageProxy().getActionBinding();
        var formCellContainer = "";
        let attachmentCtrlValue = "";
        let signatureCtrlValue = "";

        if(!libCom.isDefined(currentObject)){
            currentObject = clientAPI.binding;
             formCellContainer = clientAPI.getControl('FormCellContainer');
             attachmentCtrlValue = formCellContainer.getControl('Attachment').getValue();
             signatureCtrlValue = formCellContainer.getControl('SignatureCaptureFormCell').getValue();
             if(libCom.isDefined(attachmentCtrlValue)){
              let base64EncodedAttachment = base64.transformBinaryToBase64(IsAndroid(clientAPI),attachmentCtrlValue[0].content);
                clientAPI.getClientData().attachment = base64EncodedAttachment;
             }else{
                clientAPI.getClientData().attachment = '';
             }
             if(libCom.isDefined(signatureCtrlValue)){
              let base64EncodedSignature = base64.transformBinaryToBase64(IsAndroid(clientAPI),signatureCtrlValue.content);
                clientAPI.getClientData().signature = base64EncodedSignature;
             }else{
                clientAPI.getClientData().signature = '';
             }
        }
            clientAPI.getClientData().altKey = currentObject.altKey,
            clientAPI.getClientData().locationAltKey = currentObject.locationAltKey,
            clientAPI.getClientData().eventName = "POD",
            clientAPI.getClientData().eventTime = new Date().toJSON();
            clientAPI.getClientData().stopId = currentObject.stopId;
            clientAPI.getClientData().timeZone = currentObject.timeZone;
            clientAPI.getClientData().ordinalNo= currentObject.ordinalNo;

            libCom.setStateVariable(clientAPI, 'ShipmentStatusUpdate', clientAPI.getClientData());
            clientAPI.showActivityIndicator("Posting Status");
        return clientAPI.executeAction("/FrieghtAppDetail/Actions/Shipment/ShipmentStatusUpdateRest.action").then(function (response) {
            if (response.data) {
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateSuccessMessage.action").then(function () {
                    return clientAPI.executeAction("/FrieghtAppDetail/Actions/ClosePage.action");
                });

            }
            else {
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action").then(function () {
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/ClosePage.action");
                });
            }


        }).catch((failure)=>{
            console.log('AttachmentUpload', failure);
            clientAPI.dismissActivityIndicator();
            return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action");
        });

    } catch (error) {
        return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action").then(function () {
            return clientAPI.executeAction("/FrieghtAppDetail/Actions/ClosePage.action");
            });
    }
}