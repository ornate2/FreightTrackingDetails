import ApplicationSettings from "../Library/ApplicationSettings";
import CommonLibrary from "../Library/CommonLibrary";
import ValidationLibrary from "../Library/ValidationLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ShipmentStatusUpdateAltKey(clientAPI) { 

  try {
    let locationAltKey = CommonLibrary.getStateVariable(clientAPI, 'ShipmentStatusUpdate').locationAltKey;
    return locationAltKey;

  } catch (error) {
    return '';
  }



}

