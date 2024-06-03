/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function MaterialDescriptionStyle(clientAPI) {
    if (clientAPI.binding.category == "PKG") {
        return "WorkOrderFilterPage_ToolBar";
    }
}