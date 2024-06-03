/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
import libCom from './../Library/CommonLibrary';
import restCallMaterialItem from './FetchMaterialItem';
export default function FetchMaterialItemWrapper(clientAPI) {
    let selectedShipment = clientAPI.getPageProxy().getActionBinding();
    selectedShipment.ItemTabClick = true;
    libCom.setStateVariable(clientAPI, 'selectedShipment', selectedShipment);
    return restCallMaterialItem(clientAPI);
}