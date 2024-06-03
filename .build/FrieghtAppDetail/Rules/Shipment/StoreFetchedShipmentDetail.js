/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import libCom from '../Library/CommonLibrary';
export default function StoreFetchedShipmentDetail(clientAPI) {
    //Store the user entered shipment number
    let shipmentNum = clientAPI.evaluateTargetPathForAPI('#Control:ShipmentNumber').getValue();
    if (libCom.isDefined(shipmentNum)) {
        libCom.setStateVariable(clientAPI, 'shipmentNumber', shipmentNum);
        clientAPI.showActivityIndicator("Loading");
        return clientAPI.executeAction("/FrieghtAppDetail/Actions/Shipment/StoreFetchedShipmentDetail.action").then((result) => {
            if (result.data._array.length>0) {
                libCom.setStateVariable(clientAPI, 'ShipmentObject', result.data._array);
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction('/FrieghtAppDetail/Actions/Shipment/NavToShipmentList.action');
            }
            clientAPI.dismissActivityIndicator();
        },()=>{
            clientAPI.dismissActivityIndicator();
        });
    }
    //Show error dialog
}
