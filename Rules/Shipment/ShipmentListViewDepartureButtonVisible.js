import ApplicationSettings from "../Library/ApplicationSettings";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ShipmentListViewDepartureButtonVisible(clientAPI) {

    let ShipmentObjectArrayLenght = ApplicationSettings.getStringArray(clientAPI, 'ShipmentObjectArray').length;

    try {

        return clientAPI.binding.isDeparted === 'X' ||

            //Departure should not be visible for last Object
            (clientAPI.binding.ordinalNo === ShipmentObjectArrayLenght) ?
            false : true;
    }

    catch (error) {

        return true;

    }

}

