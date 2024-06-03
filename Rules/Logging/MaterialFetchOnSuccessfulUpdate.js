/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
import ApplicationSettings from "../Library/ApplicationSettings";
export default function MaterialFetchOnSuccessfulUpdate(clientAPI) {
    return clientAPI.executeAction("/FrieghtAppDetail/Actions/ProofOfDelivery/StoreFetchedMaterialItem.action").then((materialItem) => {
        if (materialItem.data._array.length > 0 && IsValidResponse(clientAPI, materialItem.data._array)) {
            ApplicationSettings.setStringArray(clientAPI, 'MaterialItemObjectArray', materialItem.data._array);
            clientAPI.dismissActivityIndicator();
            return clientAPI.executeAction('/FrieghtAppDetail/Actions/ClosePage.action');
        }
    });
}
export function IsValidResponse(clientAPI, response) {
    try {
        return (!ValidationLibrary.evalIsEmpty(response[0])) && Object.keys(response[0]).length > 0 ? true : false;
    } catch (error) {
        return false;

    }

}