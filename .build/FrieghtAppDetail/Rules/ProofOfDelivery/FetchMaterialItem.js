/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import ApplicationSettings from '../Library/ApplicationSettings';
import libCom from '../Library/CommonLibrary';
import Logger from '../Library/Logger';
import ValidationLibrary from '../Library/ValidationLibrary';
import TriggerProofOfDelivery from './TriggerProofOfDelivery';
export default function NavToShipmentDetails(clientAPI) {

    try {
        let shipmentNum = ApplicationSettings.getString(clientAPI, 'shipmentNumber');
        if (libCom.isDefined(shipmentNum)) {
            let shipmentObj = libCom.getStateVariable(clientAPI, 'selectedShipment');
            if (!libCom.isDefined(shipmentObj)) {
                libCom.setStateVariable(clientAPI, 'selectedShipment', clientAPI.getPageProxy().getActionBinding());
            }
            clientAPI.showActivityIndicator("Loading");
            return clientAPI.executeAction("/FrieghtAppDetail/Actions/ProofOfDelivery/StoreFetchedMaterialItem.action").then((materialItem) => {
                if (materialItem.data._array.length > 0 && IsValidResponse(clientAPI, materialItem.data._array)) {
                    ApplicationSettings.setStringArray(clientAPI, 'MaterialItemObjectArray', materialItem.data._array);
                    clientAPI.dismissActivityIndicator();
                    let selectedShipmentObj = libCom.getStateVariable(clientAPI, 'selectedShipment');
                    if (selectedShipmentObj.ItemTabClick) {
                        selectedShipmentObj.ItemTabClick = false;
                        libCom.setStateVariable(clientAPI, 'selectedShipmentObj', selectedShipmentObj);
                        return clientAPI.executeAction('/FrieghtAppDetail/Actions/ProofOfDelivery/NavToProofOfDeliveryMateriaReadOnlyList.action');
                    } else {
                        return TriggerProofOfDelivery(clientAPI);
                    }
                }
                //Shipment is Not Valid
                else {
                    clientAPI.dismissActivityIndicator();
                    ApplicationSettings.setStringArray(clientAPI, 'MaterialItemObjectArray', []);
                }
            }, () => {
                clientAPI.dismissActivityIndicator();
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
