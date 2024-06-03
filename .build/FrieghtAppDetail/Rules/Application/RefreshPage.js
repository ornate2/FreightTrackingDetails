import ApplicationSettings from "../Library/ApplicationSettings";
import CommonLibrary from "../Library/CommonLibrary";
import ValidationLibrary from "../Library/ValidationLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function RefreshPage(clientAPI) {


    if (!ValidationLibrary.evalIsEmpty(ApplicationSettings.getStringArray(clientAPI, 'ShipmentObjectArray'))) {

        let shipmentArray =ApplicationSettings.getStringArray(clientAPI, 'ShipmentObjectArray');
        let updatedObject = CommonLibrary.getStateVariable(clientAPI, 'ShipmentStatusUpdate');
        let currentShipment = '';


        //Set the arrival Flag
        if (updatedObject.eventName === 'Arrival') {
            currentShipment = shipmentArray.find(o => o.ordinalNo === updatedObject.ordinalNo);
            currentShipment.isArrived = 'X';
        }

        //Set Departure Flag
        if (updatedObject.eventName === 'Departure') {
            currentShipment = shipmentArray.find(o => o.ordinalNo === updatedObject.ordinalNo);
            currentShipment.isDeparted = 'X';
        }

        //Set POD Flag
        if (updatedObject.eventName === 'POD') {
            currentShipment = shipmentArray.find(o => o.ordinalNo === updatedObject.ordinalNo);
            currentShipment.isDelivered = 'X';
        }

        // IF Object is matched then Replace it updated event object flag 

        if (!ValidationLibrary.evalIsEmpty(currentShipment)) {
            let obj = shipmentArray.find((o, i) => {
                if (o.ordinalNo === updatedObject.ordinalNo) {
                    shipmentArray[i] = currentShipment;
                    return true; // stop searching
                }
            });

            ApplicationSettings.setStringArray(clientAPI, 'ShipmentObjectArray', shipmentArray);
            CommonLibrary.refreshPage(clientAPI);
        }
    }
}