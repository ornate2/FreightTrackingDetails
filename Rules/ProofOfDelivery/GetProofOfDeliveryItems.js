import ApplicationSettings from "../Library/ApplicationSettings";
import CommonLibrary from "../Library/CommonLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function GetProofOfDeliveryItems(clientAPI) {
    let materialItem = ApplicationSettings.getStringArray(clientAPI, 'MaterialItemObjectArray');
    return materialItem;
}