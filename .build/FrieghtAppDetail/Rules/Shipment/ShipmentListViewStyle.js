import ApplicationSettings from "../Library/ApplicationSettings";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ShipmentListViewSubhead(clientAPI) {
    try {

        let ShipmentObjectArrayLenght = ApplicationSettings.getStringArray(clientAPI, 'ShipmentObjectArray').length;
        if (clientAPI.binding.isDeparted === 'X'  ||

            // For last object POD is the last action
            ((clientAPI.binding.ordinalNo === ShipmentObjectArrayLenght) && clientAPI.binding.isDelivered)) {
            return 'ZCardTittleGreen';
        }
        else if (clientAPI.binding.active === "X") {
            return 'ZCardTittleOrange';
        }
        else {
            return 'ZCardTittleBlack';
        }

    } catch (error) {

        return 'ZCardTittleBlack';

    }

}


