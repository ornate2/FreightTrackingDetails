/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/

import CommonLibrary from "../Library/CommonLibrary";

export default async function ShowLocationValues(clientAPI) {
    return CommonLibrary.getStateVariable(clientAPI, 'locationValues');

}
