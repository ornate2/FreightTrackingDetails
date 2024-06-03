/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import ApplicationSettings from '../Library/ApplicationSettings';
import libCom from '../Library/CommonLibrary';
import Logger from '../Library/Logger';
import ValidationLibrary from '../Library/ValidationLibrary';
export default function NavToShipmentDetails(clientAPI) {

    try {
        //Store the user entered shipment number
        let shipmentNum = clientAPI.evaluateTargetPathForAPI('#Control:ShipmentNumber').getValue();
        //If user has entered/scanned the shipment number then fetch the shipment detail
        if (libCom.isDefined(shipmentNum)) {
            ApplicationSettings.setString(clientAPI, 'shipmentNumber', shipmentNum);
            clientAPI.showActivityIndicator("Loading");
            return clientAPI.executeAction("/FrieghtAppDetail/Actions/Shipment/StoreFetchedShipmentDetail.action").then((result) => {
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UnplannedEvent/StoreFetchedUnplannedEventReasonCode.action").then((reasonCode) => {
                    return clientAPI.executeAction("/FrieghtAppDetail/Actions/UnplannedEvent/StoreFetchedUnplannedEventCode.action").then((unplannedEventResult) => {
                        if (result.data._array.length > 0 && IsValidResponse(clientAPI, result.data._array)) {
                            ApplicationSettings.setStringArray(clientAPI, 'ShipmentObjectArray', result.data._array);
                            libCom.setStateVariable(clientAPI, 'ShipmentObject', result.data._array);
                            //Store Uplanned event Reason code 
                            ApplicationSettings.setStringArray(clientAPI, 'ReasonCodeArray', reasonCode.data._array);
                            ApplicationSettings.setStringArray(clientAPI, 'UnplannedEventArray', unplannedEventResult.data._array);
                            clientAPI.dismissActivityIndicator();


                            return clientAPI.executeAction('/FrieghtAppDetail/Actions/CloseModalPage_Complete.action');

                        }
                        //Shipment is Not Valid
                        else {
                            clientAPI.dismissActivityIndicator();

                            return clientAPI.executeAction('/FrieghtAppDetail/Actions/CloseModalPage_Complete.action').then(function () {
                                ApplicationSettings.setStringArray(clientAPI, 'ShipmentObjectArray', []);
                            });
                        }
                    }, () => {
                        clientAPI.dismissActivityIndicator();
                    });
                });
            });
        }
        //Show error dialog
    }

    catch (error) {
        clientAPI.dismissActivityIndicator();
        Logger.error('Failed to fetch Shipment', error);

    }
}

export function IsValidResponse(clientAPI, response) {
    try {
        return (!ValidationLibrary.evalIsEmpty(response[0])) && Object.keys(response[0]).length > 0 ? true : false;
    } catch (error) {
        return false;

    }

}
