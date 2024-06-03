import ApplicationSettings from "../Library/ApplicationSettings";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ShipmentListViewIcon(clientAPI) {
    try {

        let ShipmentObjectArrayLenght = ApplicationSettings.getStringArray(clientAPI, 'ShipmentObjectArray').length;

        if (clientAPI.binding.isDeparted === 'X' ||
            // For last object POD is the last action
            ((clientAPI.binding.ordinalNo === ShipmentObjectArrayLenght) && clientAPI.binding.isDelivered)) {
            return '/FrieghtAppDetail/Images/greentruck.png';
        }
        else if (clientAPI.binding.active === "X") {
            return '/FrieghtAppDetail/Images/orangetruck.png';
        }
        else {
            return '/FrieghtAppDetail/Images/TruckNormal.png';
        }


    } catch (error) {

        return '/FrieghtAppDetail/Images/TruckNormal.png';

    }

}

