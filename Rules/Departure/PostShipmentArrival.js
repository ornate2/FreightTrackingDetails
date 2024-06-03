/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
import libCom from "../Library/CommonLibrary";

export default async function PostShipmentDeparture(clientAPI) {

    try {

        let currentObject = clientAPI.getPageProxy().getActionBinding();
            clientAPI.getClientData().altKey = currentObject.altKey,
            clientAPI.getClientData().locationAltKey = currentObject.locationAltKey,
            clientAPI.getClientData().eventName = "Arrival",
            clientAPI.getClientData().eventTime = new Date().toJSON();
            clientAPI.getClientData().stopId = currentObject.stopId
            clientAPI.getClientData().timeZone = currentObject.timeZone;
            clientAPI.getClientData().ordinalNo= currentObject.ordinalNo;
            
        libCom.setStateVariable(clientAPI, 'ShipmentStatusUpdate', clientAPI.getClientData());

        clientAPI.showActivityIndicator("Posting Status");

        return clientAPI.executeAction("/FrieghtAppDetail/Actions/Shipment/ShipmentStatusUpdateRest.action").then(function (response) {
            if (response.data) {
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateSuccessMessage.action");

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