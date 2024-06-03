import libCom from '../Library/CommonLibrary';

export default function IsEmailSectionVisible(clientAPI) {

    let showEmailID = libCom.getStateVariable(clientAPI, 'ShowEmailIDField');
    if (showEmailID === true) {
        return true;
    }
    return false;
}