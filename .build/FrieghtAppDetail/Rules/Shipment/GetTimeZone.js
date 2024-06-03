import CommonLibrary from "../Library/CommonLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function GetTimeZone(clientAPI) {

    try {
        let timeZone = CommonLibrary.getStateVariable(clientAPI, 'ShipmentStatusUpdate').timeZone;
        return timeZone;
    
      } catch (error) {
        return '';
      }
}