import libCom from '../Library/CommonLibrary';
export default function GetShipmentNumForMaterialUpdate(clientAPI) {
    let shipmentObj = libCom.getStateVariable(clientAPI, 'selectedShipment');
    if (shipmentObj) {
        return shipmentObj.shipmentNo;
    }
}