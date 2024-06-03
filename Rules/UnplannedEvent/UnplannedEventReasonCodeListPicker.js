import ApplicationSettings from "../Library/ApplicationSettings";
import CommonLibrary from "../Library/CommonLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function UnplannedEventReasonCodeListPicker(clientAPI) {
    var jsonResult = [];
    let page = clientAPI.evaluateTargetPath('#Page:' + 'ShipmentListView');
    let reasonCode = ApplicationSettings.getStringArray(clientAPI, 'ReasonCodeArray');
    reasonCode.map(item =>
        jsonResult.push(
            {
                'DisplayValue': `${item.name}`,
                'ReturnValue': `${item.code}`
            })
    );
    return jsonResult;
}