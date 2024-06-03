/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ShipmentListViewPODButtonVisible(clientAPI) {

     //Do not Show POD Button for first stop
     try {

        return  clientAPI.binding.isDeparted === 'X' || clientAPI.binding.isDelivered === 'X' || clientAPI.binding.ordinalNo === 1?
            false : true;


    } catch (error) {

        return true;

    }


}

