/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ShipmentListViewSubhead(clientAPI) {

    try {

        return clientAPI.binding.ordinalNo === 1 ?
            "Planned Departure At: " + clientAPI.binding.plannedDepTime : "Planned Arrival At: " + clientAPI.binding.plannedDepTime;


    } catch (error) {

        return "Planned Departure At: " + clientAPI.binding.plannedDepTime;

    }

}

