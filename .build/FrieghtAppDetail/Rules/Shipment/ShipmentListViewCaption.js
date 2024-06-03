import ApplicationSettings from "../Library/ApplicationSettings";
import ValidationLibrary from "../Library/ValidationLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function BuildShipmentPath(clientAPI) {

    try {

        let shipmentNum = ApplicationSettings.getString(clientAPI, 'shipmentNumber');

        if (ValidationLibrary.evalIsEmpty(shipmentNum)) {
            return '';
        }
        else {
            return `Shipment Details (${shipmentNum})`;
        }

    } catch (error) {

    }

    return '';

}

