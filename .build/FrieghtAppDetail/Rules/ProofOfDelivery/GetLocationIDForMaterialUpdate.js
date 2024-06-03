import libCom from '../Library/CommonLibrary';

export default function GetLocationIDForMaterialUpdate(clientAPI) {
    let shipmentObj = libCom.getStateVariable(clientAPI, 'selectedShipment');
    if (shipmentObj) {
        return shipmentObj.locationId;
    }
}