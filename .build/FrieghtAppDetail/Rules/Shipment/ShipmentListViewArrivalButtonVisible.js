/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ShipmentListViewArrivalButtonVisible(clientAPI) {

    //Do not Show Arrival Button for first stop
    try {
        return clientAPI.binding.isArrived === 'X' || clientAPI.binding.isDeparted === 'X' || clientAPI.binding.isDelivered === 'X' || clientAPI.binding.ordinalNo === 1?
            false : true;


    } catch (error) {

        return true;

    }

}

