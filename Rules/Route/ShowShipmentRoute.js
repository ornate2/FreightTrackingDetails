/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
import constant from '../Constant/ShipmentConstant';
import ApplicationSettings from '../Library/ApplicationSettings';
export default function ShowShipmentRoute(clientAPI) {
    const utilsModule = clientAPI.nativescript.utilsModule;
    let origin = '';
    let destination = '';
    let wayPoints = '';
    let shipmentObject = ApplicationSettings.getStringArray(clientAPI, 'ShipmentObjectArray');
    if (shipmentObject.length > 1) {
        let shipmentLength = shipmentObject.length;
        let getSortedShipmentObj = sortShipment(shipmentObject);
        origin = constant.origin + calculateDestination(getSortedShipmentObj[0]);
        destination = constant.destination + calculateDestination(getSortedShipmentObj[shipmentLength - 1]);
        wayPoints = constant.wayPoint + calculateWayPoints(getSortedShipmentObj);
        let url = constant.mapBaseUrl + origin + wayPoints + destination + constant.getTravelMode;
        return utilsModule.openUrl(url);
    }
}

function sortShipment(shipArrObj) {
    return shipArrObj.sort((a, b) => a.ordinalNo - b.ordinalNo);
}
function calculateDestination(shipment) {
    return shipment.latitude + ',' + shipment.longitude;
}
function calculateWayPoints(shipment) {
    let wayPtsArr = [];
    for (let i = 1; i < shipment.length - 1; i++) {
        wayPtsArr.push(shipment[i].latitude + ',' + shipment[i].longitude);
    }
    return wayPtsArr.join('|');
}

