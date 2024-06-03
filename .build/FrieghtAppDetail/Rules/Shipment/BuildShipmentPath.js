import ApplicationSettings from "../Library/ApplicationSettings";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function BuildShipmentPath(clientAPI) {
    let queryPath = "";
    let shipmentNum =  ApplicationSettings.getString(clientAPI, 'shipmentNumber');
    if (shipmentNum) {
        queryPath = `/trackingDetails?$filter=shipmentNo eq '${shipmentNum}'`;
    }
    return queryPath;
}

