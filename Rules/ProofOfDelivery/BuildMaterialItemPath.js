import ApplicationSettings from "../Library/ApplicationSettings";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
import libCom from '../Library/CommonLibrary';
export default function BuildShipmentPath(clientAPI) {
    let queryPath = "";
    let shipmentObj = libCom.getStateVariable(clientAPI, 'selectedShipment');
    if (shipmentObj) {
        queryPath = `/trackingItems?$filter=FoId eq '${shipmentObj.shipmentNo}' and locationId eq '${shipmentObj.locationId}'`;
    }
    return queryPath;
}

