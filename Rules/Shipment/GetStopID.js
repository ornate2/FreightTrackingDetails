import CommonLibrary from "../Library/CommonLibrary";

/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function GetStopID(clientAPI) {

    try {
        let stopID = CommonLibrary.getStateVariable(clientAPI, 'ShipmentStatusUpdate').stopId;
        return stopID;
    
      } catch (error) {
        return '';
      }
}