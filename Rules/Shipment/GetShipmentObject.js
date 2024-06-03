import ApplicationSettings from "../Library/ApplicationSettings";
import CommonLibrary from "../Library/CommonLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function GetShipmentObject(clientAPI) {
    let page = clientAPI.evaluateTargetPath('#Page:' + 'ShipmentListView');
    //let shipmentObject = page.context.clientData.ShipmentObject;
   
    //ApplicationSettings.setString(clientAPI, 'ShipmentObjectArray', result.data._array);
    let shipmentObject = ApplicationSettings.getStringArray(clientAPI, 'ShipmentObjectArray');
    return shipmentObject;
}