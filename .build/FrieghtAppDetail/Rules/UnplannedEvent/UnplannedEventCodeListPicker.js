import ApplicationSettings from "../Library/ApplicationSettings";
import CommonLibrary from "../Library/CommonLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function UnplannedEventReasonCodeListPicker(clientAPI) {
    var jsonResult = [];
    let reasonCode = ApplicationSettings.getStringArray(clientAPI, 'UnplannedEventArray');
    reasonCode.map(item =>
        jsonResult.push(
            {
                'DisplayValue': `${item.eventName}`,
                'ReturnValue': `${item.eventCode}`
            })
    );
    return jsonResult;
}