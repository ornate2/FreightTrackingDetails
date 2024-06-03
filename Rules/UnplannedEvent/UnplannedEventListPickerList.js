/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
import eventConstant from "../Constant/UnPlannedEvent";

export default function UnplannedEventListPickerList(clientAPI) {
    var jsonResult = [{
        'DisplayValue': `${eventConstant.LocationUpdate}`,
        'ReturnValue': `${eventConstant.LocationUpdate}`
    },
    {
        'DisplayValue': `${eventConstant.Delay}`,
        'ReturnValue': `${eventConstant.Delay}`
    },
    {
        'DisplayValue': `${eventConstant.ProofOfDelivery}`,
        'ReturnValue': `${eventConstant.ProofOfDelivery}`
    },
    {
        'DisplayValue': `${eventConstant.Handover}`,
        'ReturnValue': `${eventConstant.Handover}`
    }];
    return jsonResult;
}