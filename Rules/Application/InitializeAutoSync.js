import AutoSyncLibrary from "../AutoSync/AutoSyncLibrary";
import CommonLibrary from "../Library/CommonLibrary";
import ValidationLibrary from "../Library/ValidationLibrary";
import ApplicationSettings from "../Library/ApplicationSettings";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function InitializeAutoSync(clientAPI) {

    CommonLibrary.refreshPage(clientAPI);
    AutoSyncLibrary.autoSyncPeriodically(clientAPI);

}