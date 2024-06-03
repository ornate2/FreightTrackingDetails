/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
import libCom from "../Library/CommonLibrary";
import ApplicationSettings from "../Library/ApplicationSettings";

export default function PostUnplannedEvent(clientAPI) {

    try {

        let shipmentArray = ApplicationSettings.getStringArray(clientAPI, 'ShipmentObjectArray');

        let firstShipmentObj = shipmentArray[0];
        clientAPI.getClientData().altKey = firstShipmentObj.altKey;
        clientAPI.getClientData().eventName = clientAPI.evaluateTargetPath('#Control:EventPkr/#SelectedValue');
        clientAPI.getClientData().reasonCode = clientAPI.evaluateTargetPath('#Control:ReasonCodePkr/#SelectedValue');
        clientAPI.getClientData().locationAltKey = '';
        clientAPI.getClientData().eventTime = '';
        clientAPI.getClientData().stopId = '';
        clientAPI.getClientData().timeZone = '';

        libCom.setStateVariable(clientAPI, 'ShipmentStatusUpdate', clientAPI.getClientData());

        clientAPI.showActivityIndicator("Posting Status");

        return clientAPI.executeAction("/FrieghtAppDetail/Actions/Shipment/ShipmentStatusUpdateRest.action").then(function (response) {
            if (response.data) {
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateSuccessMessage.action").then(() => {
                    return clientAPI.executeAction("/FrieghtAppDetail/Actions/ClosePage.action");
                })

            }
            else {
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action")
            }


        });

    } catch (error) {
        clientAPI.dismissActivityIndicator();
        return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action")
    }


}