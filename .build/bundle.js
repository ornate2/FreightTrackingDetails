/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/FrieghtAppDetail/i18n/i18n.properties":
/*!*****************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/i18n/i18n.properties ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Application/AppUpdateFailure.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Application/AppUpdateFailure.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/FrieghtAppDetail/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Application/AppUpdateSuccess.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Application/AppUpdateSuccess.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/FrieghtAppDetail/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/FrieghtAppDetail/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Application/ClientIsMultiUserMode.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Application/ClientIsMultiUserMode.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Application/GetClientSupportVersions.js":
/*!******************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Application/GetClientSupportVersions.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Application/GetClientVersion.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Application/GetClientVersion.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Application/InitializeAutoSync.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Application/InitializeAutoSync.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InitializeAutoSync)
/* harmony export */ });
/* harmony import */ var _AutoSync_AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AutoSync/AutoSyncLibrary */ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncLibrary.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");





/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function InitializeAutoSync(clientAPI) {

    _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].refreshPage(clientAPI);
    _AutoSync_AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].autoSyncPeriodically(clientAPI);

}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Application/OnWillUpdate.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Application/OnWillUpdate.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/FrieghtAppDetail/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Application/RefreshPage.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Application/RefreshPage.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RefreshPage)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");




/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function RefreshPage(clientAPI) {


    if (!_Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_2__["default"].evalIsEmpty(_Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].getStringArray(clientAPI, 'ShipmentObjectArray'))) {

        let shipmentArray =_Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].getStringArray(clientAPI, 'ShipmentObjectArray');
        let updatedObject = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getStateVariable(clientAPI, 'ShipmentStatusUpdate');
        let currentShipment = '';


        //Set the arrival Flag
        if (updatedObject.eventName === 'Arrival') {
            currentShipment = shipmentArray.find(o => o.ordinalNo === updatedObject.ordinalNo);
            currentShipment.isArrived = 'X';
        }

        //Set Departure Flag
        if (updatedObject.eventName === 'Departure') {
            currentShipment = shipmentArray.find(o => o.ordinalNo === updatedObject.ordinalNo);
            currentShipment.isDeparted = 'X';
        }

        //Set POD Flag
        if (updatedObject.eventName === 'POD') {
            currentShipment = shipmentArray.find(o => o.ordinalNo === updatedObject.ordinalNo);
            currentShipment.isDelivered = 'X';
        }

        // IF Object is matched then Replace it updated event object flag 

        if (!_Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_2__["default"].evalIsEmpty(currentShipment)) {
            let obj = shipmentArray.find((o, i) => {
                if (o.ordinalNo === updatedObject.ordinalNo) {
                    shipmentArray[i] = currentShipment;
                    return true; // stop searching
                }
            });

            _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].setStringArray(clientAPI, 'ShipmentObjectArray', shipmentArray);
            _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].refreshPage(clientAPI);
        }
    }
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Application/ResetAppSettingsAndLogout.js":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/FrieghtAppDetail/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncLibrary.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncLibrary.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoSyncLibrary)
/* harmony export */ });
/* harmony import */ var _NetworkMonitoringLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NetworkMonitoringLibrary */ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/NetworkMonitoringLibrary.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Library/Logger */ "./build.definitions/FrieghtAppDetail/Rules/Library/Logger.js");
/* harmony import */ var _AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AutoSyncLibrary */ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncLibrary.js");
/* harmony import */ var _Constant_AutoSyncConstant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Constant/AutoSyncConstant */ "./build.definitions/FrieghtAppDetail/Rules/Constant/AutoSyncConstant.js");
/* harmony import */ var _Location_GetCurrentLocation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Location/GetCurrentLocation */ "./build.definitions/FrieghtAppDetail/Rules/Location/GetCurrentLocation.js");
/* harmony import */ var _Location_ServiceManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Location/ServiceManager */ "./build.definitions/FrieghtAppDetail/Rules/Location/ServiceManager.js");
/* harmony import */ var _Location_GetCordinates__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Location/GetCordinates */ "./build.definitions/FrieghtAppDetail/Rules/Location/GetCordinates.js");
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");












class AutoSyncLibrary {

    static autoSync(context) {
        const autoSyncConst = "AUTO_SYNC";
        if (_AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_3__["default"].didThresholdPeriodPass(context)) {
            if (!_NetworkMonitoringLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].isNetworkConnected(context)) {
                _Library_Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(autoSyncConst, 'no network connection');
                // setTimeout is required to display an error message after all other actions (navigation, success message) have completed.
                setTimeout(() => {
                    context.executeAction('/FrieghtAppDetail/Actions/AutoSync/AutoSyncFailureMessage.action');
                }, 5000);
                return false;
            }

            // locSvcMgr.getInstance().getCurrentLocation().then((geoJson) => {

            /*return GetCoordinates(context).then(function (locationMessage) {

                CommonLib.setStateVariable(context, 'locationValues', locationMessage);
                // here trigger action to update Lat and long periodically for time being calling default action
                context.executeAction('/FrieghtAppDetail/Actions/AutoSync/LocationCordinatesBannerMessage.action');
            });*/

            context.getClientData().altKey = _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_8__["default"].getStringArray(context, 'ShipmentObjectArray')[0].altKey,
            context.getClientData().eventName = "LocationUpdate",
            context.getClientData().eventTime = new Date().toJSON();

            _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].setStateVariable(context, 'ShipmentStatusUpdate', context.getClientData());

            return context.executeAction("/FrieghtAppDetail/Actions/Shipment/ShipmentStatusUpdateRest.action");
        }
    }

    static isPeriodicAutoSyncEnabled(context) {
        return _Constant_AutoSyncConstant__WEBPACK_IMPORTED_MODULE_4__["default"].ActivatePeriodicAutoSync;
    }


    static getAutoSyncPeriodValue(context) {
        return _Constant_AutoSyncConstant__WEBPACK_IMPORTED_MODULE_4__["default"].AutoSyncDuration;
    }


    static autoSyncPeriodically(context) {
        // clear previous interval if exists
        const existingInterval = _Constant_AutoSyncConstant__WEBPACK_IMPORTED_MODULE_4__["default"].AutoSyncDuration;;
        if (_Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].isDefined(existingInterval)) {
            clearInterval(existingInterval);
            _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(context, 'autoSyncIntervalID');
        }
        if (_AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_3__["default"].isPeriodicAutoSyncEnabled(context)) {
            const interval = _AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_3__["default"].getAutoSyncPeriodValue(context) * 60 * 1000; // value comes in minutes, so convert to ms

            if(!_Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_9__["default"].evalIsEmpty(_Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_8__["default"].getStringArray(context, 'ShipmentObjectArray')))
            {
                let shipmentArray = _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_8__["default"].getStringArray(context, 'ShipmentObjectArray');
                if(!_Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_9__["default"].evalIsEmpty(shipmentArray[0]))
                {
                    let shipmentObj = shipmentArray[0];
                    //Need input from Pushpak Sir then activate this field 
                    //interval = shipmentObj.plannedDistance;

                }


            }
            const intervalID = setInterval(_AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_3__["default"].autoSync, interval, context);
            _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].setStateVariable(context, 'autoSyncIntervalID', intervalID);
        }

        return true;
    }


    static didThresholdPeriodPass(context) {
        const thresholdPeriod = _Constant_AutoSyncConstant__WEBPACK_IMPORTED_MODULE_4__["default"].AutoSyncDuration;
        const lastAutoSync = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getStateVariable(context, 'lastAutoSyncDateTime');
        if (!_Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].isDefined(lastAutoSync)) {
            return true;
        }

        const currentDateTime = new Date();
        const lastAutoSyncDateTime = new Date(lastAutoSync);

        return Math.ceil((currentDateTime - lastAutoSyncDateTime) / 60000) > thresholdPeriod;
    }

}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncOnResume.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncOnResume.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoSyncOnResume)
/* harmony export */ });
/* harmony import */ var _AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoSyncLibrary */ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncLibrary.js");


function AutoSyncOnResume(context) {
    _AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].autoSyncPeriodically(context);
    return _AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].autoSyncOnAppResume(context);
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncOnSave.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncOnSave.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoSyncOnSave)
/* harmony export */ });
/* harmony import */ var _AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoSyncLibrary */ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncLibrary.js");


function AutoSyncOnSave(context) {
    _AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].autoSyncOnSave(context);
    return Promise.resolve(true);
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/ExecuteActionWithAutoSync.js":
/*!****************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/AutoSync/ExecuteActionWithAutoSync.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExecuteActionWithAutoSync)
/* harmony export */ });
/* harmony import */ var _AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoSyncLibrary */ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncLibrary.js");


function ExecuteActionWithAutoSync(context, actionName) {
    _AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].autoSyncOnSave(context);
    return context.executeAction(actionName);
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/NetworkMonitoringLibrary.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/AutoSync/NetworkMonitoringLibrary.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NetworkMonitoringLibrary)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");


class NetworkMonitoringLibrary {
    constructor() {
        this._instance = null;
        this._callbackActions = {};
    }

    static getInstance() {
        return this._instance || (this._instance = new this());
    }

    startNetworkMonitoring(context) {
        const connectivityModule = context.nativescript.connectivityModule;
        connectivityModule.startMonitoring((newConnectionType) => {
            switch (newConnectionType) {
                case connectivityModule.connectionType.wifi:
                case connectivityModule.connectionType.mobile:
                    // filter duplicated events
                    if (_Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].getNumber(context, 'LastConnectionType') === connectivityModule.connectionType.none) {
                        for (let action of Object.values(this._callbackActions)) {
                            action();
                        }
                    }
                    break;
                default:
                    break;
            }
            // cache the last connetion type
            _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].setNumber(context, 'LastConnectionType', newConnectionType);
        });
    }

    stopNetworkMonitoring(context) {
        context.nativescript.connectivityModule.stopMonitoring();
    }
    
    addCallbackAction(key, action) {
        this._callbackActions[key] = action;
    }
    
    removeCallbackAction(key) {
        delete this._callbackActions[key];
    }

    static isNetworkConnected(context) {
        const connectivityModule = context.nativescript.connectivityModule;
        switch (connectivityModule.getConnectionType()) {
            case connectivityModule.connectionType.wifi:
            case connectivityModule.connectionType.mobile:
                return true;
            default:
                break;
        }        
        return false;
    }
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Constant/AutoSyncConstant.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Constant/AutoSyncConstant.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class{
    static get AutoSyncDuration(){
        return "15";
    }
    static get ActivatePeriodicAutoSync(){
        return true;
    }

});

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Constant/ShipmentConstant.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Constant/ShipmentConstant.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*Field task list of constant*/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class{
    static get mapBaseUrl(){
        return "https://www.google.com/maps/dir/?api=1";
    }
    static get travelMode(){
        return "&travelmode=driving";
    }
    static get origin(){
       return "&origin=";
    }
    static get destination(){
        return "&destination=";
    }
    static get wayPoint(){
        return "&waypoints=";
    }
    static get getTravelMode(){
        return "&travelmode=driving";
    }
});

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Constant/UnPlannedEvent.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Constant/UnPlannedEvent.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class{
    static get LocationUpdate(){
        return "Location Update";
    }
    static get Delay(){
        return "Delay";
    }
    static get ProofOfDelivery(){
        return "Proof of delivery";
    }
    static get Handover(){
        return "Handover";
    }

});

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Departure/PostShipmentArrival.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Departure/PostShipmentArrival.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostShipmentDeparture)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/


async function PostShipmentDeparture(clientAPI) {

    try {

        let currentObject = clientAPI.getPageProxy().getActionBinding();
            clientAPI.getClientData().altKey = currentObject.altKey,
            clientAPI.getClientData().locationAltKey = currentObject.locationAltKey,
            clientAPI.getClientData().eventName = "Arrival",
            clientAPI.getClientData().eventTime = new Date().toJSON();
            clientAPI.getClientData().stopId = currentObject.stopId
            clientAPI.getClientData().timeZone = currentObject.timeZone;
            clientAPI.getClientData().ordinalNo= currentObject.ordinalNo;
            
        _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].setStateVariable(clientAPI, 'ShipmentStatusUpdate', clientAPI.getClientData());

        clientAPI.showActivityIndicator("Posting Status");

        return clientAPI.executeAction("/FrieghtAppDetail/Actions/Shipment/ShipmentStatusUpdateRest.action").then(function (response) {
            if (response.data) {
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateSuccessMessage.action");

            }
            else {
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action")
            }


        });

    } catch (error) {
        clientAPI.dismissActivityIndicator();
        return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action")
    }


}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Departure/PostShipmentDeparture.js":
/*!*************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Departure/PostShipmentDeparture.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostShipmentDeparture)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");


/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
async function PostShipmentDeparture(clientAPI) {

    try {

        let currentObject = clientAPI.getPageProxy().getActionBinding();
        clientAPI.getClientData().altKey = currentObject.altKey,
            clientAPI.getClientData().locationAltKey = currentObject.locationAltKey,
            clientAPI.getClientData().eventName = "Departure",
            clientAPI.getClientData().eventTime = new Date().toJSON();
            clientAPI.getClientData().stopId = currentObject.stopId;
            clientAPI.getClientData().timeZone = currentObject.timeZone;
            clientAPI.getClientData().ordinalNo= currentObject.ordinalNo;

        _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].setStateVariable(clientAPI, 'ShipmentStatusUpdate', clientAPI.getClientData());
        clientAPI.showActivityIndicator("Posting Status");

        return clientAPI.executeAction("/FrieghtAppDetail/Actions/Shipment/ShipmentStatusUpdateRest.action").then(function (response) {
            if (response.data) {
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateSuccessMessage.action");

            }
            else {
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action")
            }


        });

    } catch (error) {
        clientAPI.dismissActivityIndicator();
        return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action")
    }


}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logger */ "./build.definitions/FrieghtAppDetail/Rules/Library/Logger.js");
/* harmony import */ var _NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NativeScriptObject */ "./build.definitions/FrieghtAppDetail/Rules/Library/NativeScriptObject.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {

    static setString(context, key, value) {
        try {
            _NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.setString(key, value);
        } catch (error) {
            _Logger__WEBPACK_IMPORTED_MODULE_0__["default"].error('ApplicationSettings - setString', error);
        }
    }

    static setBoolean(context, key, value) {
        try {
            _NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.setBoolean(key, Boolean(value));
        } catch (error) {
            _Logger__WEBPACK_IMPORTED_MODULE_0__["default"].error('ApplicationSettings - setBoolean', error);
        }
    }

    static setNumber(context, key, value) {
        try {
            _NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.setNumber(key, Number(value));
        } catch (error) {
            _Logger__WEBPACK_IMPORTED_MODULE_0__["default"].error('ApplicationSettings - setNumber', error);
        }
    }

    static getString(context, key, defaultValue = '') {
        try {
            if (_NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.hasKey(key)) {
                return _NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.getString(key, defaultValue);
            }
        } catch (error) {
            _Logger__WEBPACK_IMPORTED_MODULE_0__["default"].error('ApplicationSettings - getString', error);
        }
        return defaultValue;
    }

    static getBoolean(context, key, defaultValue = false) {
        try {
            if (_NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.hasKey(key)) {
                return _NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.getBoolean(key, defaultValue);
            }
        } catch (error) {
            _Logger__WEBPACK_IMPORTED_MODULE_0__["default"].error('ApplicationSettings - getBoolean', error);
        }
        return defaultValue;
    }

    static getNumber(context, key, defaultValue = 0) {
        try {
            if (_NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.hasKey(key)) {
                return _NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.getNumber(key, defaultValue);
            }
        } catch (error) {
            _Logger__WEBPACK_IMPORTED_MODULE_0__["default"].error('ApplicationSettings - getNumber', error);
        }
        return defaultValue;
    }

    static remove(context, key) {
        try {
            if (_NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.hasKey(key)) {
                _NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.remove(key);
            }
        } catch (error) {
            _Logger__WEBPACK_IMPORTED_MODULE_0__["default"].error('ApplicationSettings - remove', error);
        }
    }

    static clear(context) {
        try {
            _NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.clear();
        } catch (error)  {
            _Logger__WEBPACK_IMPORTED_MODULE_0__["default"].error('ApplicationSettings - clear', error);
        }
    }
    static hasKey(context, key) {
        try {
            return _NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.hasKey(key);
        } catch (error) {
            _Logger__WEBPACK_IMPORTED_MODULE_0__["default"].error('ApplicationSettings - hasKey', error);
        }
        return false;
    }

     //LBTYSAMCLK-1914

     static setStringArray(context, key, value) {
        try {
            let valueString = JSON.stringify(value);
            _NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.setString(key, valueString);
        } catch (error) {x
            _Logger__WEBPACK_IMPORTED_MODULE_0__["default"].error('ApplicationSettings - setString', error);
        }
    }

    static getStringArray(context, key, defaultValue = '') {
        try {
            if (_NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.hasKey(key)) {
                return JSON.parse(_NativeScriptObject__WEBPACK_IMPORTED_MODULE_1__["default"].getNativeScriptObject(context).appSettingsModule.getString(key, defaultValue));
            }
        } catch (error) {
            _Logger__WEBPACK_IMPORTED_MODULE_0__["default"].error('ApplicationSettings - getString', error);
        }
        return defaultValue;
    }
});


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Library/Base64Library.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Library/Base64Library.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 * Convert A String to Base64 String or Vice-Versa  
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {
    /*
     * Convert A String to Base64 String  
    */
   //eslint-disable
    static transformStringToBase64(isAndroid, textString) {
        // eslint-disable-next-line no-undef
        if (isAndroid) {
          // eslint-disable-next-line no-undef
          const text = new java.lang.String(textString);
          const data = text.getBytes('UTF-8');
          // eslint-disable-next-line no-undef
          const base64String = android.util.Base64.encodeToString(data,android.util.Base64.DEFAULT);
          return base64String;
        } else  {
          // eslint-disable-next-line no-undef
          const text = NSString.stringWithString(textString);
          // eslint-disable-next-line no-undef
          const data = text.dataUsingEncoding(NSUTF8StringEncoding);
          // eslint-disable-next-line no-undef
          const base64String = data.base64EncodedStringWithOptions(0);
          return base64String;
        }
      }
      
      /*
       * Convert A Base64 String to String  
       */
       static transformBase64ToString(isAndroid, base64String) {
        if (isAndroid) {
          // eslint-disable-next-line no-undef
          var data = android.util.Base64.decode(base64String,android.util.Base64.DEFAULT);
          // eslint-disable-next-line no-undef
          var decodedString = new java.lang.String(data,java.nio.charset.StandardCharsets.UTF_8);
          return decodedString;
        } else {
          // eslint-disable-next-line no-undef
          const decodedData = NSData.alloc().initWithBase64EncodedStringOptions(base64String,0);
          // eslint-disable-next-line no-undef
          return NSString.alloc().initWithDataEncoding(decodedData,NSUTF8StringEncoding);
        }
      }
      
      static transformBinaryToBase64(isAndroid, binarySource) {
        if (isAndroid) {
          // eslint-disable-next-line no-undef
          return android.util.Base64.encodeToString(binarySource, android.util.Base64.NO_WRAP);
        } else {
          return binarySource.base64EncodedStringWithOptions(0);
        }
      }
    //eslint-enable
});


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WCMAssignmentType: () => (/* binding */ WCMAssignmentType),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");
/* harmony import */ var _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Logger */ "./build.definitions/FrieghtAppDetail/Rules/Library/Logger.js");
/* harmony import */ var _GlobalCommon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GlobalCommon */ "./build.definitions/FrieghtAppDetail/Rules/Library/GlobalCommon.js");
/* harmony import */ var _IsAndroid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IsAndroid */ "./build.definitions/FrieghtAppDetail/Rules/Library/IsAndroid.js");
/* harmony import */ var _ApplicationSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _NativeScriptObject__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NativeScriptObject */ "./build.definitions/FrieghtAppDetail/Rules/Library/NativeScriptObject.js");





//import libPersona from '../../Persona/PersonaLibrary';
//import QueryBuilder from '../Query/QueryBuilder';

//import ODataDate from '../Date/ODataDate';


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {
    /**
     * Checks if value is defined; not blank, non-null, and not 'undefined' (or a string representation of 'undefined')
     * @param {*} value
     */
    static isDefined(value) {
        return !_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].evalIsEmpty(value);
    }
    /**
     * Get Page Name from context
     */
    static getPageName(context) {
        if (context.getPageProxy) {
            return context.getPageProxy()._page._definition.getName();
        } else {
            return context._page._definition.getName();
        }
    }

    /**
     * Get Previous Page Name from context
     */
    static getPreviousPageName(context) {
        if (context.getPageProxy) {
            return context.getPageProxy().evaluateTargetPathForAPI('#Page:-Previous')._page._definition.getName();
        } else {
            return context.evaluateTargetPathForAPI('#Page:-Previous').exc_page._definition.getName();
        }
    }

    /**
     * DO NOT USE - FOR LEGACY ONLY. PLEASE USE MDK ACTION.
     *
     * Displays an error message prompt with OK button
     * @param clientAPI {IClientAPI} context of current rule
     * @param messageText {String} message (body) of the dialog
     * @param captionText {String?} caption (title) of the dialog
     * @param okButtonText {String?} OK button text
     * @returns a rejected promise with false
     */
    static showErrorDialog(
        clientAPI,
        messageText,
        captionText = clientAPI.localizeText(`validation_error`),
        okButtonText = clientAPI.localizeText(`ok`)) {
        clientAPI.dismissActivityIndicator();
        clientAPI.dismissActivityIndicator();

        if (!clientAPI.getPageProxy) {
            clientAPI.getClientData().DialogMessage = messageText;
            clientAPI.getClientData().DialogTitle = captionText;
            clientAPI.getClientData().DialogOkCaption = okButtonText;
        } else {
            clientAPI.getPageProxy().getClientData().DialogMessage = messageText;
            clientAPI.getPageProxy().getClientData().DialogTitle = captionText;
            clientAPI.getPageProxy().getClientData().DialogOkCaption = okButtonText;
        }

        return clientAPI.executeAction(`/SAPAssetManager/Actions/Common/GenericErrorDialog.action`).then(function() {
            return Promise.reject(false);
        });
    }

    /**
     * DO NOT USE - FOR LEGACY ONLY. PLEASE USE MDK ACTION.
     *
     * Displays a warning message prompt with OK and Cancel buttons
     * @param clientAPI {IClientAPI} context of current rule
     * @param messageText {String} message (body) of the dialog
     * @param captionText {String?} caption (title) of the dialog
     * @param okButtonText {String?} OK button text
     * @param cancelButtonText {String?} Cancel button text
     * @returns a promise fulfilled with True (OK) or rejected with False (Cancel)
     */
    static showWarningDialog(
        clientAPI,
        messageText,
        captionText = clientAPI.localizeText(`validation_warning`),
        okButtonText = clientAPI.localizeText(`ok`),
        cancelButtonText = clientAPI.localizeText(`cancel`)) {
        clientAPI.dismissActivityIndicator();

        if (!clientAPI.getPageProxy) {
            clientAPI.getClientData().DialogMessage = messageText;
            clientAPI.getClientData().DialogTitle = captionText;
            clientAPI.getClientData().DialogOkCaption = okButtonText;
            clientAPI.getClientData().DialogCancelCaption = cancelButtonText;
        } else {
            clientAPI.getPageProxy().getClientData().DialogMessage = messageText;
            clientAPI.getPageProxy().getClientData().DialogTitle = captionText;
            clientAPI.getPageProxy().getClientData().DialogOkCaption = okButtonText;
            clientAPI.getPageProxy().getClientData().DialogCancelCaption = cancelButtonText;
        }

        return clientAPI.executeAction(`/SAPAssetManager/Actions/Common/GenericWarningDialog.action`).then(function(result) {
            if (result.data === true) {
                return Promise.resolve(true);
            } else {
                return Promise.reject(false);
            }
        });
    }

    /**
     * Evaluates a target path to find the field name on the current page
     * Returns a string containing the field value
     *
     * @param {string} name - screen field name
     * @param {string} key - name to use when storing value in dictionary
     * @param {object} dict - dictionary object to store result
     * @param {boolean} trim - whether to trim a string result of leading and trailing spaces
     */
    static getFieldValue(clientAPI, name, key = '', dict, trim = false) {
        var keyVal = (_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].evalIsEmpty(key)) ? name : key;
        var field = undefined;

        if (!_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].evalIsEmpty(keyVal)) {
            try {
                field = this.getTargetPathValue(clientAPI, '#Control:' + name + '/#Value', keyVal, dict, trim);
            } catch (err) {
                /**Implementing our Logger class*/
                _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(clientAPI.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), err.message);
            }
            return field;
        }
        return field;
    }

    /**
     * Evaluates a target path to find value
     * Returns whatever the target path evaluated to, or empty string if the target returned null or did not exist
     * params:
     * @param {string} path - target path
     * @param {string} key - name to use when storing value in dictionary
     * @param {object} dict - dictionary object to store result
     * @param {boolean} trim - whether to trim a string result of leading and trailing spaces
     */
    static getTargetPathValue(clientAPI, path, key, dict, trim = false) {
        let value = null;
        try {
            value = clientAPI.evaluateTargetPath(path);
        } catch (err) {
            /**Implementing our Logger class*/
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(clientAPI.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), 'getTargetPathValue: ' + err.message);
        }

        if (_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].evalIsEmpty(value)) value = ''; //SnowBlind is returning undefined for screen controls that have no value :-(
        if (trim && (typeof value === 'string')) value = value.trim();
        if (dict) {
            dict[key] = value;
        }
        return value;
    }

    /**
     * Return all controls in a dictionary keyed by field name
     * Works for a page with a form cell container holding child fields
     */
    static getControlDictionary(clientAPI) {

        var formcell = clientAPI.getPageAPI().getControls()[0];
        var subcontrols = formcell.getControls();
        var dict = {};

        for (let control of subcontrols) {
            dict[control.definition().getName()] = control;
        }
        return dict;
    }

    /**
     * Return a dictionary of all page controls keyed by control name
     */
    static getControlDictionaryFromPage(clientAPI) {
        /**
         * Recursively loop over page controls digging deeper if a "_controls" property exists.
         * Save all controls in the "dict" dictionary that was passed here by reference
         */
        let buildControlDictionaryForSubControls = function(subcontrols, dict) {
            var childControls;
            for (let control of subcontrols) {
                dict[control.getName()] = control;
                if (control.isContainer()) {
                    childControls = control.getControls();
                    if (childControls.length > 0) buildControlDictionaryForSubControls(childControls, dict);
                }
            }
        };

        var dict = {};
        var pageControls;
        if (clientAPI.getPageProxy) {
            pageControls = clientAPI.getPageProxy().getControls();
        } else {
            pageControls = clientAPI.getControls();
        }
        if (pageControls.length > 0) buildControlDictionaryForSubControls(pageControls, dict);
        return dict;
    }

    static refreshPage(context) {
        if (context) {
            if (context.getControls()) {
                var controls = context.getControls();
                for (var i = 0; i < controls.length; i++) {
                    controls[i].redraw();
                }
            }
        }
    }

    /**
     * Redraws all the controls inside a section on page.
     *
     * @param {*} context The context proxy depending on where this rule is being called from.
     * @param {*} pageName Name of the page
     * @param {*} sectionName Name of the section
     */
    static redrawPageSection(context, pageName, sectionName) {
        /**Implementing our Logger class*/
        _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].debug(context.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), `Called CommonLibrary.redrawPageSection(context, ${pageName}, ${sectionName})`);
        try {
            let pageProxy = context.evaluateTargetPathForAPI('#Page:' + pageName);
            if (pageProxy) {
                let sectionedTbl = pageProxy.getControl(sectionName);
                if (sectionedTbl) {
                    sectionedTbl.redraw();
                }
            }
        } catch (err) {
            /**Implementing our Logger class*/
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(context.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), `CommonLibrary.redrawPageSection(context, ${pageName}, ${sectionName}) error: ${err}`);
        }
    }
    /**
     *
     * Set a state variable on the given page
     */
    /*static setStateVariable(clientAPI, key, value, pageName) {
        if ((key === 'StatusStartDate' || key === 'StatusEndDate') && value instanceof Date) {
            ApplicationSettings.setString(clientAPI, key, value.toJSON());
        } else {
            try {
                let pageData;
                if (pageName) {
                    let page = clientAPI.evaluateTargetPath('#Page:' + pageName);
                    pageData = page.context.clientData;
                } else {
                    pageData = clientAPI.getAppClientData().StateVariables;
                    if (!pageData) {
                        pageData = {};
                        clientAPI.getAppClientData().StateVariables = pageData;
                    }
                }
                pageData[key] = value;
            } catch (err) {
                Logger.error(clientAPI.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryCommon.global').getValue(), 'Reference to page not found: ' + pageName);
            }
        }
    }*/

    static setStateVariable(clientAPI, key, value, pageName = 'ShipmentListView') {

        if ((key === 'StatusStartDate' || key === 'StatusEndDate') && value instanceof Date) {
            _ApplicationSettings__WEBPACK_IMPORTED_MODULE_5__["default"].setString(clientAPI, key, value.toJSON());
        } else {
            try {
                let page = clientAPI.evaluateTargetPath('#Page:' + pageName);
                const pageData = page.context.clientData;
                pageData[key] = value;
            } catch (err) {
                /**Implementing our Logger class*/
                _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error('Reference to page not found: ' + pageName);
            }
        }
    }

    static getStateVariable(clientAPI, key, pageName = 'ShipmentListView') {

        if (key === 'StatusStartDate' || key === 'StatusEndDate') {
            return new Date(_ApplicationSettings__WEBPACK_IMPORTED_MODULE_5__["default"].getString(clientAPI, key));
        } else {
            try {
                let page = clientAPI.evaluateTargetPath('#Page:' + pageName);
                const pageData = page.context.clientData;
                if (pageData.hasOwnProperty(key)) {
                    return pageData[key];
                } else {
                    return undefined;
                }
            } catch (err) {
                return undefined;
            }
        }
    }

    /**
    * Get a state variable on the given page
    */
   /* static getStateVariable(clientAPI, key, pageName) {
        if (key === 'StatusStartDate' || key === 'StatusEndDate') {
            return new Date(ApplicationSettings.getString(clientAPI, key));
        } else {
            try {
                let pageData;
                if (pageName) {
                    let page = clientAPI.evaluateTargetPath('#Page:' + pageName);
                    pageData = page.context.clientData;
                } else {
                    pageData = clientAPI.getAppClientData().StateVariables || {};
                }
                if (Object.prototype.hasOwnProperty.call(pageData, key)) {
                    return pageData[key];
                } else {
            
                    return undefined;
                }
            } catch (err) {
                return undefined;
            }
        }
    }*/

    /**
     * Removes a state variable. After being removed pageData[your state variable] = undefined.
     * @param {*} clientAPI  - You base ClientAPI
     * @param {*} keys  - name of the state variable you want to remove. This can be an Array of variables or just one value.
     * @param {*} pageName  - optional. The name of the page where this variable is saved. If not passed in, it defaults to a global which is usually the Overview.page.
     */
    static removeStateVariable(clientAPI, keys, pageName) {
        try {
            let pageData;
            if (pageName) {
                let page = clientAPI.evaluateTargetPath('#Page:' + pageName);
                pageData = page.context.clientData;
            } else {
                pageData = clientAPI.getAppClientData().StateVariables || {};
            }
            if (Array.isArray(keys)) {
                keys.forEach(function(key) {
                    delete pageData[key];
                });
            } else if (Object.prototype.hasOwnProperty.call(pageData, keys)) {
                delete pageData[keys];
            }
        } catch (err) {
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(clientAPI.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), err);
        }
    }

    /**
     * Removes all state variables from AppClientData.
     * @param {*} clientAPI  - You base ClientAPI
     */
    static resetAppState(clientAPI) {
        try {
            clientAPI.getAppClientData().StateVariables = {};
        } catch (err) {
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(clientAPI.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), err);
        }
    }

    /**
     * Clears the value of a state variable by setting it to a empty string. After being cleared pageData[your state variable] = ''.
     * @param {*} clientAPI  - You base ClientAPI
     * @param {*} keys  - name of the state variable you want to clear. This can be an Array of variables or just one value.
     * @param {*} pageName  - optional. The name of the page where this variable is saved. If not passed in, it defaults to a global which is usually the Overview.page.
     */
    static clearStateVariable(clientAPI, keys, pageName) {
        try {
            let pageData;
            if (pageName) {
                let page = clientAPI.evaluateTargetPath('#Page:' + pageName);
                pageData = page.context.clientData;
            } else {
                pageData = clientAPI.getAppClientData().StateVariables || {};
            }
            if (Array.isArray(keys)) {
                keys.forEach(function(key) {
                    delete pageData[key];
                });
            } else if (Object.prototype.hasOwnProperty.call(pageData, keys)) {
                delete pageData[keys];
            }
        } catch (err) {
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(clientAPI.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), err);
        }
    }

    /**
    * Get a reference to the clientData object on the given page
    */
    /*static getClientDataForPage(clientAPI,
        pageName = libPersona.getPersonaOverviewStateVariablePage(clientAPI)) {
        try {
            let page = clientAPI.evaluateTargetPath('#Page:' + pageName);
            return page.context.clientData;
        } catch (err) {
            Logger.error(clientAPI.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryCommon.global').getValue(), 'Reference to page not found: ' + pageName);
            return null;
        }
    }*/

    /**
     * Set the TransactionType flag to "CREATE", or "UPDATE", else will be reset to empty string ""
     * @param {*} clientAPI
     * @param {string} FlagValue
     */
    static setOnCreateUpdateFlag(clientAPI, FlagValue) {
        /* Debugging info for state variables */
        let callingPage = 'unknown';
        if (this.flags === undefined) {
            this.flags = {};
        }
        try {
            if (clientAPI.getPageProxy()) {
                callingPage = clientAPI.getPageProxy().currentPage.id;
            } else {
                callingPage = clientAPI.currentPage.id;
            }
        } catch (exc) {
            // Do nothing...
        }
        this.flags.CreateUpdateFlagPage = callingPage;
        /* End state variable debugging info */

        //If the value is not either "CREATE"" or "UPDATE", force it to empty ""
        if (FlagValue === 'CREATE' || FlagValue === 'UPDATE') {
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].info('***STATE VARIABLE***', `OnCreate Flag set to ${FlagValue}. Calling Page: ${callingPage}`);
            this.setStateVariable(clientAPI, 'TransactionType', FlagValue);
        } else {
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].info('***STATE VARIABLE***', `OnCreate Flag Unset. Calling Page: ${callingPage}`);
            this.setStateVariable(clientAPI, 'TransactionType', '');
        }
    }

    /**
     * Set the counter for the change set actions to 0
     * @param {*} clientAPI
     */
    static resetChangeSetActionCounter(clientAPI) {
        this.setStateVariable(clientAPI, 'ChangeSetActionCounter', 0);
    }

    /**
     * Increment the counter for the change set actions
     * @param {*} clientAPI
     */
    static incrementChangeSetActionCounter(clientAPI) {
        let currentCounter = this.getCurrentChangeSetActionCounter(clientAPI);
        currentCounter++;
        this.setStateVariable(clientAPI, 'ChangeSetActionCounter', currentCounter);
    }

    /**
     * Get the current counter for the changeset actions
     * @param {*} clientAPI
     */
    static getCurrentChangeSetActionCounter(clientAPI) {
        return this.getStateVariable(clientAPI, 'ChangeSetActionCounter');
    }

    /**
     * Check if we are on Create mode
     * @param {IClientAPI} clientAPI
     * @returns {boolean}
     */
    static IsOnCreate(clientAPI) {
        let transType = this.getStateVariable(clientAPI, 'TransactionType');
        return (transType === 'CREATE');
    }

    /**
     * Set the ChangeSet flag
     * @param {IPageProxy} clientAPI
     * @param {boolean} FlagValue
     */
    static setOnWOChangesetFlag(clientAPI, FlagValue) {
        /* Debugging info for state variables */
        let callingPage = 'unknown';
        if (this.flags === undefined) {
            this.flags = {};
        }
        try {
            if (clientAPI.getPageProxy()) {
                callingPage = clientAPI.getPageProxy().currentPage.id;
            } else {
                callingPage = clientAPI.currentPage.id;
            }
        } catch (exc) {
            // Do nothing...
        }
        this.flags.WOChangesetFlagPage = callingPage;
        /* End state variable debugging info */

        _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].info('***STATE VARIABLE***', `Work Order Change Set Flag set to ${FlagValue}. Calling Page: ${callingPage}`);
        this.setStateVariable(clientAPI, 'ONWOCHANGESET', FlagValue);
    }

    /**
     * check if we are in the middle of the WO changeset action
     * @param {IPageProxy} clientAPI
     */
    static isOnWOChangeset(clientAPI) {
        return this.getStateVariable(clientAPI, 'ONWOCHANGESET');
    }

    /**
     * Set the WO ChangeSet flag
     * @param {IPageProxy} clientAPI
     * @param {boolean} FlagValue
     */
    static setOnChangesetFlag(clientAPI, FlagValue) {
        /* Debugging info for state variables */
        let callingPage = 'unknown';
        if (this.flags === undefined) {
            this.flags = {};
        }
        try {
            if (clientAPI.getPageProxy()) {
                callingPage = clientAPI.getPageProxy().currentPage.id;
            } else {
                callingPage = clientAPI.currentPage.id;
            }
        } catch (exc) {
            // Do nothing...
        }
        this.flags.ChangesetFlagPage = callingPage;
        /* End state variable debugging info */

        _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].info('***STATE VARIABLE***', `Generic Change Set Flag set to ${FlagValue}. Caling Page: ${callingPage}`);
        this.setStateVariable(clientAPI, 'ONCHANGESET', FlagValue);
    }

    /**
     * check if we are in the middle of changeset action
     * @param {IPageProxy} clientAPI
     */
    static isOnChangeset(clientAPI) {
        let flag = this.getStateVariable(clientAPI, 'ONCHANGESET');
        return flag;
    }

    /**
     * SAP Measuring Point records return numbers with decimal separators from different locales
     * For now, change the European comma to a western period decimal point
     */
    static convertSapStringToNumber(value) {
        if (typeof value === 'string') {
            if (_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].evalIsEmpty(value)) {
                return '';
            } else {
                try {
                    var strValue = value.toString();
                    return parseFloat(strValue.replace(/,/g, '.'));
                } catch (err) {
                    /**Implementing our Logger class*/
                    _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error('COMMON', err.message);
                    return value;
                }
            }
        } else {
            // if value is a number then dont do any conversion
            return value;
        }
    }

    /**
     * Return the value stored in a single-selection list picker array
     */
    static getListPickerValue(array) {
        if (Array.isArray(array) && array.length === 1 && array[0] && array[0].ReturnValue) {
            return array[0].ReturnValue;
        } else if (Array.isArray(array) && array.length > 1) {
            return _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getListMultiplePickerValue(array);
        }
        return '';
    }

    /**
     * Return the value stored in a single-selection list picker array
     */
    static getListMultiplePickerValue(array) {
        if (Array.isArray(array) && array.length > 0 && array[0] && array[0].ReturnValue) {
            return array[0].ReturnValue;
        }
        return '';
    }

    /**
     * Return the display value stored in a single-selection list picker array
     */
    static getListPickerDisplayValue(array) {
        if (Array.isArray(array) && array.length === 1 && array[0] && array[0].ReturnValue) {
            return array[0].DisplayValue;
        }
        return '';
    }

    static dateToDayOfWeek(date, clientAPI) {
        var dt = '';
        switch (date.getDay()) {
            case 0:
                dt = clientAPI.localizeText(`day0`);
                break;
            case 1:
                dt = clientAPI.localizeText(`day1`);
                break;
            case 2:
                dt = clientAPI.localizeText(`day2`);
                break;
            case 3:
                dt = clientAPI.localizeText(`day3`);
                break;
            case 4:
                dt = clientAPI.localizeText(`day4`);
                break;
            case 5:
                dt = clientAPI.localizeText(`day5`);
                break;
            case 6:
                dt = clientAPI.localizeText(`day6`);
                break;
            default:
                dt = 'unknown day';
                break;
        }
        return dt;
    }

    /**
     * Retrieve the relative day of the week
     *
     * @param {*} date - date to retrieve the relative date of
     * @param {*} clientApi - calling context
     */
    static relativeDayOfWeek(date, clientApi) {

        let now = new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);

        let milliDelta = date.getTime() - now.getTime();

        let dayInMillis = 24 * 60 * 60 * 1000;

        if (milliDelta < 0) {
            if (milliDelta >= -1 * dayInMillis) {
                // yesterday
                return clientApi.localizeText(`day_yesterday`);
            }
        } else if (milliDelta < dayInMillis) {
            // Today
            return clientApi.localizeText(`day_today`);
        }
        return this.dateToDayOfWeek(date, clientApi);
    }

    /**
     * pass in the readLink of the entity, it will return wether the entity is local or not
     *
     * @static
     * @param {string} readLink
     */
    static isCurrentReadLinkLocal(readLink) {
        return (readLink && readLink.indexOf('lodata_sys_eid') !== -1);
    }

    /**
     * Generates a unique local ID
     */
    static GenerateOfflineEntityId() {
        let newId = Math.round(new Date().getTime()).toString();
        return newId;
    }

    /**
     * Gets a control proxy reference from the page's form cell container matching the passed in name
     */
    static getControlProxy(
        pageProxy,
        name,
        containerName = pageProxy.getGlobalDefinition(`/SAPAssetManager/Globals/DefaultMessages/DefaultFormCellContainerControlName.global`).getValue()) {

        let container = pageProxy.getControl(containerName);
        if (container) {
            // handle the case of the MDK not allowing extensions to provide their own ClientAPI
            if (!Object.prototype.hasOwnProperty.call(container, 'getControl')
                && Object.prototype.hasOwnProperty.call(container, '_control')
                && (typeof container._control.getCellProxyWithName === 'function')) {
                return container._control.getCellProxyWithName(name);
            } else if (name.includes('Hierarchy')) {
                return container.getControl(name)._control._extension;
            }
            return container.getControl(name);
        } else {
            return null;
        }
    }

    /**
     * Gets a user related propery value from UserGeneralInfos given the property name that you want
     * @param {ClientAPI} pageClientAPI
     * @param {string} propertyName Property name
     * @return propertyValue User property value or blank if nothing is found.
     */
    static getUserProperty(pageClientAPI, propertyName) {
        var propertyValue = '';
        let row = _GlobalCommon__WEBPACK_IMPORTED_MODULE_3__.GlobalVar.getUserGeneralInfo();
        if (!row) {
            /**Implementing our Logger class*/
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(pageClientAPI.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), 'getUserProperty: Error - In memory row does not exist.');
        } else {
            if (Object.prototype.hasOwnProperty.call(row, propertyName)) {
                propertyValue = row[propertyName];
            }
            return propertyValue;
        }
        return propertyValue;
    }

    static getNotificationPlanningPlant(context) {
        return this.getAppParam(context, 'NOTIFICATION', 'PlanningPlant');
    }

    /**
      * Gets flag for mobile status task sucess
      * @param {context} context
      * @return Yes or No from config panel
      */

    static getTaskSucessFlag(context) {
        return this.getAppParam(context, 'NOTIFICATION', 'TaskSuccess');
    }

    /**
     * Gets Mileage ActivityType
     * @param {*} context
     */
    static getMileageActivityType(context) {
        return this.getAppParam(context, context.getGlobalDefinition(`/SAPAssetManager/Globals/Mileage/MileageGroup.global`).getValue(), 'MileageActivityType');
    }

    /**
     * Gets Mileage Unit of Measure
     * @param {*} context
     */
    static getMileageUOM(context) {
        return this.getAppParam(context, context.getGlobalDefinition(`/SAPAssetManager/Globals/Mileage/MileageGroup.global`).getValue(), 'MileageUOM');
    }

    /**
     * Gets Mileage WorkCenter
     * @param {*} context
     */
    static getMileageWorkCenter(context) {
        return this.getAppParam(context, context.getGlobalDefinition(`/SAPAssetManager/Globals/Mileage/MileageGroup.global`).getValue(), 'MileageWorkCenter');
    }

    /**
     * Gets Expense ActivityType
     * @param {*} context
     */
    static getExpenseActivityType(context) {
        return this.getAppParam(context, context.getGlobalDefinition(`/SAPAssetManager/Globals/Expense/Expenses.global`).getValue(), 'ExpenseActivityType') || '';
    }

    /**
     * Gets Expense WorkCenter
     * @param {*} context
     */
    static getExpenseWorkCenter(context) {
        return this.getAppParam(context, context.getGlobalDefinition(`/SAPAssetManager/Globals/Expense/Expenses.global`).getValue(), 'ExpenseWorkCenter') || '';
    }


    static getSetUsage(context) {
        return this.getAppParam(context, context.getGlobalDefinition(`/SAPAssetManager/Globals/InspectionLots/InspectionLot.global`).getValue(), 'SetUsage');
    }

    static getUserDefaultWorkCenter() {
        let defaultWorkCenter = this.getUserSystemInfo().get('USER_PARAM.AGR');
        if (defaultWorkCenter && defaultWorkCenter.includes(',')) {
            defaultWorkCenter = defaultWorkCenter.split(',')[0];
        }
        return defaultWorkCenter;
    }

    static getParsedUserWorkCenters() {
        let defaultWorkCenter = this.getUserSystemInfo().get('USER_PARAM.AGR');
        let workCenters = [];

        if (defaultWorkCenter && defaultWorkCenter.includes(',')) {
            workCenters = defaultWorkCenter.split(',');
        } else if (defaultWorkCenter) {
            workCenters.push(defaultWorkCenter);
        }

        return workCenters;
    }

    static getUserWorkCenters() {
        return this.getUserSystemInfo().get('USER_PARAM.AGR');
    }

    static getUserDefaultStorageLocation() {
        return this.getUserSystemInfo().get('USER_PARAM.LAG');
    }

    static getUserDefaultPlant() {
        // the default plant should be changed from IWK to WRK
        return this.getUserSystemInfo() ? this.getUserSystemInfo().get('USER_PARAM.WRK') : '';
    }
    static getUserDefaultPlanningPlant() {
        return this.getUserSystemInfo().get('USER_PARAM.IWK');
    }
    static getUserDefaultMainternancePlant() {
        return this.getUserSystemInfo().get('USER_PARAM.SWK');
    }

    static getOperationsTimelineStatuses(context) {
        try {
            let statuses = [];
            Object.entries(_GlobalCommon__WEBPACK_IMPORTED_MODULE_3__.GlobalVar.getAppParam().MOBILESTATUS_TIMELINE_SEQ_OPERATION).forEach((items) => {
                statuses.push(items[1]);
            });
            return statuses;
        } catch (exc) {
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(context.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryConfiguration.global`).getValue(), 'MOBILESTATUS_TIMELINE_SEQ_OPERATION was not set on the App Params configuration');
            return [];
        }
    }

    static getServiceItemsTimelineStatuses(context) {
        try {
            let statuses = [];
            Object.entries(_GlobalCommon__WEBPACK_IMPORTED_MODULE_3__.GlobalVar.getAppParam().MOBILESTATUS_TIMELINE_SEQ_S4ITEM).forEach((items) => {
                statuses.push(items[1]);
            });
            return statuses;
        } catch (exc) {
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(context.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryConfiguration.global`).getValue(), 'MOBILESTATUS_TIMELINE_SEQ_S4ITEM was not set on the App Params configuration');
            return [];
        }
    }

    static getWOTimelineStatuses(context) {
        try {
            let statuses = [];
            Object.entries(_GlobalCommon__WEBPACK_IMPORTED_MODULE_3__.GlobalVar.getAppParam().MOBILESTATUS_TIMELINE_SEQ_WORKORDER).forEach((items) => {
                statuses.push(items[1]);
            });
            return statuses;
        } catch (exc) {
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(context.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryConfiguration.global`).getValue(), 'MOBILESTATUS_TIMELINE_SEQ_WORKORDER was not set on the App Params configuration');
            return [];
        }

    }

    static getSOTimelineStatuses(context) {
        try {
            let statuses = [];
            Object.entries(_GlobalCommon__WEBPACK_IMPORTED_MODULE_3__.GlobalVar.getAppParam().MOBILESTATUS_TIMELINE_SEQ_S4ORDER).forEach((items) => {
                statuses.push(items[1]);
            });
            return statuses;
        } catch (exc) {
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(context.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryConfiguration.global`).getValue(), 'MOBILESTATUS_TIMELINE_SEQ_S4ORDER was not set on the App Params configuration');
            return [];
        }

    }

    /**
     * Returns the UserSystemInfo parameter matching the property.  If the property does not exist, returns
     * an empty string.
     * @param {*} context
     * @param {*} property
     */
    static getUserSystemInfoProperty(context, property) {
        var prop = this.getUserSystemInfo(context).get(property);
        if (prop) {
            return prop;
        } else {
            return '';
        }

    }
    /**
     * Gets a user related propery value from UserSystemInfos given the property name that you want.
     * @param pageClientAPI
     * @param groupName    SystemSettingGroup name
     * @param propertyName SystemSettingName name
     * @return SystemSettingVAlue User property value or empty string if nothing is found.
     */
    static getUserSystemProperty(pageClientAPI, groupName, propertyName) {
        var propertyValue = '';
        var filter = "$filter=SystemSettingGroup eq '" + groupName + "' and SystemSettingName eq '" + propertyName + "'";

        return pageClientAPI.read(`/SAPAssetManager/Services/AssetManager.service`, 'UserSystemInfos', [], filter).then(userSystemInfo => {
            if (userSystemInfo.length > 0) {
                propertyValue = userSystemInfo.getItem(0).SystemSettingValue;
            }
            if (_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].evalIsEmpty(propertyValue)) {
                _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(pageClientAPI.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryConfiguration.global`).getValue(), propertyName + ' in  ' + groupName + ' was not set on User System Properties');
                return '';
            } else {
                return propertyValue;
            }
        });
    }

    /**
     * Gets the UserGUID for the currently logging in user.
     * @param {ClientAPI} pageClientAPI
     * @return {string} The UserGUID value as a string or blank if one is not found.
     */
    static getUserGuid(pageClientAPI) {
        return _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getUserProperty(pageClientAPI, 'UserGuid');
    }

    /**
     * Gets a count of rows
     */
    static getEntitySetCount(clientAPI, entitySet, queryOptions, service = `/SAPAssetManager/Services/AssetManager.service`) {

        return clientAPI.count(service, entitySet, queryOptions).then((result) => {
            return result;
        }).catch(err => {
            /**Implementing our Logger class*/
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(clientAPI.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), err);
            return 0;
        });
    }

    /**
     * Gets a count of rows online
     */
    static getEntitySetCountOnline(clientAPI, entitySet, queryOptions) {
        // Removing unnecessary code as we only need to initialize the service once.

        return clientAPI.count(`/SAPAssetManager/Services/OnlineAssetManager.service`, entitySet, queryOptions).then((result) => {
            return result;
        }).catch(err => {
            /**Implementing our Logger class*/
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(clientAPI.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), err);
            return 0;
        });
    }

    /**
     * Gets SAP User Name
     */
    static getSapUserName(pageClientAPI) {
        return _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getUserProperty(pageClientAPI, 'SAPUserName');
    }
    /**
     * Get user Personnel Area
     */
    static getUserPersArea(pageClientAPI) {
        return _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getUserSystemProperty(pageClientAPI, 'HR.USER', 'PERS_AREA');
    }

    /**
     * Get user Personnel SubArea
     */
    static getUserPersSubArea(pageClientAPI) {
        return _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getUserSystemProperty(pageClientAPI, 'HR.USER', 'PERS_SUBAREA');
    }

    static getBackendOffsetFromSystemProperty(pageClientAPI) {

        return Number(_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getUserSystemInfoProperty(pageClientAPI, 'SAP_SYSTEM_TZONE_UTC_OFFSET'));
    }

    /**
     * get the app parameters
     * @param {*} pageProxy
     * @return {Map} Map that contains all app parameters
     */
    static getAppParam(pageProxy, paramGroup, paramName) {
        try {
            return _GlobalCommon__WEBPACK_IMPORTED_MODULE_3__.GlobalVar.getAppParam()[paramGroup][paramName];
        } catch (exc) {
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(pageProxy.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryConfiguration.global`).getValue(), `${exc}: ${paramName} ${paramGroup} was not set on the App Params configuration`);
            return undefined;
        }
    }

    /**
     * get user profile
     *
     * @static
     * @param {any} pageProxy
     * @return {string}
     */
    static getUserSystemInfo() {
        return _GlobalCommon__WEBPACK_IMPORTED_MODULE_3__.GlobalVar.getUserSystemInfo();
    }

    /**
     * get user general info
     *
     * @static
     * @param {PageProxy} pageProxy
     * @return {string}
     */
    static getUserGeneralInfo() {
        return _GlobalCommon__WEBPACK_IMPORTED_MODULE_3__.GlobalVar.getUserGeneralInfo();
    }

    /**
     * More conventional convenience method for setting editable state
     * @param {ControlProxy} control
     * @param {Boolean} isEditable
     */

    static setEditable(control, isEditable) {
        control.setEditable(isEditable);

    }

    /**
     * Set the non-editable style: light grey background
     * @param {ControlProxy} controlProxy
     */
    static setFormcellNonEditable(controlProxy) {
        controlProxy.setEditable(false);
    }

    /**
     * Set the editable style: light grey background
     * @param {ControlProxy} controlProxy
     */
    static setFormcellEditable(controlProxy) {
        controlProxy.setEditable(true);
    }

    /**
     * gets the Workorder Assignment Type value in application parameters
     * @param {PageProxy} pageClientAPI
     */
    static getWorkOrderAssignmentType(pageClientAPI) {
        const value = this.getAppParam(pageClientAPI, 'ASSIGNMENTTYPE', 'WorkOrder') || '';

        // return first value to cover case when ASSIGNMENTTYPE set as comma separated value
        return value.split(',')[0];
    }

    /**
     * gets the S4 Assignment Type value in application parameters
     * @param {PageProxy} pageClientAPI
     */
    static getS4AssignmentType(pageClientAPI) {
        return this.getAppParam(pageClientAPI, 'ASSIGNMENTTYPE', 'S4ServiceOrder');
    }

    /**
     * @param {IClientAPI} pageClientAPI
     * @returns {Array<string>} */
    static getWCMDocumentAssignmentTypes(pageClientAPI) {
        return (this.getAppParam(pageClientAPI, 'ASSIGNMENTTYPE', 'WCMDocHeader') || '').split(',').map(i => i.trim()).filter(i => !!i);
    }

    /**
     * @param {IClientAPI} pageClientAPI
     * @returns {Array<string>} */
    static getWCMApplicationAssignmentTypes(pageClientAPI) {
        return (this.getAppParam(pageClientAPI, 'ASSIGNMENTTYPE', 'WCMApplication') || '').split(',').map(i => i.trim()).filter(i => !!i);
    }

    /**
     * get the assignment type level
     * @param {PageProxy} context
     * @returns {string} 'WorkOrder', 'Operation', 'SubOperation'
     */
    static getWorkOrderAssnTypeLevel(context) {
        const assnType = this.getWorkOrderAssignmentType(context);

        switch (assnType) {
            case '1':
            case '5':
            case '7':
            case '8':
                return 'Header';
            case '2':
            case '4':
            case '6':
            case 'A':
                return 'Operation';
            case '3':
                return 'SubOperation';
            default:
                return 'No Assigment Type';
        }
    }

    /**
     * get the S4 assignment type level
     * @param {PageProxy} context
     * @returns {string} 'Header', 'Item'
     */
    static getS4AssnTypeLevel(context) {
        const assnType = this.getAppParam(context, 'ASSIGNMENTTYPE', 'S4ServiceOrder');

        switch (assnType) {
            case '1':
                return 'Header';
            case '2':
                return 'Item';
            default:
                return 'No Assigment Type';
        }
    }

    /**
     * gets the Notification Assignment Type value in application parameters
     * @param {PageProxy} pageClientAPI
     */
    static getNotificationAssignmentType(pageClientAPI) {
        return this.getAppParam(pageClientAPI, 'ASSIGNMENTTYPE', 'Notification');
    }

    /**
     * gets the Personnel Number value in User System Info parameters
     * @param {PageProxy} pageClientAPI
     */
    static getPersonnelNumber() {
        let appParams = this.getUserSystemInfo();
        if (appParams) {
            if (appParams.get('PERNO')) {
                return appParams.get('PERNO');
            }
        }
        return '';
    }

    /**
     * Turns on inline validation error for the passed in screen control
     * @param {*} control
     * @param {*} message
     * @param {*} msgColor
     * @param {*} bgColor
     * @param {*} separatorColor
     */
    static executeInlineControlError(context, control, message,
        msgColor = this.getAppParam(context, 'COLOR', 'ValidationMessage'),
        bgColor = this.getAppParam(context, 'BACKGROUNDCOLOR', 'ValidationView'),
        separatorColor = this.getAppParam(context, 'BACKGROUNDCOLOR', 'Seperator')) {

        this.setInlineControlError(context, control, message, msgColor, bgColor, separatorColor);

        //check control is ControlProxy or not
        if (control.applyFormCellValidation) {
            return control.applyFormCellValidation();
        } else if (Object.prototype.hasOwnProperty.call(control, 'context')) {
            return control.context.clientAPI.applyValidation();
        } else {
            return control.applyValidation();
        }
    }

    /**
     * Turns on inline validation warning for the passed in screen control
     * @param {*} control
     * @param {*} message
     * @param {*} msgColor
     * @param {*} bgColor
     * @param {*} separatorColor
     */
    static executeInlineControlWarning(context, control, message,
        msgColor = _NativeScriptObject__WEBPACK_IMPORTED_MODULE_6__["default"].getNativeScriptObject(context).applicationModule.systemAppearance() === 'dark' ? 'eaecee' : '1d2d3e',
        bgColor = _NativeScriptObject__WEBPACK_IMPORTED_MODULE_6__["default"].getNativeScriptObject(context).applicationModule.systemAppearance() === 'dark' ? '845c00' : 'fff8d6',
        separatorColor = _NativeScriptObject__WEBPACK_IMPORTED_MODULE_6__["default"].getNativeScriptObject(context).applicationModule.systemAppearance() === 'dark' ? 'f7bf00' : 'e76500') {

        this.setInlineControlError(context, control, message, msgColor, bgColor, separatorColor);

        //check control is ControlProxy or not
        if (control.applyFormCellValidation) {
            return control.applyFormCellValidation();
        } else if (Object.prototype.hasOwnProperty.call(control, 'context')) {
            return control.context.clientAPI.applyValidation();
        } else {
            return control.applyValidation();
        }
    }

    /**
     * this method similar to executeInlineControlError, but it only sets the inline, without applying it.
     * @param {*} control
     * @param {*} message
     * @param {*} msgColor
     * @param {*} bgColor
     * @param {*} separatorColor
     */
    static setInlineControlError(context, control, message,
        msgColor = this.getAppParam(context, 'COLOR', 'ValidationMessage'),
        bgColor = this.getAppParam(context, 'BACKGROUNDCOLOR', 'ValidationView'),
        separatorColor = this.getAppParam(context, 'BACKGROUNDCOLOR', 'Seperator')) {
        if ((0,_IsAndroid__WEBPACK_IMPORTED_MODULE_4__["default"])(context)) {
            msgColor = this.getAppParam(context, 'COLOR', 'ValidationMessageAndroid');
            separatorColor = this.getAppParam(context, 'BACKGROUNDCOLOR', 'ValidationViewAndroid');
            msgColor = this.getAppParam(context, 'BACKGROUNDCOLOR', 'SeperatorAndroid');
        }
        control.setValidationProperty('ValidationMessage', message);
        control.setValidationProperty('ValidationViewIsHidden', false);
        control.setValidationProperty('ValidationMessageColor', msgColor);
        control.setValidationProperty('SeparatorIsHidden', false);
        if (!(0,_IsAndroid__WEBPACK_IMPORTED_MODULE_4__["default"])(context)) {
            control.setValidationProperty('ValidationViewBackgroundColor', bgColor);
            control.setValidationProperty('SeparatorBackgroundColor', separatorColor);
        }
    }

    /**
     * this method only changing the visibility state of the control, does not include applyValidation()/redraw()
     * @param {IControlProxy} control
     * @param {boolean} isVisible
     */
    static setInlineControlErrorVisibility(control, isVisible) {
        control.setValidationProperty('ValidationViewIsHidden', !isVisible);
    }

    /**
     *
     * @param {*} context
     * @param {*} entity
     */
    static getLongText(entity) {
        if (entity && entity.length > 0) {
            return entity[0].TextString.replace(/^.*\n+/g, '');
        } else {
            return '';
        }
    }

    /**
     * Determines if the entity is local or not. Requires entity to be
     * @param {*} entity
     * @return {Boolean}
     */
    static isEntityLocal(entity) {
        if (entity && Object.prototype.hasOwnProperty.call(entity, '@odata.readLink')) {
            return _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].isCurrentReadLinkLocal(entity['@odata.readLink']);
        }
        return undefined;
    }


    static getEntitySetName(context) {
        let entityODataType = context.binding['@odata.readLink'];
        if (entityODataType === undefined) {
            entityODataType = context.binding.getItem(0)['@odata.readLink'];
        }
        let entity = entityODataType.substring(0, entityODataType.indexOf('('));
        entity = entity.replace('/', '');
        return entity;

    }

    static getBindingEntityData(context) {
        let entityData = context.binding || {};

        let entityDataLink = entityData['@odata.readLink'];
        if (entityDataLink === undefined && entityData.getItem) {
            entityData = entityData.getItem(0);
        }

        return entityData;
    }

    static navigateOnRead(context, navAction, readLink = context.getBindingObject()['@odata.readLink'], queryOption = '') {
        return context.read(`/SAPAssetManager/Services/AssetManager.service`, readLink, [], queryOption).then(result => {
            if (!_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].evalIsEmpty(result)) {
                if (context.setActionBinding)
                    context.setActionBinding(result.getItem(0));
                else
                    context.getPageProxy().setActionBinding(result.getItem(0));
                return context.executeAction(navAction).then((NavResult) => {
                    return NavResult;
                });
            } else {
                return Promise.resolve(false);
            }
        });
    }

    /**
     * Used for preventing default system back navigation on Android device
     * @param {Object} context
     */
    static cancelDefaultBackNavigationAndroid(context) {
        context.getAppEventData().cancel = true;
    }

    /**
     * Used for caching a dictionary of values with a key for quick lookup on list screens.
     * Dictionary is stored on list screen's client data.
     * @param {Object} context - Proxy used for reading the OData store
     * @param {String} entitySet - Name of the entity to be read from OData, and will also be used for dictionary name when stored in cacheStore
     * @param {String} queryOptions - Query options for the OData read
     * @param {Array} keyPropertyArray - Array of OData Column names that will act as dictionary key for later lookups
     * @param {Array} propertyArray - Array of column names to be stored in dictionary for later lookup.  Entire row will be saved if this optional parameter is missing
     * @param {Object} cacheStore - Client data object where data should be cached.  Will be pulled from current page if this optional parameter is missing
     */
    static cacheEntity(context, entitySet, queryOptions, keyPropertyArray, propertyArray, cacheStore) {
        try {
            //Get clientData from current page if it was not passed in
            cacheStore = cacheStore || context.getPageProxy().getClientData();
            if (!cacheStore[entitySet]) {
                return context.read(`/SAPAssetManager/Services/AssetManager.service`, entitySet, [], queryOptions).then(results => {
                    if (results.length > 0) {
                        if (!cacheStore[entitySet]) {
                            let dictionary = {};
                            //Loop over entity rows
                            results.forEach(function(element) {
                                let object = {};
                                //Loop over properties to store, or save entire row if no specific properties specified
                                if (propertyArray) {
                                    propertyArray.forEach(function(property) {
                                        if (Object.prototype.hasOwnProperty.call(element, property)) {
                                            object[property] = element[property];
                                        }
                                    });
                                } else {
                                    object = element;
                                }
                                //Construct the cache key, supporting multiple columns
                                let keys = '';
                                keyPropertyArray.forEach(function(key) {
                                    if (Object.prototype.hasOwnProperty.call(element, key)) {
                                        keys += element[key];
                                    }
                                });
                                dictionary[keys] = object;
                            });
                            cacheStore[entitySet] = dictionary;
                        }
                    }
                    return Promise.resolve();
                });
            } else {
                return Promise.resolve();
            }
        } catch (err) {
            /**Implementing our Logger class*/
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(context.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), `cacheEntity error: ${err}`);
            return Promise.resolve();
        }
    }

    /**
     * Retrieve a value from a cached dictionary.  Dictionary will be created first if it does not exist
     * @param {Object} context - Proxy used for reading the OData store
     * @param {String} entitySet - Name of the entity to be read from OData, and will also be used for dictionary name when stored in cacheStore
     * @param {String} keyValue - Data to be looked up in dictionary
     * @param {String} returnProperty - Column data to be returned to caller after the dictionary row is looked up using keyValue parameter
     * @param {String} queryOptions - Query options for the OData read
     * @param {Array} keyPropertyArray - Array of OData Column names that will act as dictionary key for later lookups
     * @param {Array} propertyArray - Array of column names to be stored in dictionary for later lookup.  Entire row will be saved if this optional parameter is missing
     * @param {Object} cacheStore - Object where data should be cached.  Will be pulled from current page if this optional parameter is missing
     */
    static getValueFromCache(context, entitySet, keyValue, returnProperty, queryOptions, keyPropertyArray, propertyArray, cacheStore) {
        try {
            //Get clientData from current page if it was not passed in
            cacheStore = cacheStore || context.getPageProxy().getClientData();
            if (!cacheStore[entitySet]) {
                return _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].cacheEntity(context, entitySet, queryOptions, keyPropertyArray, propertyArray, cacheStore).then(() => {
                    try {
                        return cacheStore[entitySet][keyValue][returnProperty];
                    } catch (error) {
                        _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(context.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), error.message + error.stack);
                        return '';
                    }
                });
            } else {
                return Promise.resolve(cacheStore[entitySet][keyValue][returnProperty]);
            }
        } catch (err) {
            /**Implementing our Logger class*/
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(context.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), `getValueFromCache error: ${err}`);
            return Promise.resolve('');
        }
    }

    /**
     * Clear out a state variable by name stored in client data
     * @param {Object} context - Proxy used to load the client data object if not provided
     * @param {String or Array} keys - Either a single string or an array of strings to be cleared from client data
     * @param {Object} clientData - Optional. Default client data page will be used if not provided
     * @param {Object} deleteKeys - Optional. Also delete the key properites itself from clientData. Default is false.
     */
    /*static clearFromClientData(context, keys, clientData, deleteKeys = false) {
        if (!clientData) {
            const pageName = libPersona.getPersonaOverviewStateVariablePage(context);
            try {
                let page = context.evaluateTargetPath('#Page:' + pageName);
                clientData = page.context.clientData;
            } catch (err) {
                return false;
            }
        }
        if (keys) {
            //If single string passed in, convert to array before processing
            if (typeof keys === 'string') {
                keys = [keys];
            }
            if (Array.isArray(keys)) {
                for (var index = 0; index < keys.length; index++) {
                    if (Object.prototype.hasOwnProperty.call(clientData, keys[index])) {
                        clientData[keys[index]] = undefined;
                        if (deleteKeys) {
                            delete clientData[keys[index]];
                        }
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }*/

    /**
     * Clear out a state variable by name stored in client data
     * @param {Object} pageProxy - Proxy used to load the client data object if not provided
     */

    static clearDocDataOnClientData(pageProxy) {
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'DocDescription');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'Doc');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'Class');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'ObjectLink');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'ObjectKey');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'entitySet');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'parentEntitySet');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'parentProperty');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'attachmentCount');
        // operation
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'DocDescriptionOperation');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'DocOperation');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'ClassOperation');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'ObjectKeyOperation');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'entitySetOperation');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'parentEntitySetOperation');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'parentPropertyOperation');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'attachmentCountOperation');
        // item
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'DocDescriptionItem');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'DocItem');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'ClassItem');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'ObjectKeyItem');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'entitySetItem');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'parentEntitySetItem');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'parentPropertyItem');
        _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].removeStateVariable(pageProxy, 'attachmentCountItem');
    }

    static shouldDisplayPriorityIcon(context, priority) {
        if (priority < 3 || priority === '*') {
            return (0,_IsAndroid__WEBPACK_IMPORTED_MODULE_4__["default"])(context) ? `/SAPAssetManager/Images/high_priority_icon.android.png` : `/SAPAssetManager/Images/high_priority_icon.png`;
        }
        return '';
    }

    /**
     * previous name was getParentReadLink
     * @param {IPageProxy} context - Page Context to use
     * @param {String} entityPath - Navigation Link path to parent (i.e. /Item/Notification from Notification Item Activity)
     * @param {String} propertyName - the property name of the value that you want to return
     */

    static getEntityProperty(context, entityPath, propertyName, expand = '') {
        return context.read(`/SAPAssetManager/Services/AssetManager.service`, entityPath, [], expand ? `$expand=${expand}` : '').then(function(value) {
            value = value.getItem(0);
            return value[propertyName];
        });
    }

    /**
     * enable or disable a tool bar
     * @param {IPageProxy} context - Page Context to use
     * @param {String} pageName - Page name to use
     * @param {String} toolBarName - Toolbar name to be enabled
     * @param {String} flag - Boolen flag to enable or disable
     */
    static enableToolBar(context, pageName, toolBarName, flag) {
        try {
            let pageToolbar;
            if (pageName) {
                let page = context.evaluateTargetPath('#Page:' + pageName);
                pageToolbar = page.getToolbar();
            } else if (context._page) {
                pageToolbar = context._page.getToolbar();
            }
            if (pageToolbar) {
                return pageToolbar.then(function(toolbar) {
                    var toolbarItems = toolbar.getToolbarItems();
                    for (let i = 0; i < toolbarItems.length; i++) {
                        if (toolbarItems[i].name === toolBarName) {
                            toolbarItems[i].setEnabled(flag);
                        }
                    }
                    return Promise.resolve();
                });
            }
        } catch (exc) {
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].debug(context.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), `Can't enable toolbar on page ${pageName}`);
            return Promise.resolve();
        }
        return Promise.resolve();
    }

    /**
     * Format number to 2 decimal places, dropping zeros
     */
    static toTwoPlaces(context, number) {
        return context.formatNumber(number, null, { maximumFractionDigits: 2 });
    }

    /**
     * @param {String} readLink OData ReadLink to parse
     * @param {String?} value Value to pull from the ReadLink, if there is more than one parameter present
     * @returns {String} value of the key specified by `value` from the provided ReadLink
     */
    static parseReadLink(readLink, value) {
        var components = readLink.match(/([A-z]+=)?'[0-9]+'/g);
        var obj = {};
        if (components) {
            if (components.length > 1) {
                for (var idx in components) {
                    var tmp = components[idx].split('=');
                    obj[tmp[0]] = tmp[1].replace(/'/g, '');
                }
                return obj[value];
            } else {
                return components[0].replace(/'/g, '');
            }
        } else {
            return '';
        }
    }
    
    /**
     * @param {String} readLink OData ReadLink to parse
     * @returns {String} ReadLink string with decoded key values
     */
    static decodeReadLink(readLink) {
        let components = readLink.match(/([A-z]+=)?'([0-9]|[A-z]|%)+'/g);
        let entitySetName = readLink.slice(0, readLink.indexOf('('));
        let arr = [];
        if (components) {
            for (let idx in components) {
                let tmp = components[idx].split('=');
                tmp[1] = decodeURIComponent(tmp[1]);
                arr.push(tmp.join('='));
            }
            return `${entitySetName}(${arr.join(',')})`;
        } else {
            return readLink;
        }
    }

    /**
     * Return the error string from an action result
     * @param {String} key Key used in the action result metadata
     */
    static getActionResultError(context, key) {
        let targetPath = '#ActionResults:' + key + '/#Property:error';
        let errorString = context.evaluateTargetPath(targetPath);
        // Remove error code and 'Error Descrition" from the message string
        let error = errorString.message.replace(/\[(.*)\]\s*/g, '').replace(/Error description:\s*/g, '');
        return error;
    }


    /*
    * Saves the binding object
    * Workaround for Action binding issue
    *
    * @deprecated Use function {@link }setBindingObject(context) instead.
    */
    static SetBindingObject(context) {
        this.setStateVariable(context, 'BINDINGOBJECT', context.binding);
    }

    /*
    * returns the binding object saved to the overview page
    * @deprecated Use function {@link }getBindingObject(context) instead.
    */
    static GetBindingObject(context) {
        return this.getStateVariable(context, 'BINDINGOBJECT');
    }

    /**
     * Finds the binding object from context and saves it to clientData using key BINDINGOBJECT.
     * @param {*} context Any type of context page, or proxy.
     * @returns bindingObj if one is found. Undefined if not binding object was found.
     */
    static setBindingObject(context) {
        let bindingObj = context.binding;

        //Check if being called from context menu swipe
        if (context.constructor.name === 'SectionedTableProxy' && context.getPageProxy().getExecutedContextMenuItem()) {
            bindingObj = context.getPageProxy().getExecutedContextMenuItem().getBinding();
        }

        if (this.isDefined(bindingObj)) {
            this.setStateVariable(context, 'BINDINGOBJECT', bindingObj);
            return bindingObj;
        }

        return undefined;
    }

    /**
     * If context has the binding object, use it first. Otherwise, retrieve it from what was previously saved in client data. If nothing was saved, then use setBindingObject(context) first next time.
     * @param {*} context Any type of context page, or proxy.
     * @returns The binding object or undefined if nothing was previously saved or nothing was found in context.
     */
    static getBindingObject(context) {
        let bindingObj = context.binding;

        /**
         * In certain scenarios like setting WO status to hold from a context menu swipe, bindingObj is SimplePropertyCollectionSectionDefinition
         * which is not what we're looking for so we have to check if we’re coming from a context menu swipe first. If so, we want to retrieve the
         * previously saved binding object from setBindingObject(context).
         */
        if (this.isDefined(bindingObj) && !this.isDefined(this.getStateVariable(context, 'contextMenuSwipePage'))) {
            return bindingObj;
        }

        return this.getStateVariable(context, 'BINDINGOBJECT');
    }

    /**
     * Removes the binding object.
     * @param {*} context Any type of context page, or proxy.
     * @returns nothing.
     */
    static removeBindingObject(context) {
        return this.removeStateVariable(context, 'BINDINGOBJECT');
    }

    /**
     *
     * @param {Context} context Current MDK Context
     * @param {String} action Action to be called, iterating over each element in `pickerItems`
     * @param {Array<Any>} pickerItems Array of elements to be iterated over. Stored in context.binding.Item
     *
     * Example Rule (assuming `pickerItems` was populated via `context.evaluateTargetPath('#Control:EquipmentPicker/#Value');`)
     ```
     {
         "Properties":
         {
             "DismantleEquip": "{{#Property:EquipId}}",
             "DismantleDate": "/SAPAssetManager/Rules/DateTime/CurrentDateTime.js",
             "DismantleTime": "/SAPAssetManager/Rules/DateTime/CurrentTime.js"
         },
         "Target":
         {
             "EntitySet": "MyEquipments",
             "Service": "/SAPAssetManager/Services/AssetManager.service",
             "ReadLink": "MyEquipments('{{#Property:Item/#Property:ReturnValue}}')"
         },
         "_Type": "Action.Type.ODataService.UpdateEntity"
     }
     ```
     */
    /*
    * returns the binding object saved to the overview page
    */
    /*
    * returns the binding object saved to the overview page
    */
    static CallActionWithPickerItems(context, action, pickerItems) {
        if (pickerItems.length > 0) {
            let newBinding = context.binding;

            newBinding.Item = pickerItems.shift();
            context.setActionBinding(newBinding);

            return context.executeAction(action)
                .then(() => {
                    return this.CallActionWithPickerItems(context, action, pickerItems);
                })
                .catch(error => {
                    _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error(error);
                    return this.CallActionWithPickerItems(context, action, pickerItems);
                });
        } else {
            return Promise.resolve();
        }
    }

    /**
    * Describe this function...
    */
    static getControlValue(control) {
        if (control != null) {
            let value = control.getValue();
            if (Array.isArray(value)) {
                return _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getListPickerValue(value);
            } else {
                return value;
            }
        }
        return '';
    }

    /**
     * Checks to see if a parameter value is enabled by testing to see if its equal to Y, YES, T, or TRUE case-insensitively.
     * Returns false if parameter is not found or its value is blank.
     * @param {*} string
     */
    static isAppParameterEnabled(context, paramGroup, paramName) {
        let value = this.getAppParam(context, paramGroup, paramName);
        if (value && value !== '') {
            value = value.toUpperCase();
            if (value === 'Y' || value === 'T' || value === 'YES' || value === 'TRUE') {
                return true;
            }
        }
        return false;
    }

    /**
     * Saves initial values of a Form page in the page's client data
     * @param {*} string
     */
    static saveInitialValues(context) {
        setTimeout(function() {
            let clientData = context.getClientData();
            let controls = _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getControlDictionaryFromPage(context);
            var valueString = '';
            Object.keys(controls).forEach(key => {
                let control = controls[key];
                valueString += _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getControlValue(control);
            });
            clientData.controlDefaults = {};
            clientData.controlDefaults.valueString = valueString;
            _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].debug(context.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), 'Start Values:' + valueString);
        }, 200);
    }

    /**
     * Checks if current values in a form page are same or different from the initial values.
     * @param {*} string
     */
    static unsavedChangesPresent(context) {
        let clientData = context.getClientData();
        let controls = _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getControlDictionaryFromPage(context);
        var valueString = '';
        Object.keys(controls).forEach(key => {
            let control = controls[key];
            valueString += _CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getControlValue(control);
        });
        _Logger__WEBPACK_IMPORTED_MODULE_2__["default"].debug(context.getGlobalDefinition(`/SAPAssetManager/Globals/Logs/CategoryCommon.global`).getValue(), 'Final Values:' + valueString);
        if (!_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].isDefined(clientData.controlDefaults)) {
            return true;
        } else {
            return (clientData.controlDefaults.valueString !== valueString);
        }
    }

    /**
     * Converts a duration in minutes to a TimeStamp format of the form PT00H00M00S
     */
    static minutesToTimeStamp(minutes) {
        if (_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].evalIsEmpty(minutes) || isNaN(minutes) || minutes < 0 || minutes > 1440) {
            return 'PT00H00M00S';
        } else {
            let hour = ('0' + Math.floor(minutes / 60)).slice(-2);
            let min = ('0' + minutes % 60).slice(-2);
            return 'PT' + hour + 'H' + min + '00S';
        }

    }

    /**
     * Checks if a string is numeric or not.
     * @param {*} num
     */
    static isNumeric(num) {
        return !isNaN(num);
    }

    /**
     * Removes leading zeros from a string that is numeric.
     * @param {*} numberStr
     */
    static removeLeadingZeros(numberStr) {
        if (this.isDefined(numberStr)) {
            if (this.isNumeric(numberStr)) {
                //To automatically removes leading zeros from numberStr
                return parseInt(numberStr).toString();
            }
        }
        return numberStr;
    }

    static isInitialSync(context) {
        return _ApplicationSettings__WEBPACK_IMPORTED_MODULE_5__["default"].getBoolean(context, 'initialSync', true);
    }

    static setInitialSync(context) {
        return _ApplicationSettings__WEBPACK_IMPORTED_MODULE_5__["default"].setBoolean(context, 'initialSync', false);
    }

    static isApplicationLaunch(context) {
        return _ApplicationSettings__WEBPACK_IMPORTED_MODULE_5__["default"].getBoolean(context, 'applicationLaunch', false);
    }

    static setApplicationLaunch(context, flag) {
        return _ApplicationSettings__WEBPACK_IMPORTED_MODULE_5__["default"].setBoolean(context, 'applicationLaunch', flag);
    }

    /**
     * Returns a date from a date time string
     * @param {String} dateString
     * @return {Date}
     */
    static dateStringToUTCDatetime(dateString) {
        //example 2018-02-04T00:00:00
        var dateParts = dateString.split('-');
        // exmpl 04T00:00:00 -> 04
        var day = (dateParts[2].split('T'))[0];
        var date = new Date(dateParts[0], dateParts[1] - 1, day);
        return date;
    }
    /**
     * Returns a formatted date
     * @param {*} dateTime
     * @return {String}
     */
    static getFormattedDate(dateTime, clientAPI) {
        /*   let month = dateTime.getMonth() + 1;
            if (Number(month) < 10) month = '0' + month;
            let day = dateTime.getDate();
            if (Number(day) < 10) day = '0' + day;
            let year = dateTime.getFullYear();
            return year + '.' + month + '.' + day;
        */
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        var dateText = '';

        if (dateTime.toDateString() === today.toDateString()) {
            dateText = clientAPI.localizeText(`today`);
        } else if (dateTime.toDateString() === tomorrow.toDateString()) {
            dateText = clientAPI.localizeText(`tomorrow`);
        } else {
            dateText = clientAPI.formatDate(dateTime);
        }

        return dateText;

    }

    static getVendorName(clientAPI, vendorId) {
        var queryOption = "$filter=Vendor eq '" + vendorId + "'";
        return clientAPI.read(`/SAPAssetManager/Services/AssetManager.service`, 'Vendors', [], queryOption).then((result) => {
            if (result && result.length > 0) {
                return result.getItem(0).Vendor + ' - ' + result.getItem(0).Name1;
            } else {
                return vendorId;
            }
        });
    }

    static getPlantName(clientAPI, plantId) {
        var queryOptions = "$filter=Plant eq '" + plantId + "'";
        return clientAPI.read(`/SAPAssetManager/Services/AssetManager.service`, 'Plants', [], queryOptions).then((result) => {
            if (result && result.length > 0) {
                return result.getItem(0).Plant + ' - ' + result.getItem(0).PlantDescription;
            }
            return plantId;
        });
    }

    static getStorageLocationName(clientAPI, plantId, storageLocationId) {
        var queryOptions = "$filter=Plant eq '" + plantId + "' and StorageLocation eq '" + storageLocationId + "'";
        return clientAPI.read(`/SAPAssetManager/Services/AssetManager.service`, 'StorageLocations', [], queryOptions).then((result) => {
            if (result && result.length > 0) {
                return result.getItem(0).StorageLocation + ' - ' + result.getItem(0).StorageLocationDesc;
            }
            return storageLocationId;
        });
    }

    static getCustomerName(clientAPI, customerId) {
        var queryOptions = "$filter=Customer eq '" + customerId + "'";
        return clientAPI.read(`/SAPAssetManager/Services/AssetManager.service`, 'Customers', [], queryOptions).then((result) => {
            if (result && result.length > 0) {
                return result.getItem(0).Name1;
            } else {
                return customerId;
            }
        });
    }

    static lengthFieldValidation(context, globalDef) {
        const noteValue = context.getValue();
        let charLimit = Number(context.getGlobalDefinition(globalDef).getValue());

        if (noteValue && noteValue.length > charLimit) {
            let note = noteValue.substring(0, charLimit);
            context.setValue(note);
            this.setInlineControlError(context, context, context.localizeText(`validation_maximum_field_length`, [charLimit]));
            context.applyValidation();
        } else {
            if (noteValue.length < charLimit) {
                this.clearValidationOnInput(context);
            }
        }
    }

    static clearValidationOnInput(context) {
        if (context._control && context._control._validationProperties
            && !context._control._validationProperties.ValidationViewIsHidden) {
            if (context.clearValidationOnValueChange) {
                context.clearValidationOnValueChange();
            } else {
                context.clearValidation();
            }
        }
    }

    static getPlantFromWorkCenter(clientAPI, externalWorkCenterId) {
        let plant = '';

        if (externalWorkCenterId) {
            return clientAPI.read(`/SAPAssetManager/Services/AssetManager.service`, 'WorkCenters', ['PlantId'], `$filter=ExternalWorkCenterId eq '${externalWorkCenterId}'`).then((workCenterArray) => {
                if (workCenterArray.length > 0) {
                    plant = workCenterArray.getItem(0).PlantId;
                }
                return plant;
            });
        }

        return plant;
    }
    /**
    * Get Query Options from internal context for the filters
    * This was added because the actionResults are null when
    * user press cancel button on the filter without modifying
    * any options causing the wrong count on the page
    */
    static getQueryOptionFromFilter(context) {
        let pageProxy = context.getPageProxy();
        var currentFilter = null;
        if (pageProxy.getControls().length > 0) {
            let filter = null;
            if (pageProxy.getControls()[0].getSections()[0]._context.element.observable()._currentFilter) {
                currentFilter = pageProxy.getControls()[0].getSections()[0]._context.element.observable()._currentFilter;
                filter = `$filter=${encodeURIComponent(currentFilter)}`;
                return filter;
            }
            return filter;
        }
        return currentFilter;
    }

    static oneLineAddress(address) {
        return `${address.HouseNum} ${address.Street}, ${address.City}, ${address.Region} ${address.PostalCode} ${address.Country}`;
    }

    /*static buildActivityTypeQueryOptions(context, workCenter) {
        let queryBuilder = new QueryBuilder();
        queryBuilder.addExtra('ActivityType asc');

        let activityType = libThis.getExpenseActivityType(context);

        if (!libVal.evalIsEmpty(activityType)) {
            queryBuilder.addFilter(`ActivityType eq '${activityType}'`);
        }

        if (!libVal.evalIsEmpty(workCenter)) {
            return context.read('/SAPAssetManager/Services/AssetManager.service', 'WorkCenters', ['CostCenter', 'ControllingArea'], `$filter=ExternalWorkCenterId eq '${workCenter}' and ObjectType eq 'A'`).then(function(result) {
                if (!libVal.evalIsEmpty(result)) {
                    if (!libVal.evalIsEmpty(result.getItem(0).CostCenter)) {
                        queryBuilder.addFilter(`CostCenter eq '${result.getItem(0).CostCenter}'`);
                    }
                    if (!libVal.evalIsEmpty(result.getItem(0).ControllingArea)) {
                        queryBuilder.addFilter(`ControllingArea eq '${result.getItem(0).ControllingArea}'`);
                    }
                }

                return queryBuilder.build();
            });
        }

        return queryBuilder.build();
    }*/

    static isOnlineServiceInitialized(context) {
        let provider = context.getODataProvider(`/SAPAssetManager/Services/OnlineAssetManager.service`);
        return provider.isInitialized();
    }

    static sleep(ms) {
        return (new Promise((resolve) => {
            setTimeout(function() {
                resolve();
            }, ms);
        }));
    }

    /*
    If a date outside of the 14 day range is selected then a ConfirmationOverviewRow will need to be created to display time records
    */
   /*static createOverviewRow(context, newDate) {
        let oDataDate = new ODataDate(newDate);
        let dateQuery = oDataDate.queryString(context, 'date');
        let dateFilter = `$filter=PostingDate eq ${dateQuery}`;

        return context.read('/SAPAssetManager/Services/AssetManager.service', 'ConfirmationOverviewRows', [], dateFilter).then(overviewRow => {
            if (libVal.evalIsEmpty(overviewRow)) {
                return context.executeAction({
                    'Name': '/SAPAssetManager/Actions/Confirmations/ConfirmationOverviewRowCreate.action',
                    'Properties': {
                        'Properties': {
                            'PostingDate': oDataDate.toLocalDateString(),
                        },
                    },
                }).then(() => {
                    return Promise.resolve(dateFilter);
                });
            }

            return Promise.resolve(dateFilter);
        });
    }*/

    static formatFileSizeString(fileSize) {
        const units = ['Bytes', 'KB', 'MB', 'GB'];
        var i = 0; for (; fileSize > 1024; i++) {
            fileSize /= 1024;
        }
        return fileSize.toFixed(2) + ' ' + units[i];
    }

    /**
     * Returns field caption with required sign if field is required
     * @param {ClientAPI} context MDK context
     * @param {String} translationTextKey Translation text key
     * @param {Boolean} isRequired Flag value is field required or not
     * @param {String} requiredSign Required sign
     * @return {String}
     */
    static formatCaptionWithRequiredSign(context, translationTextKey, isRequired = false, requiredSign = '*') {
        const caption = context.localizeText(translationTextKey);
        return `${caption}${isRequired ? ' ' + requiredSign : ''}`;
    }
    /**
     * Attach filter to query options string
     * @param {String} queryOptions
     * @param {String} filter
     * @returns {String}
     */
    static attachFilterToQueryOptionsString(queryOptions = '', filter) {
        if (_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].evalIsEmpty(filter)) {
            return queryOptions;
        }

        if (_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].evalIsEmpty(queryOptions)) {
            return `$filter=${filter}`;
        }

        const filterIdx = queryOptions.indexOf('$filter=');
        if (queryOptions.indexOf('$filter=') === -1) {
            return `${queryOptions}&$filter=${filter}`;
        }

        const ampersanIdxdAfterFilter = queryOptions.indexOf('&', filterIdx);
        if (ampersanIdxdAfterFilter === -1) {
            if (!queryOptions.slice(filterIdx).replace('$filter=', '').length) {
                return `${queryOptions}${filter}`;
            }
            return `${queryOptions} and ${filter}`;
        }

        const filterStr = queryOptions.substring(filterIdx, ampersanIdxdAfterFilter);

        if (!filterStr.replace('$filter=', '').length) {
            return queryOptions.replace(filterStr, `${filterStr}${filter}`);
        }

        return queryOptions.replace(filterStr, `${filterStr} and ${filter}`);
    }

    static addNewLineAfterSentences(str) {
        const sentences = str.split(/\.|\?|!/); // split string into sentences
        sentences.pop();
        if (sentences.length < 2) { // if there's only one sentence, return the original string
            return str;
        }
        const newString = sentences.map(sentence => sentence.trim()).join('.\n') + '.'; // add new line after each sentence
        return newString;
    }

    /**
     * returns the parent section of the argument controlProxy.
     * useful, when wanting to get adjacent controls in a "dynamically generated" page, where multiple sections have the same name
     * @param {IControlProxy} controlProxy
     * @returns {IResetableSectionProxy | ISelectableSectionProxy | IBindableSectionProxy}
     */
    static GetParentSection(controlProxy) {
        return controlProxy.getPageProxy().getControl('FormCellContainer').getSections().find(sectionProxy => sectionProxy._context.element === controlProxy._control.parentSection);
    }

    /**
     *  @param {?ISectionedTableProxy} sectionedTable - could be undefined e.g. returning from a filterpage
     * @returns {string}
    */
    static GetSectionedTableFilterTerm(sectionedTable) {
        return sectionedTable ? sectionedTable._context.element._getTableSectionObservable()._currentFilter : '';
    }
    /**
     * Check the existing cache, update it and redraw the page
     * @param {*} context
     * @param {*} cachedValue
     * @param {*} currentValue
     * @returns modified cached value
    */
    /*static updateCacheAndRedraw(context, cachedValue, currentValue) {
        if (cachedValue === null) {
            cachedValue =  currentValue;
        }
        if (cachedValue !== null && cachedValue !== currentValue) {
            cachedValue = currentValue;
            // Trigger a page redraw if the cached value and the current value are different
            let overviewPageName = libPersona.getPersonaOverviewStateVariablePage(context);
            let overviewPage = context.evaluateTargetPathForAPI('#Page:' + overviewPageName);
            if (overviewPage && overviewPage.getControls().length > 0) {
                let controls = overviewPage.getControls();
                // Only redraw the last section i.e. Section Table
                let lastControlIndex = controls.length - 1;
                controls[lastControlIndex].redraw();
            }
        }
        return cachedValue;
    }*/

    /**
     * Given a timestamp and a threshold value, compare against the current time to determine
     * whether the threshold time has passed
     * @param {String} lastRefreshTime
     * @param {String} threshold (minutes)
     * @returns {Boolean}
    */
    static hasThresholdPassed(lastRefreshTime, threshold) {

        if (lastRefreshTime && threshold && this.isNumeric(threshold)) {
            const currentDateTime = new Date();
            const lastRefreshDateTime = new Date(lastRefreshTime);
            return Math.ceil((currentDateTime - lastRefreshDateTime) / 60000) > threshold;
        } else {
            return true;
        }
    }
});


const WCMAssignmentType = Object.freeze({
    UserPlant: '1',
    UserWorkCenter: '2',
    UserPlannerGroup: '3',
    PartnerFunction: '4',
    SelectionVariant: '5',
    OperationalList: '6',
    DependencyQue: 'D',
    Other: 'Z',
});


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Library/CurrentDateTime.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Library/CurrentDateTime.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CurrentDateTime)
/* harmony export */ });
/* harmony import */ var _ODataDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ODataDate */ "./build.definitions/FrieghtAppDetail/Rules/Library/ODataDate.js");


function CurrentDateTime(context) {
    let odataDate = new _ODataDate__WEBPACK_IMPORTED_MODULE_0__["default"]();
    return odataDate.toDBDateTimeString(context);
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Library/GlobalCommon.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Library/GlobalCommon.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalVar: () => (/* binding */ GlobalVar)
/* harmony export */ });
/**
 * Static class that has all of the getter and setter of the global variable
 */
class GlobalVar {

    static setAppParam(value) {
        this._globalAppParam = value;
    }

    static getAppParam() {
        return this._globalAppParam;
    }

    static setUserSystemInfo(value) {
        this._globalUserSystemInfo = value;
    }

    static getUserSystemInfo() {
        return this._globalUserSystemInfo;
    }

    static setUserGeneralInfo(value) {
        this._globalUserGeneralInfo = value;
    }

    static getUserGeneralInfo() {
        return this._globalUserGeneralInfo;
    }
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Library/IsAndroid.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Library/IsAndroid.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IsAndroid)
/* harmony export */ });
/* harmony import */ var _NativeScriptObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NativeScriptObject */ "./build.definitions/FrieghtAppDetail/Rules/Library/NativeScriptObject.js");


function IsAndroid(context) {
    if (_NativeScriptObject__WEBPACK_IMPORTED_MODULE_0__["default"].getNativeScriptObject(context).platformModule.isAndroid) {
        return true;
    } else {
        return false;
    }
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Library/LocalizationLibrary.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Library/LocalizationLibrary.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {

    /**
     * Returns the decimal separator for the passed in locale, or
     * the default for the device.
     * @param {String} locale - locale in the format 'xx-YY' where xx is the language code
     * and YY is the region such as 'en-US' or 'de-DE'
     * @returns {String} - the single character decimal separator
     */
    static getDecimalSeparator(context, locale='') {
        if (locale === '') {
            locale = context.getLanguage() + '-' + context.getRegion();
        }
    
        return (context.formatNumber(Number(1.1),locale)).substr(1,1);

    }

    /**
     * Tests whether the passed in string is a valid number for the
     * default locale
     * @param {ClientAPI} context 
     * @param {String} numString - Number in string format 
     * @param {String} seperator - character to be used as decimal separator
     * @returns {Boolean} 
     */
    static isNumber(context, numString, locale='') {

        if (_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].evalIsEmpty(numString)) return false;

        if (typeof numString === 'number') {
            return true;
        }

        let seperator = this.getDecimalSeparator(context, locale);

        let euroReg = /^[+-]?(?:\d{1,3}(?:\.\d{3})*|\d+)?(?:,\d+)?$/;
        let usReg = /^[+-]?(?:\d{1,3}(?:,\d{3})*|\d+)?(?:\.\d+)?$/;
        let expReg = /^[+-]?\d?(?:\.\d+)?[Ee][-+]?\d+$/;

        if (typeof numString === 'string') {
            numString = numString.trim();
        }
        if (seperator === '.') {
            return (usReg.test(numString) || expReg.test(numString));
        } else if (seperator === ',') {
            return (euroReg.test(numString) || expReg.test(numString));
        }

        return false;
    }
    /**
    * Converts the passed in string to a valid number for the
    * specified or default locale
    * @param {ClientAPI} context 
    * @param {String} numString - Number in string format 
    * @param {String} seperator - character to be used as decimal separator
    * @returns {Number} - String converted to a Number
    */
    static toNumber(context, numString, locale='', allowNaN=true) {
        let seperator = this.getDecimalSeparator(context, locale);

        if (this.isNumber(context, numString, locale)) {
            if (typeof numString === 'string') {
                numString = numString.trim();
                let temp = '';
                if (seperator === '.') {
                    temp = numString.replace(/,/g, '');
                } else if (seperator === ',') {
                    temp = numString.replace(/\./g, '');
                    temp = temp.replace(',', '.');
                } else {
                    return allowNaN === true ? Number(NaN) : '';
                }
                return Number(temp);
            } else if (typeof numString === 'number') {
                return numString;
            }
        }
        return allowNaN === true ? Number(NaN) : '';
    }
    
    /**
    * Converts the passed in string to a valid currency string for the
    * specified or default locale
    * @param {ClientAPI} context 
    * @param {String} value - Number in string format 
    * @param {Boolean} useSymbol - whether to replace currency code with a symbol or leave as is 
    * @param {String} locale - locale to format to
    * @returns {String} - String formatted to a currency string in specified locale
    */
    static toCurrencyString(context, value, currencyCode, useSymbol = true, locale = context.getLanguage() + '-' + context.getRegion()) {
        if (_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].evalIsNumeric(value)) {
            if (useSymbol) {
                return context.formatCurrency(value, currencyCode, locale);
            } else {
                return context.formatNumber(value, locale) + ' ' + currencyCode;
            }
        } else {
            return '-';
        }
    }
});


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Library/Logger.js":
/*!********************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Library/Logger.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {

    static init(clientAPI) {
        if (this._instance == null) {
            this._instance = clientAPI.getLogger();
        }
    }
    /**
     * Log an error message. Adds domain to the message
     * @param {*} context
     * @param {String} domain (Job, Notif, Equipment, Floc, Geo, Analytics etc)
     * @param {String} message Message to log
     */
    static error(domain, message) {
        var msg = '[' + domain + '] ' + message;
        if (this._instance) {
            this._instance.log(msg, 'Error');
        }
        // eslint-disable-next-line no-console
        console.log(`${Date()} ${msg}`);
    }
    /**
     * Log a warning message. Adds domain to the message
     * @param {*} context
     * @param {String} domain (Job, Notif, Equipment, Floc, Geo, Analytics etc)
     * @param {String} message Message to log
     */
    static warn(domain, message) {
        var msg = '[' + domain + '] ' + message;
        if (this._instance) {
            this._instance.log(msg, 'Warn');
        }
        // eslint-disable-next-line no-console
        console.log(`${Date()} ${msg}`);
    }
    /**
     * Log an info message. Adds domain to the message
     * @param {*} context
     * @param {String} domain (Job, Notif, Equipment, Floc, Geo, Analytics etc)
     * @param {String} message Message to log
     */
    static info(domain, message) {
        var msg = '[' + domain + '] ' + message;
        if (this._instance) {
            this._instance.log(msg, 'Info');
        }
        // eslint-disable-next-line no-console
        console.log(`${Date()} ${msg}`);

    }
    /**
     * Log a debug message. Adds domain to the message
     * @param {*} context
     * @param {String} domain (Job, Notif, Equipment, Floc, Geo, Analytics etc)
     * @param {String} message Message to log
     */
    static debug(domain, message) {
        var msg = '[' + domain + '] ' + message;
        if (this._instance) {
            this._instance.log(msg, 'Debug');
        }
        // eslint-disable-next-line no-console
        console.log(`${Date()} ${msg}`);
    }
});


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Library/NativeScriptObject.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Library/NativeScriptObject.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {

    static init(context) {
        this._nativescript = context.nativescript;
    }

    static getNativeScriptObject(context) {
        if (!this._nativescript) {
            this.init(context);
        }
        return this._nativescript;
    }
});


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Library/ODataDate.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Library/ODataDate.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ODataDate)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");



/**
 * Class for modeling a
 */
class ODataDate {

    /**
     * Create a Date wrapped for OData usage
     *
     * @param {*} date - Specify the date as YYYY-MM-DD string, Date, or timestamp. Default is current date
     * @param {*} time - Specifyt the time as HH-mm-ss string. Default does not adjust time
     * @param {*} offset - Timezone offset in hours. optional, non-numbers ignored
     */
    constructor(date, time, offset) {

        /**
         * Determine the date from first parameter (if found)
         */
        if (date === undefined || date === null) {
            // No date was passed. Use the current date
            this._date = new Date();
        } else if (date instanceof ODataDate) {
            return date;
        } else if (typeof (date) === 'string') {
            this._date = new Date();
            // Substring then run a math op for type conversion
            let year = date.substring(0, 4) * 1;
            // JS Dates are 0 based
            let month = date.substring(5, 7) - 1;
            let dayOfMonth = date.substring(8, 10) * 1;

            this._date.setFullYear(year, month, dayOfMonth);

            let timeIndex = date.indexOf('T');
            if (timeIndex > 0 && time === undefined) {
                // if time is not supplied and date string has a time component
                // set the time argument from date argument
                time = date.substring(timeIndex + 1);
            }

        } else if (date instanceof Date) {
            this._date = date;
        } else if (typeof (date) === 'number') {
            this._date = new Date(date);
        } // Else this was initialized with a bad param Throw error?

        /**
         * Make an adjustment to date based on a passed time component (if found)
         */
        if (time !== undefined) {
            let hours = 0;
            let minutes = 0;
            let seconds = 0;
            if (typeof (time) === 'string') {
                hours = time.substring(0, 2) * 1;
                minutes = time.substring(3, 5) * 1;
                seconds = time.substring(6, 8) * 1;
            } // Else log error ?
            this._date.setHours(hours, minutes, seconds, 0);
        }

        /**
         * Make an offset adjustment
         */
        if (offset !== undefined && typeof (offset) === 'number') {
            // offset may be fractional, so calculate and adjust minutes, negative if necessary
            let minutes = Math.abs((offset % 1) * 60);
            this._date.setHours(this._date.getHours() + offset, this._date.getMinutes() + minutes);
        }

    }

    date() {
        return this._date;
    }

    /**
     * Create a date with the backend offset removed.
     * Ignore timezone when using this date
     * @param {*} context
     */
    toDBDate(context) {
        let backendOffset = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].getBackendOffsetFromSystemProperty(context) * 60 * 60 * 1000;
        // Remove the offset between backend time and now
        return new Date(this._date.getTime() + backendOffset);
    }

    repeatingZeros(count) {
        return '0'.repeat(count);
    }

    toDBDateString(context, trailingZeros = 0) {
        let _date = this.toDBDate(context);
        let isoDate = _date.toISOString();
        let suffix = trailingZeros > 0 ? '.' + this.repeatingZeros(trailingZeros) : '';
        return isoDate.substring(0, 10) + 'T00:00:00' + suffix;
    }

    static fromDBDateString(context, dbDateString) {
        const dateMatch = dbDateString.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
        if (_Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].evalIsEmpty(dateMatch)) {
            return undefined;
        }
        const valueUTC = new Date(`${dateMatch[0].split('T')[0]}`).getTime() + (-1 * _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].getBackendOffsetFromSystemProperty(context) * 60 * 60 * 1000);
        return new ODataDate(valueUTC);
    }

    toDBTimeString(context, trailingZeros = 0) {
        let _date = this.toDBDate(context);
        let isoDate = _date.toISOString();
        let suffix = trailingZeros > 0 ? '.' + this.repeatingZeros(trailingZeros) : '';
        return isoDate.substring(11, 19) + suffix;
    }

    toEDMTimeString(context) {
        let _date = this.toDBDate(context);
        const [h, m, s] = _date.toISOString().substring(11, 19).split(':');
        return `PT${h}H${m}M${s}S`;
    }

    toDBDateTimeString(context, trailingZeros = 0) {
        let _date = this.toDBDate(context);
        let isoDate = _date.toISOString();
        let suffix = trailingZeros > 0 ? '.' + this.repeatingZeros(trailingZeros) : '';
        return isoDate.substring(0, 19) + suffix;
    }

    /**
     * Get the Date represented as a string ignoring all offsets
     * @param {*} trailingZeros
     */
    toLocalDateString(trailingZeros = 0) {
        let year = this._date.getFullYear();
        let month = this._date.getMonth() + 1;
        if (month < 10) month = `0${month}`;
        let day = this._date.getDate();
        if (day < 10) day = `0${day}`;
        let suffix = trailingZeros > 0 ? '.' + this.repeatingZeros(trailingZeros) : '';
        return `${year}-${month}-${day}T00:00:00${suffix}`;
    }

    /**
     * Get the time represented as a string ignoring all offsets
     * @param {*} trailingZeros
     */
    toLocalTimeString(trailingZeros = 0) {
        let hr = this._date.getHours();
        if (hr < 10) hr = `0${hr}`;

        let min = this._date.getMinutes();
        if (min < 10) min = `0${min}`;

        let suffix = trailingZeros > 0 ? '.' + this.repeatingZeros(trailingZeros) : '';
        return `${hr}:${min}:00${suffix}`;
    }

    /**
     * Retrieve a string that can be added to an OData query
     * @param {Context} context - Calling context
     * @param {String} property - date, time, or datetime
     * @param {Number} trailingZeros - (optional) some entities require '.{0 X trailingZeros}' as suffix.
     */
    queryString(context, property, trailingZeros = 0) {
        let value;
        let type;
        switch (property) {
            case 'date':
                value = this.toLocalDateString(context, trailingZeros);
                type = 'datetime';
                break;
            case 'datetime':
                value = this.toDBDateTimeString(context, trailingZeros);
                type = 'datetime';
                break;
            case 'time':
                value = this.toDBTimeString(context, trailingZeros);
                type = 'time';
                break;
            default:
                return null;
        }
        return `${type}'${value}'`;
    }

}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomDirective: () => (/* binding */ CustomDirective),
/* harmony export */   RequiredDirective: () => (/* binding */ RequiredDirective),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");
/* harmony import */ var _LocalizationLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LocalizationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/LocalizationLibrary.js");
/* harmony import */ var _CommonLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Logger */ "./build.definitions/FrieghtAppDetail/Rules/Library/Logger.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {
    /*
     * determines if a value is undefined, empty or null
     */
    static evalIsEmpty(val) {
        return (val === undefined || val == null || val.length <= 0 || val === 'undefined');
    }

    /**
    * Checks if the param is a number
    */
    static evalIsNumeric(val) {
        if (_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].evalIsEmpty(val)) return false;
        return !isNaN(Number(val)) && isFinite(val);
    }

    static evalAreNumbersEqual(context, firstNumber, secondNumber) {
        return _LocalizationLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].toNumber(context, firstNumber) === _LocalizationLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].toNumber(context, secondNumber);
    }

    static isFirstNumberGreaterThanSecond(context, firstNumber, secondNumber) {
        return _LocalizationLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].toNumber(context, firstNumber) > _LocalizationLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].toNumber(context, secondNumber);
    }

    static isFirstNumberLessThanSecond(context, firstNumber, secondNumber) {
        return _LocalizationLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].toNumber(context, firstNumber) < _LocalizationLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].toNumber(context, secondNumber);
    }

    static isControlEmpty(control) {
        return this.evalIsEmpty(control.getValue());
    }

    static isExceededMaxLength(control, maxLength) {
        const value = control.getValue();
        return this.evalIsEmpty(value) ? false : maxLength < value.length;
    }

    /**
    * @param {(IControlProxy & IClientAPI)[]} controls
    * @param {string[]} requiredControlNames
    * @returns {(IControlProxy & IClientAPI)[]}
    */
    static getUnfilledRequiredControls(controls, requiredControlNames) {
        return controls.filter(c => requiredControlNames.includes(c.getName()) && this.isControlEmpty(c));
    }

    /**
    * filters the argument controls array with the predicate that determines if the control's value's length is greater than the one specified on the argument controlNameToMaxLength.
    * controlNameToMaxLength is an object. e.g.: {MyExampleDescriptionFieldName: 13, MyOtherExampleFieldName: 40, ...}
    * @param {(IControlProxy & IClientAPI)[]} controls
    * @param {Object.<string, number>} controlNameToMaxLength
    * @returns {(IControlProxy & IClientAPI)[]}
    */
    static getMaxLengthExceededControls(controls, controlNameToMaxLength) {
        return controls.filter(c => (c.getName() in controlNameToMaxLength) && this.isExceededMaxLength(c, controlNameToMaxLength[c.getName()]));
    }

    /**
    * @param {(IControlProxy & IClientAPI)} control
    * @param {number} maxLength
    */
    static controlSetMaxLengthValidation(control, maxLength) {
        const valueLength = control.getValue().length;
        return maxLength < valueLength ? _CommonLibrary__WEBPACK_IMPORTED_MODULE_2__["default"].executeInlineControlError(control, control, control.localizeText(`exceeds_max_length_x_x`, [valueLength, maxLength])) : _CommonLibrary__WEBPACK_IMPORTED_MODULE_2__["default"].clearValidationOnInput(control);
    }

    /**
    * @param {IClientAPI} context
    * @param {(IControlProxy & IClientAPI)[]} controls
    * @param {string[]} requiredControlNames
    * @param {Object.<string, number>} controlNameToMaxLength
    * @returns {(IControlProxy & IClientAPI)[]}
    */
    static setValidationInlineErrors(context, controls, requiredControlNames, controlNameToMaxLength) {
        const unfilledRequiredControls = this.getUnfilledRequiredControls(controls, requiredControlNames);
        unfilledRequiredControls.forEach(c => _CommonLibrary__WEBPACK_IMPORTED_MODULE_2__["default"].executeInlineControlError(context, c, context.localizeText(`field_is_required`)));

        const maxLengthExceededControls = this.getMaxLengthExceededControls(controls, controlNameToMaxLength);  // we dont expect to have the same field being empty and exceeding the max char limit at the same time
        maxLengthExceededControls.forEach(c => _CommonLibrary__WEBPACK_IMPORTED_MODULE_2__["default"].executeInlineControlError(context, c, context.localizeText(`exceeds_max_length_x_x`, [c.getValue().length, controlNameToMaxLength[c.getName()]])));

        return [...unfilledRequiredControls, ...maxLengthExceededControls];
    }
});

class _DirectiveBase {
    /**
     * @callback isAnyControlBoolCallback
     * @param {IControlProxy} controlProxy
     * @returns {boolean}
     */
    /**
     * @callback isAnyControlStrCallback
     * @param {IControlProxy} controlProxy
     * @returns {string}
     */
    /**
     * @param {IControlProxy} controlProxy
     * @param {isAnyControlStrCallback} inlineErrorMessage
     * @param {isAnyControlBoolCallback | undefined} isValidCallable returns true if the control is valid (e.g. if the control is required, it returns false if it's empty)
     * @param {isAnyControlBoolCallback | undefined} shouldRunCallable
     */
    constructor(controlProxy, inlineErrorMessage, isValidCallable, shouldRunCallable = undefined) {
        this.controlProxy = controlProxy;
        this.inlineErrorMessage = inlineErrorMessage;
        this.shouldRunCallable = shouldRunCallable;
        this.isValidCallable = isValidCallable;
    }

    /** @returns {Promise<boolean>} */
    applyError() {
        return Promise.resolve(this.shouldRunCallable ? this.shouldRunCallable(this.controlProxy) : true)
            .then(async shouldRun => [shouldRun, shouldRun && await Promise.resolve(this.isValidCallable(this.controlProxy))])  // lazy evaluate the validity check
            .then(([shouldRun, isValid]) => {
                if (!shouldRun || isValid) {
                    return true;
                }
                try {
                    _CommonLibrary__WEBPACK_IMPORTED_MODULE_2__["default"].executeInlineControlError(this.controlProxy, this.controlProxy, this.inlineErrorMessage(this.controlProxy));
                } catch (error) {
                    _Logger__WEBPACK_IMPORTED_MODULE_3__["default"].error('ValidationLibrary', error);
                }
                return false;
            });
    }
}

/**
 * @param {IControlProxy} controlProxy
 * @param {isAnyControlBoolCallback | undefined} isRequiredPredicate
 * @returns {Promise<boolean>}
 */
function RequiredDirective(controlProxy, isRequiredPredicate = undefined) {
    return new _DirectiveBase(controlProxy, (control) => control.localizeText(`field_is_required`), (control) => !_ValidationLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].isControlEmpty(control), isRequiredPredicate).applyError();// eslint-disable-line no-unused-vars
}

/**
 * @param {IControlProxy} controlProxy
 * @param {isAnyControlBoolCallback | undefined} isValidPredicate
 * @param {isAnyControlBoolCallback | undefined} shouldRunPredicate
 * @param {isAnyControlStrCallback} getMessageCallback
 * @returns {Promise<boolean>}
 */
function CustomDirective(controlProxy, isValidPredicate, shouldRunPredicate, getMessageCallback) {
    return new _DirectiveBase(controlProxy, getMessageCallback, isValidPredicate, shouldRunPredicate).applyError();// eslint-disable-line no-unused-vars
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Location/GetCordinates.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Location/GetCordinates.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetCoordinates)
/* harmony export */ });
/* harmony import */ var _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nativescript/geolocation */ "webpack/sharing/consume/default/@nativescript/geolocation");
/* harmony import */ var _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nativescript/core */ "webpack/sharing/consume/default/@nativescript/core");
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nativescript_core__WEBPACK_IMPORTED_MODULE_1__);
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/


async function GetCoordinates(clientAPI) {
    var logger = clientAPI.getLogger();
    console.log("Current Log Level: " + logger.getLevel());
    // check if geolocation is not enabled
    var locationIsEnabled = await _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__.isEnabled();
    if (!locationIsEnabled) {
        // request for the user to enable it
        await _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__.enableLocationRequest();
    }
    // Get current location with high accuracy
    return _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__.getCurrentLocation({
        desiredAccuracy: _nativescript_core__WEBPACK_IMPORTED_MODULE_1__.CoreTypes.Accuracy.high, //This will return the finest location available
        updateDistance: 5, //Update distance filter in meters.
        timeout: 11000 //How long to wait for a location in ms.
    }).then(function (loc) {
        if (loc) {
            console.log(loc);
            console.log('\nCurrent Location: (' + loc.latitude + ',' + loc.longitude + ')');
            logger.log(loc.toString());
            var locMessage = '(' + "Latitude:" + loc.latitude + ',' + "Longitude:" + loc.longitude + ')';
            logger.log('Current Location: ' + locMessage, 'INFO');
            return locMessage;
        }
    }, function (e) {
        logger.log(e.message, 'ERROR');
    });
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Location/GetCurrentLocation.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Location/GetCurrentLocation.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetCurrentLocation)
/* harmony export */ });
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nativescript/core */ "webpack/sharing/consume/default/@nativescript/core");
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nativescript_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nativescript/geolocation */ "webpack/sharing/consume/default/@nativescript/geolocation");
/* harmony import */ var _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nativescript_geolocation__WEBPACK_IMPORTED_MODULE_1__);




function GetCurrentLocation() {
    return _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_1__.getCurrentLocation({
        desiredAccuracy: _nativescript_core__WEBPACK_IMPORTED_MODULE_0__.CoreTypes.Accuracy.high,
        maximumAge: 5000,
        timeout: 10000,
    }).then((loc) => {
            if (loc) {
                let geoJson = {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [],
                    },
                    'properties': null,
                };
                geoJson.geometry.coordinates.push([loc.latitude, loc.longitude]);
                return Promise.resolve(geoJson);
            } else {
                // location not found
                return Promise.resolve();
            }
        }, () => {
            // errors
            return Promise.resolve();
        });
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Location/GetLatitude.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Location/GetLatitude.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetLatitude)
/* harmony export */ });
/* harmony import */ var _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nativescript/geolocation */ "webpack/sharing/consume/default/@nativescript/geolocation");
/* harmony import */ var _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nativescript/core */ "webpack/sharing/consume/default/@nativescript/core");
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nativescript_core__WEBPACK_IMPORTED_MODULE_1__);
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/


async function GetLatitude(clientAPI) {
    var logger = clientAPI.getLogger();
    console.log("Current Log Level: " + logger.getLevel());
    // check if geolocation is not enabled
    var locationIsEnabled = await _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__.isEnabled();
    if (!locationIsEnabled) {
        // request for the user to enable it
        await _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__.enableLocationRequest();
    }
    // Get current location with high accuracy
    return _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__.getCurrentLocation({
        desiredAccuracy: _nativescript_core__WEBPACK_IMPORTED_MODULE_1__.CoreTypes.Accuracy.high, //This will return the finest location available
        updateDistance: 5, //Update distance filter in meters.
        timeout: 11000 //How long to wait for a location in ms.
    }).then(function (loc) {
        if (loc) {
            return loc.latitude;
        }
    }, function (e) {
        logger.log(e.message, 'ERROR');
    });
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Location/GetLongitude.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Location/GetLongitude.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetLatitude)
/* harmony export */ });
/* harmony import */ var _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nativescript/geolocation */ "webpack/sharing/consume/default/@nativescript/geolocation");
/* harmony import */ var _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nativescript/core */ "webpack/sharing/consume/default/@nativescript/core");
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nativescript_core__WEBPACK_IMPORTED_MODULE_1__);
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/


async function GetLatitude(clientAPI) {
    var logger = clientAPI.getLogger();
    console.log("Current Log Level: " + logger.getLevel());
    // check if geolocation is not enabled
    var locationIsEnabled = await _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__.isEnabled();
    if (!locationIsEnabled) {
        // request for the user to enable it
        await _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__.enableLocationRequest();
    }
    // Get current location with high accuracy
    return _nativescript_geolocation__WEBPACK_IMPORTED_MODULE_0__.getCurrentLocation({
        desiredAccuracy: _nativescript_core__WEBPACK_IMPORTED_MODULE_1__.CoreTypes.Accuracy.high, //This will return the finest location available
        updateDistance: 5, //Update distance filter in meters.
        timeout: 11000 //How long to wait for a location in ms.
    }).then(function (loc) {
        if (loc) {
            return loc.longitude;
        }
    }, function (e) {
        logger.log(e.message, 'ERROR');
    });
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Location/ServiceManager.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Location/ServiceManager.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ServiceManager)
/* harmony export */ });
/* harmony import */ var _GetCurrentLocation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GetCurrentLocation */ "./build.definitions/FrieghtAppDetail/Rules/Location/GetCurrentLocation.js");




class ServiceManager {
    constructor() {
        this._instance = null;
        this._isEnabled = true;
        this._watchIDs = [];
    }

    static getInstance() {
        return this._instance || (this._instance = new this());
    }

   

    isTrackingEnabled() {
        return this._isEnabled;
    }


    getCurrentLocation() {
        if (this._isEnabled) {
            return (0,_GetCurrentLocation__WEBPACK_IMPORTED_MODULE_0__["default"])();
        }
        return Promise.resolve();
    }
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Location/ShowLocationValues.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Location/ShowLocationValues.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowLocationValues)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/



async function ShowLocationValues(clientAPI) {
    return _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].getStateVariable(clientAPI, 'locationValues');

}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Logging/LogLevels.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Logging/LogLevels.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Logging/MaterialFetchOnSuccessfulUpdate.js":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Logging/MaterialFetchOnSuccessfulUpdate.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IsValidResponse: () => (/* binding */ IsValidResponse),
/* harmony export */   "default": () => (/* binding */ MaterialFetchOnSuccessfulUpdate)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/

function MaterialFetchOnSuccessfulUpdate(clientAPI) {
    return clientAPI.executeAction("/FrieghtAppDetail/Actions/ProofOfDelivery/StoreFetchedMaterialItem.action").then((materialItem) => {
        if (materialItem.data._array.length > 0 && IsValidResponse(clientAPI, materialItem.data._array)) {
            _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].setStringArray(clientAPI, 'MaterialItemObjectArray', materialItem.data._array);
            clientAPI.dismissActivityIndicator();
            return clientAPI.executeAction('/FrieghtAppDetail/Actions/ClosePage.action');
        }
    });
}
function IsValidResponse(clientAPI, response) {
    try {
        return (!ValidationLibrary.evalIsEmpty(response[0])) && Object.keys(response[0]).length > 0 ? true : false;
    } catch (error) {
        return false;

    }

}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Logging/SetTraceCategories.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Logging/SetTraceCategories.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Logging/SetUserLogLevel.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Logging/SetUserLogLevel.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Logging/ToggleLogging.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Logging/ToggleLogging.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Logging/TraceCategories.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Logging/TraceCategories.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Logging/UserLogSetting.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Logging/UserLogSetting.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/BuildMaterialItemPath.js":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/BuildMaterialItemPath.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BuildShipmentPath)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");


/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/

function BuildShipmentPath(clientAPI) {
    let queryPath = "";
    let shipmentObj = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getStateVariable(clientAPI, 'selectedShipment');
    if (shipmentObj) {
        queryPath = `/trackingItems?$filter=FoId eq '${shipmentObj.shipmentNo}' and locationId eq '${shipmentObj.locationId}'`;
    }
    return queryPath;
}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/FetchMaterialItem.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/FetchMaterialItem.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IsValidResponse: () => (/* binding */ IsValidResponse),
/* harmony export */   "default": () => (/* binding */ NavToShipmentDetails)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Library/Logger */ "./build.definitions/FrieghtAppDetail/Rules/Library/Logger.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");
/* harmony import */ var _TriggerProofOfDelivery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TriggerProofOfDelivery */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/TriggerProofOfDelivery.js");
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */





function NavToShipmentDetails(clientAPI) {

    try {
        let shipmentNum = _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].getString(clientAPI, 'shipmentNumber');
        if (_Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].isDefined(shipmentNum)) {
            let shipmentObj = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getStateVariable(clientAPI, 'selectedShipment');
            if (!_Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].isDefined(shipmentObj)) {
                _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].setStateVariable(clientAPI, 'selectedShipment', clientAPI.getPageProxy().getActionBinding());
            }
            clientAPI.showActivityIndicator("Loading");
            return clientAPI.executeAction("/FrieghtAppDetail/Actions/ProofOfDelivery/StoreFetchedMaterialItem.action").then((materialItem) => {
                if (materialItem.data._array.length > 0 && IsValidResponse(clientAPI, materialItem.data._array)) {
                    _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].setStringArray(clientAPI, 'MaterialItemObjectArray', materialItem.data._array);
                    clientAPI.dismissActivityIndicator();
                    let selectedShipmentObj = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getStateVariable(clientAPI, 'selectedShipment');
                    if (selectedShipmentObj.ItemTabClick) {
                        selectedShipmentObj.ItemTabClick = false;
                        _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].setStateVariable(clientAPI, 'selectedShipmentObj', selectedShipmentObj);
                        return clientAPI.executeAction('/FrieghtAppDetail/Actions/ProofOfDelivery/NavToProofOfDeliveryMateriaReadOnlyList.action');
                    } else {
                        return (0,_TriggerProofOfDelivery__WEBPACK_IMPORTED_MODULE_4__["default"])(clientAPI);
                    }
                }
                //Shipment is Not Valid
                else {
                    clientAPI.dismissActivityIndicator();
                    _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].setStringArray(clientAPI, 'MaterialItemObjectArray', []);
                }
            }, () => {
                clientAPI.dismissActivityIndicator();
            });
        }
        //Show error dialog
    }

    catch (error) {
        clientAPI.dismissActivityIndicator();
        _Library_Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error('Failed to fetch Shipment', error);

    }
}

function IsValidResponse(clientAPI, response) {
    try {
        return (!_Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_3__["default"].evalIsEmpty(response[0])) && Object.keys(response[0]).length > 0 ? true : false;
    } catch (error) {
        return false;

    }

}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/FetchMaterialItemWrapper.js":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/FetchMaterialItemWrapper.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FetchMaterialItemWrapper)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _FetchMaterialItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FetchMaterialItem */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/FetchMaterialItem.js");
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/


function FetchMaterialItemWrapper(clientAPI) {
    let selectedShipment = clientAPI.getPageProxy().getActionBinding();
    selectedShipment.ItemTabClick = true;
    _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].setStateVariable(clientAPI, 'selectedShipment', selectedShipment);
    return (0,_FetchMaterialItem__WEBPACK_IMPORTED_MODULE_1__["default"])(clientAPI);
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/FormatDisplayQuantity.js":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/FormatDisplayQuantity.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormatDisplayQuantity)
/* harmony export */ });
function FormatDisplayQuantity(clientAPI) {
    let value = (clientAPI.binding.dispQty).trim();
    return clientAPI.formatNumber(Number(value));

}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/FormatRecievedQuantity.js":
/*!********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/FormatRecievedQuantity.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormatRecievedQuantity)
/* harmony export */ });
function FormatRecievedQuantity(clientAPI) {
    let value = (clientAPI.binding.rcvQty).trim();
    return clientAPI.formatNumber(Number(value));

}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/GetLocationIDForMaterialUpdate.js":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/GetLocationIDForMaterialUpdate.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetLocationIDForMaterialUpdate)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");


function GetLocationIDForMaterialUpdate(clientAPI) {
    let shipmentObj = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].getStateVariable(clientAPI, 'selectedShipment');
    if (shipmentObj) {
        return shipmentObj.locationId;
    }
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/GetProofOfDeliveryItems.js":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/GetProofOfDeliveryItems.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetProofOfDeliveryItems)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");



/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function GetProofOfDeliveryItems(clientAPI) {
    let materialItem = _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].getStringArray(clientAPI, 'MaterialItemObjectArray');
    return materialItem;
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/GetShipmentNumForMaterialUpdate.js":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/GetShipmentNumForMaterialUpdate.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetShipmentNumForMaterialUpdate)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");

function GetShipmentNumForMaterialUpdate(clientAPI) {
    let shipmentObj = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].getStateVariable(clientAPI, 'selectedShipment');
    if (shipmentObj) {
        return shipmentObj.shipmentNo;
    }
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/IsEmailSectionVisible.js":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/IsEmailSectionVisible.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IsEmailSectionVisible)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");


function IsEmailSectionVisible(clientAPI) {

    let showEmailID = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].getStateVariable(clientAPI, 'ShowEmailIDField');
    if (showEmailID === true) {
        return true;
    }
    return false;
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/MaterialDescriptionStyle.js":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/MaterialDescriptionStyle.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaterialDescriptionStyle)
/* harmony export */ });
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function MaterialDescriptionStyle(clientAPI) {
    if (clientAPI.binding.category == "PKG") {
        return "WorkOrderFilterPage_ToolBar";
    }
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/PostProofOfDelivery.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/PostProofOfDelivery.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostProofOfDelivery)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_Base64Library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/Base64Library */ "./build.definitions/FrieghtAppDetail/Rules/Library/Base64Library.js");
/* harmony import */ var _Library_IsAndroid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Library/IsAndroid */ "./build.definitions/FrieghtAppDetail/Rules/Library/IsAndroid.js");
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/



async function PostProofOfDelivery(clientAPI) {

    try {
        let currentObject = clientAPI.getPageProxy().getActionBinding();
        var formCellContainer = "";
        let attachmentCtrlValue = "";
        let signatureCtrlValue = "";

        if(!_Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].isDefined(currentObject)){
            currentObject = clientAPI.binding;
             formCellContainer = clientAPI.getControl('FormCellContainer');
             attachmentCtrlValue = formCellContainer.getControl('Attachment').getValue();
             signatureCtrlValue = formCellContainer.getControl('SignatureCaptureFormCell').getValue();
             if(_Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].isDefined(attachmentCtrlValue)){
              let base64EncodedAttachment = _Library_Base64Library__WEBPACK_IMPORTED_MODULE_1__["default"].transformBinaryToBase64((0,_Library_IsAndroid__WEBPACK_IMPORTED_MODULE_2__["default"])(clientAPI),attachmentCtrlValue[0].content);
                clientAPI.getClientData().attachment = base64EncodedAttachment;
             }else{
                clientAPI.getClientData().attachment = '';
             }
             if(_Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].isDefined(signatureCtrlValue)){
              let base64EncodedSignature = _Library_Base64Library__WEBPACK_IMPORTED_MODULE_1__["default"].transformBinaryToBase64((0,_Library_IsAndroid__WEBPACK_IMPORTED_MODULE_2__["default"])(clientAPI),signatureCtrlValue.content);
                clientAPI.getClientData().signature = base64EncodedSignature;
             }else{
                clientAPI.getClientData().signature = '';
             }
        }
            clientAPI.getClientData().altKey = currentObject.altKey,
            clientAPI.getClientData().locationAltKey = currentObject.locationAltKey,
            clientAPI.getClientData().eventName = "POD",
            clientAPI.getClientData().eventTime = new Date().toJSON();
            clientAPI.getClientData().stopId = currentObject.stopId;
            clientAPI.getClientData().timeZone = currentObject.timeZone;
            clientAPI.getClientData().ordinalNo= currentObject.ordinalNo;

            _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].setStateVariable(clientAPI, 'ShipmentStatusUpdate', clientAPI.getClientData());
            clientAPI.showActivityIndicator("Posting Status");
        return clientAPI.executeAction("/FrieghtAppDetail/Actions/Shipment/ShipmentStatusUpdateRest.action").then(function (response) {
            if (response.data) {
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateSuccessMessage.action").then(function () {
                    return clientAPI.executeAction("/FrieghtAppDetail/Actions/ClosePage.action");
                });

            }
            else {
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action").then(function () {
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/ClosePage.action");
                });
            }


        }).catch((failure)=>{
            console.log('AttachmentUpload', failure);
            clientAPI.dismissActivityIndicator();
            return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action");
        });

    } catch (error) {
        return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action").then(function () {
            return clientAPI.executeAction("/FrieghtAppDetail/Actions/ClosePage.action");
            });
    }
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/ProofOfDeliveryUpdateAttachment.js":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/ProofOfDeliveryUpdateAttachment.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProofOfDeliveryUpdateAttachment)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");




/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function ProofOfDeliveryUpdateAttachment(clientAPI) {

    try {
        let attachment = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getStateVariable(clientAPI, 'ShipmentStatusUpdate').attachment;
        return attachment;

    } catch (error) {
        return '';
    }



}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/ProofOfDeliveryUpdateSignature.js":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/ProofOfDeliveryUpdateSignature.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProofOfDeliveryUpdateSignature)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");




/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function ProofOfDeliveryUpdateSignature(clientAPI) {

    try {
        let signature = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getStateVariable(clientAPI, 'ShipmentStatusUpdate').signature;
        return signature;

    } catch (error) {
        return '';
    }



}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/TriggerProofOfDelivery.js":
/*!********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/TriggerProofOfDelivery.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TriggerProofOfDelivery)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");


/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function TriggerProofOfDelivery(clientAPI) {

    return clientAPI.executeAction('/FrieghtAppDetail/Actions/ProofOfDelivery/PoolOfDeliveryDialogMessage.action').then(function (result) {
        if (result.data === true) {
            _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].setStateVariable(clientAPI, 'ShowEmailIDField', true);
            return clientAPI.executeAction("/FrieghtAppDetail/Actions/ProofOfDelivery/NavToProofOfDeliveryMaterialList.action");
        } else {
            _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].setStateVariable(clientAPI, 'ShowEmailIDField', false);
            return clientAPI.executeAction("/FrieghtAppDetail/Actions/ProofOfDelivery/ProofDeliveryCaptureSignature.action");
        }
    });
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Route/ShowShipmentRoute.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Route/ShowShipmentRoute.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowShipmentRoute)
/* harmony export */ });
/* harmony import */ var _Constant_ShipmentConstant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constant/ShipmentConstant */ "./build.definitions/FrieghtAppDetail/Rules/Constant/ShipmentConstant.js");
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/


function ShowShipmentRoute(clientAPI) {
    const utilsModule = clientAPI.nativescript.utilsModule;
    let origin = '';
    let destination = '';
    let wayPoints = '';
    let shipmentObject = _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_1__["default"].getStringArray(clientAPI, 'ShipmentObjectArray');
    if (shipmentObject.length > 1) {
        let shipmentLength = shipmentObject.length;
        let getSortedShipmentObj = sortShipment(shipmentObject);
        origin = _Constant_ShipmentConstant__WEBPACK_IMPORTED_MODULE_0__["default"].origin + calculateDestination(getSortedShipmentObj[0]);
        destination = _Constant_ShipmentConstant__WEBPACK_IMPORTED_MODULE_0__["default"].destination + calculateDestination(getSortedShipmentObj[shipmentLength - 1]);
        wayPoints = _Constant_ShipmentConstant__WEBPACK_IMPORTED_MODULE_0__["default"].wayPoint + calculateWayPoints(getSortedShipmentObj);
        let url = _Constant_ShipmentConstant__WEBPACK_IMPORTED_MODULE_0__["default"].mapBaseUrl + origin + wayPoints + destination + _Constant_ShipmentConstant__WEBPACK_IMPORTED_MODULE_0__["default"].getTravelMode;
        return utilsModule.openUrl(url);
    }
}

function sortShipment(shipArrObj) {
    return shipArrObj.sort((a, b) => a.ordinalNo - b.ordinalNo);
}
function calculateDestination(shipment) {
    return shipment.latitude + ',' + shipment.longitude;
}
function calculateWayPoints(shipment) {
    let wayPtsArr = [];
    for (let i = 1; i < shipment.length - 1; i++) {
        wayPtsArr.push(shipment[i].latitude + ',' + shipment[i].longitude);
    }
    return wayPtsArr.join('|');
}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/BuildShipmentPath.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/BuildShipmentPath.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BuildShipmentPath)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");


/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function BuildShipmentPath(clientAPI) {
    let queryPath = "";
    let shipmentNum =  _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].getString(clientAPI, 'shipmentNumber');
    if (shipmentNum) {
        queryPath = `/trackingDetails?$filter=shipmentNo eq '${shipmentNum}'`;
    }
    return queryPath;
}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/GetShipmentObject.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/GetShipmentObject.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetShipmentObject)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");



/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function GetShipmentObject(clientAPI) {
    let page = clientAPI.evaluateTargetPath('#Page:' + 'ShipmentListView');
    //let shipmentObject = page.context.clientData.ShipmentObject;
   
    //ApplicationSettings.setString(clientAPI, 'ShipmentObjectArray', result.data._array);
    let shipmentObject = _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].getStringArray(clientAPI, 'ShipmentObjectArray');
    return shipmentObject;
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/GetStopID.js":
/*!************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/GetStopID.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetStopID)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");


/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function GetStopID(clientAPI) {

    try {
        let stopID = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].getStateVariable(clientAPI, 'ShipmentStatusUpdate').stopId;
        return stopID;
    
      } catch (error) {
        return '';
      }
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/GetTimeZone.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/GetTimeZone.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetTimeZone)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");


/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function GetTimeZone(clientAPI) {

    try {
        let timeZone = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].getStateVariable(clientAPI, 'ShipmentStatusUpdate').timeZone;
        return timeZone;
    
      } catch (error) {
        return '';
      }
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/NavToShipmentDetails.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/NavToShipmentDetails.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IsValidResponse: () => (/* binding */ IsValidResponse),
/* harmony export */   "default": () => (/* binding */ NavToShipmentDetails)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Library/Logger */ "./build.definitions/FrieghtAppDetail/Rules/Library/Logger.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */




function NavToShipmentDetails(clientAPI) {

    try {
        //Store the user entered shipment number
        let shipmentNum = clientAPI.evaluateTargetPathForAPI('#Control:ShipmentNumber').getValue();
        //If user has entered/scanned the shipment number then fetch the shipment detail
        if (_Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].isDefined(shipmentNum)) {
            _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].setString(clientAPI, 'shipmentNumber', shipmentNum);
            clientAPI.showActivityIndicator("Loading");
            return clientAPI.executeAction("/FrieghtAppDetail/Actions/Shipment/StoreFetchedShipmentDetail.action").then((result) => {
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UnplannedEvent/StoreFetchedUnplannedEventReasonCode.action").then((reasonCode) => {
                    return clientAPI.executeAction("/FrieghtAppDetail/Actions/UnplannedEvent/StoreFetchedUnplannedEventCode.action").then((unplannedEventResult) => {
                        if (result.data._array.length > 0 && IsValidResponse(clientAPI, result.data._array)) {
                            _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].setStringArray(clientAPI, 'ShipmentObjectArray', result.data._array);
                            _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].setStateVariable(clientAPI, 'ShipmentObject', result.data._array);
                            //Store Uplanned event Reason code 
                            _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].setStringArray(clientAPI, 'ReasonCodeArray', reasonCode.data._array);
                            _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].setStringArray(clientAPI, 'UnplannedEventArray', unplannedEventResult.data._array);
                            clientAPI.dismissActivityIndicator();


                            return clientAPI.executeAction('/FrieghtAppDetail/Actions/CloseModalPage_Complete.action');

                        }
                        //Shipment is Not Valid
                        else {
                            clientAPI.dismissActivityIndicator();

                            return clientAPI.executeAction('/FrieghtAppDetail/Actions/CloseModalPage_Complete.action').then(function () {
                                _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].setStringArray(clientAPI, 'ShipmentObjectArray', []);
                            });
                        }
                    }, () => {
                        clientAPI.dismissActivityIndicator();
                    });
                });
            });
        }
        //Show error dialog
    }

    catch (error) {
        clientAPI.dismissActivityIndicator();
        _Library_Logger__WEBPACK_IMPORTED_MODULE_2__["default"].error('Failed to fetch Shipment', error);

    }
}

function IsValidResponse(clientAPI, response) {
    try {
        return (!_Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_3__["default"].evalIsEmpty(response[0])) && Object.keys(response[0]).length > 0 ? true : false;
    } catch (error) {
        return false;

    }

}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewArrivalButtonVisible.js":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewArrivalButtonVisible.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShipmentListViewArrivalButtonVisible)
/* harmony export */ });
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function ShipmentListViewArrivalButtonVisible(clientAPI) {

    //Do not Show Arrival Button for first stop
    try {
        return clientAPI.binding.isArrived === 'X' || clientAPI.binding.isDeparted === 'X' || clientAPI.binding.isDelivered === 'X' || clientAPI.binding.ordinalNo === 1?
            false : true;


    } catch (error) {

        return true;

    }

}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewCaption.js":
/*!**************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewCaption.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BuildShipmentPath)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");



/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function BuildShipmentPath(clientAPI) {

    try {

        let shipmentNum = _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].getString(clientAPI, 'shipmentNumber');

        if (_Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].evalIsEmpty(shipmentNum)) {
            return '';
        }
        else {
            return `Shipment Details (${shipmentNum})`;
        }

    } catch (error) {

    }

    return '';

}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewDepartureButtonVisible.js":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewDepartureButtonVisible.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShipmentListViewDepartureButtonVisible)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");


/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function ShipmentListViewDepartureButtonVisible(clientAPI) {

    let ShipmentObjectArrayLenght = _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].getStringArray(clientAPI, 'ShipmentObjectArray').length;

    try {

        return clientAPI.binding.isDeparted === 'X' ||

            //Departure should not be visible for last Object
            (clientAPI.binding.ordinalNo === ShipmentObjectArrayLenght) ?
            false : true;
    }

    catch (error) {

        return true;

    }

}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewIcon.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewIcon.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShipmentListViewIcon)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");


/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function ShipmentListViewIcon(clientAPI) {
    try {

        let ShipmentObjectArrayLenght = _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].getStringArray(clientAPI, 'ShipmentObjectArray').length;

        if (clientAPI.binding.isDeparted === 'X' ||
            // For last object POD is the last action
            ((clientAPI.binding.ordinalNo === ShipmentObjectArrayLenght) && clientAPI.binding.isDelivered)) {
            return '/FrieghtAppDetail/Images/greentruck.png';
        }
        else if (clientAPI.binding.active === "X") {
            return '/FrieghtAppDetail/Images/orangetruck.png';
        }
        else {
            return '/FrieghtAppDetail/Images/TruckNormal.png';
        }


    } catch (error) {

        return '/FrieghtAppDetail/Images/TruckNormal.png';

    }

}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewOnReturning.js":
/*!******************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewOnReturning.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShipmentListViewOnReturning)
/* harmony export */ });
/* harmony import */ var _AutoSync_AutoSyncLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AutoSync/AutoSyncLibrary */ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncLibrary.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");





function ShipmentListViewOnReturning(clientAPI) {
    _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].refreshPage(clientAPI);

}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewPODButtonVisible.js":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewPODButtonVisible.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShipmentListViewPODButtonVisible)
/* harmony export */ });
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function ShipmentListViewPODButtonVisible(clientAPI) {

     //Do not Show POD Button for first stop
     try {

        return  clientAPI.binding.isDeparted === 'X' || clientAPI.binding.isDelivered === 'X' || clientAPI.binding.ordinalNo === 1?
            false : true;


    } catch (error) {

        return true;

    }


}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewStyle.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewStyle.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShipmentListViewSubhead)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");


/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function ShipmentListViewSubhead(clientAPI) {
    try {

        let ShipmentObjectArrayLenght = _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].getStringArray(clientAPI, 'ShipmentObjectArray').length;
        if (clientAPI.binding.isDeparted === 'X'  ||

            // For last object POD is the last action
            ((clientAPI.binding.ordinalNo === ShipmentObjectArrayLenght) && clientAPI.binding.isDelivered)) {
            return 'ZCardTittleGreen';
        }
        else if (clientAPI.binding.active === "X") {
            return 'ZCardTittleOrange';
        }
        else {
            return 'ZCardTittleBlack';
        }

    } catch (error) {

        return 'ZCardTittleBlack';

    }

}




/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewSubhead.js":
/*!**************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewSubhead.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShipmentListViewSubhead)
/* harmony export */ });
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function ShipmentListViewSubhead(clientAPI) {

    try {

        return clientAPI.binding.ordinalNo === 1 ?
            "Planned Departure At: " + clientAPI.binding.plannedDepTime : "Planned Arrival At: " + clientAPI.binding.plannedDepTime;


    } catch (error) {

        return "Planned Departure At: " + clientAPI.binding.plannedDepTime;

    }

}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateAltKey.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateAltKey.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShipmentStatusUpdateAltKey)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");




/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function ShipmentStatusUpdateAltKey(clientAPI) {

    try {
        let altKey = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getStateVariable(clientAPI, 'ShipmentStatusUpdate').altKey;
        return altKey;

    } catch (error) {
        return '';
    }



}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateEventName.js":
/*!********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateEventName.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShipmentStatusUpdateEventName)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");




/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function ShipmentStatusUpdateEventName(clientAPI) {

    try {
        let eventName = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getStateVariable(clientAPI, 'ShipmentStatusUpdate').eventName;
        return eventName;

    } catch (error) {
        return '';
    }



}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateEventTime.js":
/*!********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateEventTime.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShipmentStatusUpdateEventName)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");




/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function ShipmentStatusUpdateEventName(clientAPI) {

    try {
       let eventTime = new Date().toJSON();
       return eventTime;

    } catch (error) {
        return '';
    }



}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdatelocationAltKey.js":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdatelocationAltKey.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShipmentStatusUpdateAltKey)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_ValidationLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Library/ValidationLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js");




/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function ShipmentStatusUpdateAltKey(clientAPI) { 

  try {
    let locationAltKey = _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__["default"].getStateVariable(clientAPI, 'ShipmentStatusUpdate').locationAltKey;
    return locationAltKey;

  } catch (error) {
    return '';
  }



}



/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/Shipment/StoreFetchedShipmentDetail.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/Shipment/StoreFetchedShipmentDetail.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StoreFetchedShipmentDetail)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

function StoreFetchedShipmentDetail(clientAPI) {
    //Store the user entered shipment number
    let shipmentNum = clientAPI.evaluateTargetPathForAPI('#Control:ShipmentNumber').getValue();
    if (_Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].isDefined(shipmentNum)) {
        _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].setStateVariable(clientAPI, 'shipmentNumber', shipmentNum);
        clientAPI.showActivityIndicator("Loading");
        return clientAPI.executeAction("/FrieghtAppDetail/Actions/Shipment/StoreFetchedShipmentDetail.action").then((result) => {
            if (result.data._array.length>0) {
                _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].setStateVariable(clientAPI, 'ShipmentObject', result.data._array);
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction('/FrieghtAppDetail/Actions/Shipment/NavToShipmentList.action');
            }
            clientAPI.dismissActivityIndicator();
        },()=>{
            clientAPI.dismissActivityIndicator();
        });
    }
    //Show error dialog
}


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/UnplannedEvent/PostUnplannedEvent.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/UnplannedEvent/PostUnplannedEvent.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostUnplannedEvent)
/* harmony export */ });
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/



function PostUnplannedEvent(clientAPI) {

    try {

        let shipmentArray = _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_1__["default"].getStringArray(clientAPI, 'ShipmentObjectArray');

        let firstShipmentObj = shipmentArray[0];
        clientAPI.getClientData().altKey = firstShipmentObj.altKey;
        clientAPI.getClientData().eventName = clientAPI.evaluateTargetPath('#Control:EventPkr/#SelectedValue');
        clientAPI.getClientData().reasonCode = clientAPI.evaluateTargetPath('#Control:ReasonCodePkr/#SelectedValue');
        clientAPI.getClientData().locationAltKey = '';
        clientAPI.getClientData().eventTime = '';
        clientAPI.getClientData().stopId = '';
        clientAPI.getClientData().timeZone = '';

        _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_0__["default"].setStateVariable(clientAPI, 'ShipmentStatusUpdate', clientAPI.getClientData());

        clientAPI.showActivityIndicator("Posting Status");

        return clientAPI.executeAction("/FrieghtAppDetail/Actions/Shipment/ShipmentStatusUpdateRest.action").then(function (response) {
            if (response.data) {
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateSuccessMessage.action").then(() => {
                    return clientAPI.executeAction("/FrieghtAppDetail/Actions/ClosePage.action");
                })

            }
            else {
                clientAPI.dismissActivityIndicator();
                return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action")
            }


        });

    } catch (error) {
        clientAPI.dismissActivityIndicator();
        return clientAPI.executeAction("/FrieghtAppDetail/Actions/UpdateFailed.action")
    }


}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventCodeListPicker.js":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventCodeListPicker.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UnplannedEventReasonCodeListPicker)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");



/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function UnplannedEventReasonCodeListPicker(clientAPI) {
    var jsonResult = [];
    let reasonCode = _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].getStringArray(clientAPI, 'UnplannedEventArray');
    reasonCode.map(item =>
        jsonResult.push(
            {
                'DisplayValue': `${item.eventName}`,
                'ReturnValue': `${item.eventCode}`
            })
    );
    return jsonResult;
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventListPickerList.js":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventListPickerList.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UnplannedEventListPickerList)
/* harmony export */ });
/* harmony import */ var _Constant_UnPlannedEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constant/UnPlannedEvent */ "./build.definitions/FrieghtAppDetail/Rules/Constant/UnPlannedEvent.js");
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/


function UnplannedEventListPickerList(clientAPI) {
    var jsonResult = [{
        'DisplayValue': `${_Constant_UnPlannedEvent__WEBPACK_IMPORTED_MODULE_0__["default"].LocationUpdate}`,
        'ReturnValue': `${_Constant_UnPlannedEvent__WEBPACK_IMPORTED_MODULE_0__["default"].LocationUpdate}`
    },
    {
        'DisplayValue': `${_Constant_UnPlannedEvent__WEBPACK_IMPORTED_MODULE_0__["default"].Delay}`,
        'ReturnValue': `${_Constant_UnPlannedEvent__WEBPACK_IMPORTED_MODULE_0__["default"].Delay}`
    },
    {
        'DisplayValue': `${_Constant_UnPlannedEvent__WEBPACK_IMPORTED_MODULE_0__["default"].ProofOfDelivery}`,
        'ReturnValue': `${_Constant_UnPlannedEvent__WEBPACK_IMPORTED_MODULE_0__["default"].ProofOfDelivery}`
    },
    {
        'DisplayValue': `${_Constant_UnPlannedEvent__WEBPACK_IMPORTED_MODULE_0__["default"].Handover}`,
        'ReturnValue': `${_Constant_UnPlannedEvent__WEBPACK_IMPORTED_MODULE_0__["default"].Handover}`
    }];
    return jsonResult;
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventReasonCodeListPicker.js":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventReasonCodeListPicker.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UnplannedEventReasonCodeListPicker)
/* harmony export */ });
/* harmony import */ var _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Library/ApplicationSettings */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js");
/* harmony import */ var _Library_CommonLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Library/CommonLibrary */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js");



/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
function UnplannedEventReasonCodeListPicker(clientAPI) {
    var jsonResult = [];
    let page = clientAPI.evaluateTargetPath('#Page:' + 'ShipmentListView');
    let reasonCode = _Library_ApplicationSettings__WEBPACK_IMPORTED_MODULE_0__["default"].getStringArray(clientAPI, 'ReasonCodeArray');
    reasonCode.map(item =>
        jsonResult.push(
            {
                'DisplayValue': `${item.name}`,
                'ReturnValue': `${item.code}`
            })
    );
    return jsonResult;
}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let frieghtappdetail_actions_application_appupdate_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Application/AppUpdate.action */ "./build.definitions/FrieghtAppDetail/Actions/Application/AppUpdate.action")
let frieghtappdetail_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/FrieghtAppDetail/Actions/Application/AppUpdateFailureMessage.action")
let frieghtappdetail_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/FrieghtAppDetail/Actions/Application/AppUpdateProgressBanner.action")
let frieghtappdetail_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/FrieghtAppDetail/Actions/Application/AppUpdateSuccessMessage.action")
let frieghtappdetail_actions_application_logout_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Application/Logout.action */ "./build.definitions/FrieghtAppDetail/Actions/Application/Logout.action")
let frieghtappdetail_actions_application_navtoabout_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Application/NavToAbout.action */ "./build.definitions/FrieghtAppDetail/Actions/Application/NavToAbout.action")
let frieghtappdetail_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Application/NavToActivityLog.action */ "./build.definitions/FrieghtAppDetail/Actions/Application/NavToActivityLog.action")
let frieghtappdetail_actions_application_navtosupport_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Application/NavToSupport.action */ "./build.definitions/FrieghtAppDetail/Actions/Application/NavToSupport.action")
let frieghtappdetail_actions_application_onwillupdate_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Application/OnWillUpdate.action */ "./build.definitions/FrieghtAppDetail/Actions/Application/OnWillUpdate.action")
let frieghtappdetail_actions_application_reset_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Application/Reset.action */ "./build.definitions/FrieghtAppDetail/Actions/Application/Reset.action")
let frieghtappdetail_actions_application_resetmessage_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Application/ResetMessage.action */ "./build.definitions/FrieghtAppDetail/Actions/Application/ResetMessage.action")
let frieghtappdetail_actions_application_usermenupopover_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Application/UserMenuPopover.action */ "./build.definitions/FrieghtAppDetail/Actions/Application/UserMenuPopover.action")
let frieghtappdetail_actions_autosync_autosyncfailuremessage_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/AutoSync/AutoSyncFailureMessage.action */ "./build.definitions/FrieghtAppDetail/Actions/AutoSync/AutoSyncFailureMessage.action")
let frieghtappdetail_actions_autosync_autosyncperiodiccall_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/AutoSync/AutoSyncPeriodicCall.action */ "./build.definitions/FrieghtAppDetail/Actions/AutoSync/AutoSyncPeriodicCall.action")
let frieghtappdetail_actions_autosync_locationcordinatesbannermessage_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/AutoSync/LocationCordinatesBannerMessage.action */ "./build.definitions/FrieghtAppDetail/Actions/AutoSync/LocationCordinatesBannerMessage.action")
let frieghtappdetail_actions_closemodalpage_complete_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/CloseModalPage_Complete.action */ "./build.definitions/FrieghtAppDetail/Actions/CloseModalPage_Complete.action")
let frieghtappdetail_actions_closepage_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/ClosePage.action */ "./build.definitions/FrieghtAppDetail/Actions/ClosePage.action")
let frieghtappdetail_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Logging/LogUploadFailure.action */ "./build.definitions/FrieghtAppDetail/Actions/Logging/LogUploadFailure.action")
let frieghtappdetail_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/FrieghtAppDetail/Actions/Logging/LogUploadSuccessful.action")
let frieghtappdetail_actions_logging_uploadlog_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Logging/UploadLog.action */ "./build.definitions/FrieghtAppDetail/Actions/Logging/UploadLog.action")
let frieghtappdetail_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Logging/UploadLogProgress.action */ "./build.definitions/FrieghtAppDetail/Actions/Logging/UploadLogProgress.action")
let frieghtappdetail_actions_proofofdelivery_materialitemupdaterest_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/ProofOfDelivery/MaterialItemUpdateRest.action */ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/MaterialItemUpdateRest.action")
let frieghtappdetail_actions_proofofdelivery_navtomaterialdetails_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/ProofOfDelivery/NavToMaterialDetails.action */ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/NavToMaterialDetails.action")
let frieghtappdetail_actions_proofofdelivery_navtoproofofdeliverymateriallist_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/ProofOfDelivery/NavToProofOfDeliveryMaterialList.action */ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/NavToProofOfDeliveryMaterialList.action")
let frieghtappdetail_actions_proofofdelivery_navtoproofofdeliverymateriareadonlylist_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/ProofOfDelivery/NavToProofOfDeliveryMateriaReadOnlyList.action */ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/NavToProofOfDeliveryMateriaReadOnlyList.action")
let frieghtappdetail_actions_proofofdelivery_poolofdeliverydialogmessage_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/ProofOfDelivery/PoolOfDeliveryDialogMessage.action */ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/PoolOfDeliveryDialogMessage.action")
let frieghtappdetail_actions_proofofdelivery_proofdeliverycapturesignature_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/ProofOfDelivery/ProofDeliveryCaptureSignature.action */ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/ProofDeliveryCaptureSignature.action")
let frieghtappdetail_actions_proofofdelivery_proofofdeliverymaterialupdate_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/ProofOfDelivery/ProofOfDeliveryMaterialUpdate.action */ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/ProofOfDeliveryMaterialUpdate.action")
let frieghtappdetail_actions_proofofdelivery_storefetchedmaterialitem_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/ProofOfDelivery/StoreFetchedMaterialItem.action */ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/StoreFetchedMaterialItem.action")
let frieghtappdetail_actions_shipment_navtoshipmentdetailsentry_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Shipment/NavToShipmentDetailsEntry.action */ "./build.definitions/FrieghtAppDetail/Actions/Shipment/NavToShipmentDetailsEntry.action")
let frieghtappdetail_actions_shipment_navtoshipmentlist_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Shipment/NavToShipmentList.action */ "./build.definitions/FrieghtAppDetail/Actions/Shipment/NavToShipmentList.action")
let frieghtappdetail_actions_shipment_shipmentisnotvalidmessage_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Shipment/ShipmentIsNotValidMessage.action */ "./build.definitions/FrieghtAppDetail/Actions/Shipment/ShipmentIsNotValidMessage.action")
let frieghtappdetail_actions_shipment_shipmentstatusupdaterest_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Shipment/ShipmentStatusUpdateRest.action */ "./build.definitions/FrieghtAppDetail/Actions/Shipment/ShipmentStatusUpdateRest.action")
let frieghtappdetail_actions_shipment_storefetchedshipmentdetail_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/Shipment/StoreFetchedShipmentDetail.action */ "./build.definitions/FrieghtAppDetail/Actions/Shipment/StoreFetchedShipmentDetail.action")
let frieghtappdetail_actions_unplannedevent_reportunplannedevent_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/UnplannedEvent/ReportUnPlannedEvent.action */ "./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/ReportUnPlannedEvent.action")
let frieghtappdetail_actions_unplannedevent_storefetchedunplannedeventcode_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/UnplannedEvent/StoreFetchedUnplannedEventCode.action */ "./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/StoreFetchedUnplannedEventCode.action")
let frieghtappdetail_actions_unplannedevent_storefetchedunplannedeventreasoncode_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/UnplannedEvent/StoreFetchedUnplannedEventReasonCode.action */ "./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/StoreFetchedUnplannedEventReasonCode.action")
let frieghtappdetail_actions_unplannedevent_unplannedeventcreaterequired_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventCreateRequired.action */ "./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventCreateRequired.action")
let frieghtappdetail_actions_unplannedevent_unplannedeventrequiredfieldfailure_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventRequiredFieldFailure.action */ "./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventRequiredFieldFailure.action")
let frieghtappdetail_actions_unplannedevent_unplannedeventupdaterest_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventUpdateRest.action */ "./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventUpdateRest.action")
let frieghtappdetail_actions_updatefailed_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/UpdateFailed.action */ "./build.definitions/FrieghtAppDetail/Actions/UpdateFailed.action")
let frieghtappdetail_actions_updatesuccessmessage_action = __webpack_require__(/*! ./FrieghtAppDetail/Actions/UpdateSuccessMessage.action */ "./build.definitions/FrieghtAppDetail/Actions/UpdateSuccessMessage.action")
let frieghtappdetail_fragments_documents_documentformcell_fragment = __webpack_require__(/*! ./FrieghtAppDetail/Fragments/Documents/DocumentFormCell.fragment */ "./build.definitions/FrieghtAppDetail/Fragments/Documents/DocumentFormCell.fragment")
let frieghtappdetail_globals_application_appdefinition_version_global = __webpack_require__(/*! ./FrieghtAppDetail/Globals/Application/AppDefinition_Version.global */ "./build.definitions/FrieghtAppDetail/Globals/Application/AppDefinition_Version.global")
let frieghtappdetail_globals_application_applicationname_global = __webpack_require__(/*! ./FrieghtAppDetail/Globals/Application/ApplicationName.global */ "./build.definitions/FrieghtAppDetail/Globals/Application/ApplicationName.global")
let frieghtappdetail_globals_application_supportemail_global = __webpack_require__(/*! ./FrieghtAppDetail/Globals/Application/SupportEmail.global */ "./build.definitions/FrieghtAppDetail/Globals/Application/SupportEmail.global")
let frieghtappdetail_globals_application_supportphone_global = __webpack_require__(/*! ./FrieghtAppDetail/Globals/Application/SupportPhone.global */ "./build.definitions/FrieghtAppDetail/Globals/Application/SupportPhone.global")
let frieghtappdetail_i18n_i18n_properties = __webpack_require__(/*! ./FrieghtAppDetail/i18n/i18n.properties */ "./build.definitions/FrieghtAppDetail/i18n/i18n.properties")
let frieghtappdetail_images_greenmarker_png = __webpack_require__(/*! ./FrieghtAppDetail/Images/GreenMarker.png */ "./build.definitions/FrieghtAppDetail/Images/GreenMarker.png")
let frieghtappdetail_images_greentruck_png = __webpack_require__(/*! ./FrieghtAppDetail/Images/greentruck.png */ "./build.definitions/FrieghtAppDetail/Images/greentruck.png")
let frieghtappdetail_images_orangemarker_png = __webpack_require__(/*! ./FrieghtAppDetail/Images/OrangeMarker.png */ "./build.definitions/FrieghtAppDetail/Images/OrangeMarker.png")
let frieghtappdetail_images_orangetruck_png = __webpack_require__(/*! ./FrieghtAppDetail/Images/orangetruck.png */ "./build.definitions/FrieghtAppDetail/Images/orangetruck.png")
let frieghtappdetail_images_redmarker_png = __webpack_require__(/*! ./FrieghtAppDetail/Images/RedMarker.png */ "./build.definitions/FrieghtAppDetail/Images/RedMarker.png")
let frieghtappdetail_images_trucknormal_png = __webpack_require__(/*! ./FrieghtAppDetail/Images/TruckNormal.png */ "./build.definitions/FrieghtAppDetail/Images/TruckNormal.png")
let frieghtappdetail_jsconfig_json = __webpack_require__(/*! ./FrieghtAppDetail/jsconfig.json */ "./build.definitions/FrieghtAppDetail/jsconfig.json")
let frieghtappdetail_package__lock_json = __webpack_require__(/*! ./FrieghtAppDetail/package-lock.json */ "./build.definitions/FrieghtAppDetail/package-lock.json")
let frieghtappdetail_pages_application_about_page = __webpack_require__(/*! ./FrieghtAppDetail/Pages/Application/About.page */ "./build.definitions/FrieghtAppDetail/Pages/Application/About.page")
let frieghtappdetail_pages_application_support_page = __webpack_require__(/*! ./FrieghtAppDetail/Pages/Application/Support.page */ "./build.definitions/FrieghtAppDetail/Pages/Application/Support.page")
let frieghtappdetail_pages_application_useractivitylog_page = __webpack_require__(/*! ./FrieghtAppDetail/Pages/Application/UserActivityLog.page */ "./build.definitions/FrieghtAppDetail/Pages/Application/UserActivityLog.page")
let frieghtappdetail_pages_main_page = __webpack_require__(/*! ./FrieghtAppDetail/Pages/Main.page */ "./build.definitions/FrieghtAppDetail/Pages/Main.page")
let frieghtappdetail_pages_proofofdelivery_proofdeliverycapturesignature_page = __webpack_require__(/*! ./FrieghtAppDetail/Pages/ProofOfDelivery/ProofDeliveryCaptureSignature.page */ "./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofDeliveryCaptureSignature.page")
let frieghtappdetail_pages_proofofdelivery_proofofdeliverymaterialcreateupdate_page = __webpack_require__(/*! ./FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialCreateUpdate.page */ "./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialCreateUpdate.page")
let frieghtappdetail_pages_proofofdelivery_proofofdeliverymaterialdetails_page = __webpack_require__(/*! ./FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialDetails.page */ "./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialDetails.page")
let frieghtappdetail_pages_proofofdelivery_proofofdeliverymateriallist_page = __webpack_require__(/*! ./FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialList.page */ "./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialList.page")
let frieghtappdetail_pages_proofofdelivery_proofofdeliverymaterialreadonlylist_page = __webpack_require__(/*! ./FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialReadOnlyList.page */ "./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialReadOnlyList.page")
let frieghtappdetail_pages_shipment_fetchshipmentdetails_page = __webpack_require__(/*! ./FrieghtAppDetail/Pages/Shipment/FetchShipmentDetails.page */ "./build.definitions/FrieghtAppDetail/Pages/Shipment/FetchShipmentDetails.page")
let frieghtappdetail_pages_shipment_shipmentlistview_page = __webpack_require__(/*! ./FrieghtAppDetail/Pages/Shipment/ShipmentListView.page */ "./build.definitions/FrieghtAppDetail/Pages/Shipment/ShipmentListView.page")
let frieghtappdetail_pages_unplannedevent_reportunplannedevent_page = __webpack_require__(/*! ./FrieghtAppDetail/Pages/UnplannedEvent/ReportUnPlannedEvent.page */ "./build.definitions/FrieghtAppDetail/Pages/UnplannedEvent/ReportUnPlannedEvent.page")
let frieghtappdetail_rules_application_appupdatefailure_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Application/AppUpdateFailure.js */ "./build.definitions/FrieghtAppDetail/Rules/Application/AppUpdateFailure.js")
let frieghtappdetail_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/FrieghtAppDetail/Rules/Application/AppUpdateSuccess.js")
let frieghtappdetail_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/FrieghtAppDetail/Rules/Application/ClientIsMultiUserMode.js")
let frieghtappdetail_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/FrieghtAppDetail/Rules/Application/GetClientSupportVersions.js")
let frieghtappdetail_rules_application_getclientversion_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Application/GetClientVersion.js */ "./build.definitions/FrieghtAppDetail/Rules/Application/GetClientVersion.js")
let frieghtappdetail_rules_application_initializeautosync_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Application/InitializeAutoSync.js */ "./build.definitions/FrieghtAppDetail/Rules/Application/InitializeAutoSync.js")
let frieghtappdetail_rules_application_onwillupdate_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Application/OnWillUpdate.js */ "./build.definitions/FrieghtAppDetail/Rules/Application/OnWillUpdate.js")
let frieghtappdetail_rules_application_refreshpage_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Application/RefreshPage.js */ "./build.definitions/FrieghtAppDetail/Rules/Application/RefreshPage.js")
let frieghtappdetail_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/FrieghtAppDetail/Rules/Application/ResetAppSettingsAndLogout.js")
let frieghtappdetail_rules_autosync_autosynclibrary_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/AutoSync/AutoSyncLibrary.js */ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncLibrary.js")
let frieghtappdetail_rules_autosync_autosynconresume_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/AutoSync/AutoSyncOnResume.js */ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncOnResume.js")
let frieghtappdetail_rules_autosync_autosynconsave_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/AutoSync/AutoSyncOnSave.js */ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/AutoSyncOnSave.js")
let frieghtappdetail_rules_autosync_executeactionwithautosync_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/AutoSync/ExecuteActionWithAutoSync.js */ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/ExecuteActionWithAutoSync.js")
let frieghtappdetail_rules_autosync_networkmonitoringlibrary_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/AutoSync/NetworkMonitoringLibrary.js */ "./build.definitions/FrieghtAppDetail/Rules/AutoSync/NetworkMonitoringLibrary.js")
let frieghtappdetail_rules_constant_autosyncconstant_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Constant/AutoSyncConstant.js */ "./build.definitions/FrieghtAppDetail/Rules/Constant/AutoSyncConstant.js")
let frieghtappdetail_rules_constant_shipmentconstant_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Constant/ShipmentConstant.js */ "./build.definitions/FrieghtAppDetail/Rules/Constant/ShipmentConstant.js")
let frieghtappdetail_rules_constant_unplannedevent_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Constant/UnPlannedEvent.js */ "./build.definitions/FrieghtAppDetail/Rules/Constant/UnPlannedEvent.js")
let frieghtappdetail_rules_departure_postshipmentarrival_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Departure/PostShipmentArrival.js */ "./build.definitions/FrieghtAppDetail/Rules/Departure/PostShipmentArrival.js")
let frieghtappdetail_rules_departure_postshipmentdeparture_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Departure/PostShipmentDeparture.js */ "./build.definitions/FrieghtAppDetail/Rules/Departure/PostShipmentDeparture.js")
let frieghtappdetail_rules_library_applicationsettings_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Library/ApplicationSettings.js */ "./build.definitions/FrieghtAppDetail/Rules/Library/ApplicationSettings.js")
let frieghtappdetail_rules_library_base64library_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Library/Base64Library.js */ "./build.definitions/FrieghtAppDetail/Rules/Library/Base64Library.js")
let frieghtappdetail_rules_library_commonlibrary_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Library/CommonLibrary.js */ "./build.definitions/FrieghtAppDetail/Rules/Library/CommonLibrary.js")
let frieghtappdetail_rules_library_currentdatetime_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Library/CurrentDateTime.js */ "./build.definitions/FrieghtAppDetail/Rules/Library/CurrentDateTime.js")
let frieghtappdetail_rules_library_globalcommon_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Library/GlobalCommon.js */ "./build.definitions/FrieghtAppDetail/Rules/Library/GlobalCommon.js")
let frieghtappdetail_rules_library_isandroid_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Library/IsAndroid.js */ "./build.definitions/FrieghtAppDetail/Rules/Library/IsAndroid.js")
let frieghtappdetail_rules_library_localizationlibrary_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Library/LocalizationLibrary.js */ "./build.definitions/FrieghtAppDetail/Rules/Library/LocalizationLibrary.js")
let frieghtappdetail_rules_library_logger_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Library/Logger.js */ "./build.definitions/FrieghtAppDetail/Rules/Library/Logger.js")
let frieghtappdetail_rules_library_nativescriptobject_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Library/NativeScriptObject.js */ "./build.definitions/FrieghtAppDetail/Rules/Library/NativeScriptObject.js")
let frieghtappdetail_rules_library_odatadate_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Library/ODataDate.js */ "./build.definitions/FrieghtAppDetail/Rules/Library/ODataDate.js")
let frieghtappdetail_rules_library_validationlibrary_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Library/ValidationLibrary.js */ "./build.definitions/FrieghtAppDetail/Rules/Library/ValidationLibrary.js")
let frieghtappdetail_rules_location_getcordinates_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Location/GetCordinates.js */ "./build.definitions/FrieghtAppDetail/Rules/Location/GetCordinates.js")
let frieghtappdetail_rules_location_getcurrentlocation_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Location/GetCurrentLocation.js */ "./build.definitions/FrieghtAppDetail/Rules/Location/GetCurrentLocation.js")
let frieghtappdetail_rules_location_getlatitude_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Location/GetLatitude.js */ "./build.definitions/FrieghtAppDetail/Rules/Location/GetLatitude.js")
let frieghtappdetail_rules_location_getlongitude_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Location/GetLongitude.js */ "./build.definitions/FrieghtAppDetail/Rules/Location/GetLongitude.js")
let frieghtappdetail_rules_location_servicemanager_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Location/ServiceManager.js */ "./build.definitions/FrieghtAppDetail/Rules/Location/ServiceManager.js")
let frieghtappdetail_rules_location_showlocationvalues_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Location/ShowLocationValues.js */ "./build.definitions/FrieghtAppDetail/Rules/Location/ShowLocationValues.js")
let frieghtappdetail_rules_logging_loglevels_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Logging/LogLevels.js */ "./build.definitions/FrieghtAppDetail/Rules/Logging/LogLevels.js")
let frieghtappdetail_rules_logging_materialfetchonsuccessfulupdate_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Logging/MaterialFetchOnSuccessfulUpdate.js */ "./build.definitions/FrieghtAppDetail/Rules/Logging/MaterialFetchOnSuccessfulUpdate.js")
let frieghtappdetail_rules_logging_settracecategories_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Logging/SetTraceCategories.js */ "./build.definitions/FrieghtAppDetail/Rules/Logging/SetTraceCategories.js")
let frieghtappdetail_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/FrieghtAppDetail/Rules/Logging/SetUserLogLevel.js")
let frieghtappdetail_rules_logging_togglelogging_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Logging/ToggleLogging.js */ "./build.definitions/FrieghtAppDetail/Rules/Logging/ToggleLogging.js")
let frieghtappdetail_rules_logging_tracecategories_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Logging/TraceCategories.js */ "./build.definitions/FrieghtAppDetail/Rules/Logging/TraceCategories.js")
let frieghtappdetail_rules_logging_userlogsetting_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Logging/UserLogSetting.js */ "./build.definitions/FrieghtAppDetail/Rules/Logging/UserLogSetting.js")
let frieghtappdetail_rules_proofofdelivery_buildmaterialitempath_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/BuildMaterialItemPath.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/BuildMaterialItemPath.js")
let frieghtappdetail_rules_proofofdelivery_fetchmaterialitem_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/FetchMaterialItem.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/FetchMaterialItem.js")
let frieghtappdetail_rules_proofofdelivery_fetchmaterialitemwrapper_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/FetchMaterialItemWrapper.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/FetchMaterialItemWrapper.js")
let frieghtappdetail_rules_proofofdelivery_formatdisplayquantity_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/FormatDisplayQuantity.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/FormatDisplayQuantity.js")
let frieghtappdetail_rules_proofofdelivery_formatrecievedquantity_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/FormatRecievedQuantity.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/FormatRecievedQuantity.js")
let frieghtappdetail_rules_proofofdelivery_getlocationidformaterialupdate_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/GetLocationIDForMaterialUpdate.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/GetLocationIDForMaterialUpdate.js")
let frieghtappdetail_rules_proofofdelivery_getproofofdeliveryitems_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/GetProofOfDeliveryItems.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/GetProofOfDeliveryItems.js")
let frieghtappdetail_rules_proofofdelivery_getshipmentnumformaterialupdate_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/GetShipmentNumForMaterialUpdate.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/GetShipmentNumForMaterialUpdate.js")
let frieghtappdetail_rules_proofofdelivery_isemailsectionvisible_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/IsEmailSectionVisible.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/IsEmailSectionVisible.js")
let frieghtappdetail_rules_proofofdelivery_materialdescriptionstyle_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/MaterialDescriptionStyle.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/MaterialDescriptionStyle.js")
let frieghtappdetail_rules_proofofdelivery_postproofofdelivery_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/PostProofOfDelivery.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/PostProofOfDelivery.js")
let frieghtappdetail_rules_proofofdelivery_proofofdeliveryupdateattachment_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/ProofOfDeliveryUpdateAttachment.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/ProofOfDeliveryUpdateAttachment.js")
let frieghtappdetail_rules_proofofdelivery_proofofdeliveryupdatesignature_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/ProofOfDeliveryUpdateSignature.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/ProofOfDeliveryUpdateSignature.js")
let frieghtappdetail_rules_proofofdelivery_triggerproofofdelivery_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/ProofOfDelivery/TriggerProofOfDelivery.js */ "./build.definitions/FrieghtAppDetail/Rules/ProofOfDelivery/TriggerProofOfDelivery.js")
let frieghtappdetail_rules_route_showshipmentroute_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Route/ShowShipmentRoute.js */ "./build.definitions/FrieghtAppDetail/Rules/Route/ShowShipmentRoute.js")
let frieghtappdetail_rules_shipment_buildshipmentpath_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/BuildShipmentPath.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/BuildShipmentPath.js")
let frieghtappdetail_rules_shipment_getshipmentobject_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/GetShipmentObject.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/GetShipmentObject.js")
let frieghtappdetail_rules_shipment_getstopid_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/GetStopID.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/GetStopID.js")
let frieghtappdetail_rules_shipment_gettimezone_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/GetTimeZone.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/GetTimeZone.js")
let frieghtappdetail_rules_shipment_navtoshipmentdetails_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/NavToShipmentDetails.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/NavToShipmentDetails.js")
let frieghtappdetail_rules_shipment_shipmentlistviewarrivalbuttonvisible_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/ShipmentListViewArrivalButtonVisible.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewArrivalButtonVisible.js")
let frieghtappdetail_rules_shipment_shipmentlistviewcaption_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/ShipmentListViewCaption.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewCaption.js")
let frieghtappdetail_rules_shipment_shipmentlistviewdeparturebuttonvisible_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/ShipmentListViewDepartureButtonVisible.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewDepartureButtonVisible.js")
let frieghtappdetail_rules_shipment_shipmentlistviewicon_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/ShipmentListViewIcon.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewIcon.js")
let frieghtappdetail_rules_shipment_shipmentlistviewonreturning_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/ShipmentListViewOnReturning.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewOnReturning.js")
let frieghtappdetail_rules_shipment_shipmentlistviewpodbuttonvisible_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/ShipmentListViewPODButtonVisible.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewPODButtonVisible.js")
let frieghtappdetail_rules_shipment_shipmentlistviewstyle_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/ShipmentListViewStyle.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewStyle.js")
let frieghtappdetail_rules_shipment_shipmentlistviewsubhead_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/ShipmentListViewSubhead.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentListViewSubhead.js")
let frieghtappdetail_rules_shipment_shipmentstatusupdatealtkey_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateAltKey.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateAltKey.js")
let frieghtappdetail_rules_shipment_shipmentstatusupdateeventname_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateEventName.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateEventName.js")
let frieghtappdetail_rules_shipment_shipmentstatusupdateeventtime_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateEventTime.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateEventTime.js")
let frieghtappdetail_rules_shipment_shipmentstatusupdatelocationaltkey_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdatelocationAltKey.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdatelocationAltKey.js")
let frieghtappdetail_rules_shipment_storefetchedshipmentdetail_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/Shipment/StoreFetchedShipmentDetail.js */ "./build.definitions/FrieghtAppDetail/Rules/Shipment/StoreFetchedShipmentDetail.js")
let frieghtappdetail_rules_unplannedevent_postunplannedevent_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/UnplannedEvent/PostUnplannedEvent.js */ "./build.definitions/FrieghtAppDetail/Rules/UnplannedEvent/PostUnplannedEvent.js")
let frieghtappdetail_rules_unplannedevent_unplannedeventcodelistpicker_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventCodeListPicker.js */ "./build.definitions/FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventCodeListPicker.js")
let frieghtappdetail_rules_unplannedevent_unplannedeventlistpickerlist_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventListPickerList.js */ "./build.definitions/FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventListPickerList.js")
let frieghtappdetail_rules_unplannedevent_unplannedeventreasoncodelistpicker_js = __webpack_require__(/*! ./FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventReasonCodeListPicker.js */ "./build.definitions/FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventReasonCodeListPicker.js")
let frieghtappdetail_services_frieghtrestsrv_service = __webpack_require__(/*! ./FrieghtAppDetail/Services/FrieghtRestSrv.service */ "./build.definitions/FrieghtAppDetail/Services/FrieghtRestSrv.service")
let frieghtappdetail_styles_styles_css = __webpack_require__(/*! ./FrieghtAppDetail/Styles/Styles.css */ "./build.definitions/FrieghtAppDetail/Styles/Styles.css")
let frieghtappdetail_styles_styles_dark_css = __webpack_require__(/*! ./FrieghtAppDetail/Styles/Styles.dark.css */ "./build.definitions/FrieghtAppDetail/Styles/Styles.dark.css")
let frieghtappdetail_styles_styles_dark_json = __webpack_require__(/*! ./FrieghtAppDetail/Styles/Styles.dark.json */ "./build.definitions/FrieghtAppDetail/Styles/Styles.dark.json")
let frieghtappdetail_styles_styles_dark_less = __webpack_require__(/*! ./FrieghtAppDetail/Styles/Styles.dark.less */ "./build.definitions/FrieghtAppDetail/Styles/Styles.dark.less")
let frieghtappdetail_styles_styles_dark_nss = __webpack_require__(/*! ./FrieghtAppDetail/Styles/Styles.dark.nss */ "./build.definitions/FrieghtAppDetail/Styles/Styles.dark.nss")
let frieghtappdetail_styles_styles_json = __webpack_require__(/*! ./FrieghtAppDetail/Styles/Styles.json */ "./build.definitions/FrieghtAppDetail/Styles/Styles.json")
let frieghtappdetail_styles_styles_less = __webpack_require__(/*! ./FrieghtAppDetail/Styles/Styles.less */ "./build.definitions/FrieghtAppDetail/Styles/Styles.less")
let frieghtappdetail_styles_styles_nss = __webpack_require__(/*! ./FrieghtAppDetail/Styles/Styles.nss */ "./build.definitions/FrieghtAppDetail/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	frieghtappdetail_actions_application_appupdate_action : frieghtappdetail_actions_application_appupdate_action,
	frieghtappdetail_actions_application_appupdatefailuremessage_action : frieghtappdetail_actions_application_appupdatefailuremessage_action,
	frieghtappdetail_actions_application_appupdateprogressbanner_action : frieghtappdetail_actions_application_appupdateprogressbanner_action,
	frieghtappdetail_actions_application_appupdatesuccessmessage_action : frieghtappdetail_actions_application_appupdatesuccessmessage_action,
	frieghtappdetail_actions_application_logout_action : frieghtappdetail_actions_application_logout_action,
	frieghtappdetail_actions_application_navtoabout_action : frieghtappdetail_actions_application_navtoabout_action,
	frieghtappdetail_actions_application_navtoactivitylog_action : frieghtappdetail_actions_application_navtoactivitylog_action,
	frieghtappdetail_actions_application_navtosupport_action : frieghtappdetail_actions_application_navtosupport_action,
	frieghtappdetail_actions_application_onwillupdate_action : frieghtappdetail_actions_application_onwillupdate_action,
	frieghtappdetail_actions_application_reset_action : frieghtappdetail_actions_application_reset_action,
	frieghtappdetail_actions_application_resetmessage_action : frieghtappdetail_actions_application_resetmessage_action,
	frieghtappdetail_actions_application_usermenupopover_action : frieghtappdetail_actions_application_usermenupopover_action,
	frieghtappdetail_actions_autosync_autosyncfailuremessage_action : frieghtappdetail_actions_autosync_autosyncfailuremessage_action,
	frieghtappdetail_actions_autosync_autosyncperiodiccall_action : frieghtappdetail_actions_autosync_autosyncperiodiccall_action,
	frieghtappdetail_actions_autosync_locationcordinatesbannermessage_action : frieghtappdetail_actions_autosync_locationcordinatesbannermessage_action,
	frieghtappdetail_actions_closemodalpage_complete_action : frieghtappdetail_actions_closemodalpage_complete_action,
	frieghtappdetail_actions_closepage_action : frieghtappdetail_actions_closepage_action,
	frieghtappdetail_actions_logging_loguploadfailure_action : frieghtappdetail_actions_logging_loguploadfailure_action,
	frieghtappdetail_actions_logging_loguploadsuccessful_action : frieghtappdetail_actions_logging_loguploadsuccessful_action,
	frieghtappdetail_actions_logging_uploadlog_action : frieghtappdetail_actions_logging_uploadlog_action,
	frieghtappdetail_actions_logging_uploadlogprogress_action : frieghtappdetail_actions_logging_uploadlogprogress_action,
	frieghtappdetail_actions_proofofdelivery_materialitemupdaterest_action : frieghtappdetail_actions_proofofdelivery_materialitemupdaterest_action,
	frieghtappdetail_actions_proofofdelivery_navtomaterialdetails_action : frieghtappdetail_actions_proofofdelivery_navtomaterialdetails_action,
	frieghtappdetail_actions_proofofdelivery_navtoproofofdeliverymateriallist_action : frieghtappdetail_actions_proofofdelivery_navtoproofofdeliverymateriallist_action,
	frieghtappdetail_actions_proofofdelivery_navtoproofofdeliverymateriareadonlylist_action : frieghtappdetail_actions_proofofdelivery_navtoproofofdeliverymateriareadonlylist_action,
	frieghtappdetail_actions_proofofdelivery_poolofdeliverydialogmessage_action : frieghtappdetail_actions_proofofdelivery_poolofdeliverydialogmessage_action,
	frieghtappdetail_actions_proofofdelivery_proofdeliverycapturesignature_action : frieghtappdetail_actions_proofofdelivery_proofdeliverycapturesignature_action,
	frieghtappdetail_actions_proofofdelivery_proofofdeliverymaterialupdate_action : frieghtappdetail_actions_proofofdelivery_proofofdeliverymaterialupdate_action,
	frieghtappdetail_actions_proofofdelivery_storefetchedmaterialitem_action : frieghtappdetail_actions_proofofdelivery_storefetchedmaterialitem_action,
	frieghtappdetail_actions_shipment_navtoshipmentdetailsentry_action : frieghtappdetail_actions_shipment_navtoshipmentdetailsentry_action,
	frieghtappdetail_actions_shipment_navtoshipmentlist_action : frieghtappdetail_actions_shipment_navtoshipmentlist_action,
	frieghtappdetail_actions_shipment_shipmentisnotvalidmessage_action : frieghtappdetail_actions_shipment_shipmentisnotvalidmessage_action,
	frieghtappdetail_actions_shipment_shipmentstatusupdaterest_action : frieghtappdetail_actions_shipment_shipmentstatusupdaterest_action,
	frieghtappdetail_actions_shipment_storefetchedshipmentdetail_action : frieghtappdetail_actions_shipment_storefetchedshipmentdetail_action,
	frieghtappdetail_actions_unplannedevent_reportunplannedevent_action : frieghtappdetail_actions_unplannedevent_reportunplannedevent_action,
	frieghtappdetail_actions_unplannedevent_storefetchedunplannedeventcode_action : frieghtappdetail_actions_unplannedevent_storefetchedunplannedeventcode_action,
	frieghtappdetail_actions_unplannedevent_storefetchedunplannedeventreasoncode_action : frieghtappdetail_actions_unplannedevent_storefetchedunplannedeventreasoncode_action,
	frieghtappdetail_actions_unplannedevent_unplannedeventcreaterequired_action : frieghtappdetail_actions_unplannedevent_unplannedeventcreaterequired_action,
	frieghtappdetail_actions_unplannedevent_unplannedeventrequiredfieldfailure_action : frieghtappdetail_actions_unplannedevent_unplannedeventrequiredfieldfailure_action,
	frieghtappdetail_actions_unplannedevent_unplannedeventupdaterest_action : frieghtappdetail_actions_unplannedevent_unplannedeventupdaterest_action,
	frieghtappdetail_actions_updatefailed_action : frieghtappdetail_actions_updatefailed_action,
	frieghtappdetail_actions_updatesuccessmessage_action : frieghtappdetail_actions_updatesuccessmessage_action,
	frieghtappdetail_fragments_documents_documentformcell_fragment : frieghtappdetail_fragments_documents_documentformcell_fragment,
	frieghtappdetail_globals_application_appdefinition_version_global : frieghtappdetail_globals_application_appdefinition_version_global,
	frieghtappdetail_globals_application_applicationname_global : frieghtappdetail_globals_application_applicationname_global,
	frieghtappdetail_globals_application_supportemail_global : frieghtappdetail_globals_application_supportemail_global,
	frieghtappdetail_globals_application_supportphone_global : frieghtappdetail_globals_application_supportphone_global,
	frieghtappdetail_i18n_i18n_properties : frieghtappdetail_i18n_i18n_properties,
	frieghtappdetail_images_greenmarker_png : frieghtappdetail_images_greenmarker_png,
	frieghtappdetail_images_greentruck_png : frieghtappdetail_images_greentruck_png,
	frieghtappdetail_images_orangemarker_png : frieghtappdetail_images_orangemarker_png,
	frieghtappdetail_images_orangetruck_png : frieghtappdetail_images_orangetruck_png,
	frieghtappdetail_images_redmarker_png : frieghtappdetail_images_redmarker_png,
	frieghtappdetail_images_trucknormal_png : frieghtappdetail_images_trucknormal_png,
	frieghtappdetail_jsconfig_json : frieghtappdetail_jsconfig_json,
	frieghtappdetail_package__lock_json : frieghtappdetail_package__lock_json,
	frieghtappdetail_pages_application_about_page : frieghtappdetail_pages_application_about_page,
	frieghtappdetail_pages_application_support_page : frieghtappdetail_pages_application_support_page,
	frieghtappdetail_pages_application_useractivitylog_page : frieghtappdetail_pages_application_useractivitylog_page,
	frieghtappdetail_pages_main_page : frieghtappdetail_pages_main_page,
	frieghtappdetail_pages_proofofdelivery_proofdeliverycapturesignature_page : frieghtappdetail_pages_proofofdelivery_proofdeliverycapturesignature_page,
	frieghtappdetail_pages_proofofdelivery_proofofdeliverymaterialcreateupdate_page : frieghtappdetail_pages_proofofdelivery_proofofdeliverymaterialcreateupdate_page,
	frieghtappdetail_pages_proofofdelivery_proofofdeliverymaterialdetails_page : frieghtappdetail_pages_proofofdelivery_proofofdeliverymaterialdetails_page,
	frieghtappdetail_pages_proofofdelivery_proofofdeliverymateriallist_page : frieghtappdetail_pages_proofofdelivery_proofofdeliverymateriallist_page,
	frieghtappdetail_pages_proofofdelivery_proofofdeliverymaterialreadonlylist_page : frieghtappdetail_pages_proofofdelivery_proofofdeliverymaterialreadonlylist_page,
	frieghtappdetail_pages_shipment_fetchshipmentdetails_page : frieghtappdetail_pages_shipment_fetchshipmentdetails_page,
	frieghtappdetail_pages_shipment_shipmentlistview_page : frieghtappdetail_pages_shipment_shipmentlistview_page,
	frieghtappdetail_pages_unplannedevent_reportunplannedevent_page : frieghtappdetail_pages_unplannedevent_reportunplannedevent_page,
	frieghtappdetail_rules_application_appupdatefailure_js : frieghtappdetail_rules_application_appupdatefailure_js,
	frieghtappdetail_rules_application_appupdatesuccess_js : frieghtappdetail_rules_application_appupdatesuccess_js,
	frieghtappdetail_rules_application_clientismultiusermode_js : frieghtappdetail_rules_application_clientismultiusermode_js,
	frieghtappdetail_rules_application_getclientsupportversions_js : frieghtappdetail_rules_application_getclientsupportversions_js,
	frieghtappdetail_rules_application_getclientversion_js : frieghtappdetail_rules_application_getclientversion_js,
	frieghtappdetail_rules_application_initializeautosync_js : frieghtappdetail_rules_application_initializeautosync_js,
	frieghtappdetail_rules_application_onwillupdate_js : frieghtappdetail_rules_application_onwillupdate_js,
	frieghtappdetail_rules_application_refreshpage_js : frieghtappdetail_rules_application_refreshpage_js,
	frieghtappdetail_rules_application_resetappsettingsandlogout_js : frieghtappdetail_rules_application_resetappsettingsandlogout_js,
	frieghtappdetail_rules_autosync_autosynclibrary_js : frieghtappdetail_rules_autosync_autosynclibrary_js,
	frieghtappdetail_rules_autosync_autosynconresume_js : frieghtappdetail_rules_autosync_autosynconresume_js,
	frieghtappdetail_rules_autosync_autosynconsave_js : frieghtappdetail_rules_autosync_autosynconsave_js,
	frieghtappdetail_rules_autosync_executeactionwithautosync_js : frieghtappdetail_rules_autosync_executeactionwithautosync_js,
	frieghtappdetail_rules_autosync_networkmonitoringlibrary_js : frieghtappdetail_rules_autosync_networkmonitoringlibrary_js,
	frieghtappdetail_rules_constant_autosyncconstant_js : frieghtappdetail_rules_constant_autosyncconstant_js,
	frieghtappdetail_rules_constant_shipmentconstant_js : frieghtappdetail_rules_constant_shipmentconstant_js,
	frieghtappdetail_rules_constant_unplannedevent_js : frieghtappdetail_rules_constant_unplannedevent_js,
	frieghtappdetail_rules_departure_postshipmentarrival_js : frieghtappdetail_rules_departure_postshipmentarrival_js,
	frieghtappdetail_rules_departure_postshipmentdeparture_js : frieghtappdetail_rules_departure_postshipmentdeparture_js,
	frieghtappdetail_rules_library_applicationsettings_js : frieghtappdetail_rules_library_applicationsettings_js,
	frieghtappdetail_rules_library_base64library_js : frieghtappdetail_rules_library_base64library_js,
	frieghtappdetail_rules_library_commonlibrary_js : frieghtappdetail_rules_library_commonlibrary_js,
	frieghtappdetail_rules_library_currentdatetime_js : frieghtappdetail_rules_library_currentdatetime_js,
	frieghtappdetail_rules_library_globalcommon_js : frieghtappdetail_rules_library_globalcommon_js,
	frieghtappdetail_rules_library_isandroid_js : frieghtappdetail_rules_library_isandroid_js,
	frieghtappdetail_rules_library_localizationlibrary_js : frieghtappdetail_rules_library_localizationlibrary_js,
	frieghtappdetail_rules_library_logger_js : frieghtappdetail_rules_library_logger_js,
	frieghtappdetail_rules_library_nativescriptobject_js : frieghtappdetail_rules_library_nativescriptobject_js,
	frieghtappdetail_rules_library_odatadate_js : frieghtappdetail_rules_library_odatadate_js,
	frieghtappdetail_rules_library_validationlibrary_js : frieghtappdetail_rules_library_validationlibrary_js,
	frieghtappdetail_rules_location_getcordinates_js : frieghtappdetail_rules_location_getcordinates_js,
	frieghtappdetail_rules_location_getcurrentlocation_js : frieghtappdetail_rules_location_getcurrentlocation_js,
	frieghtappdetail_rules_location_getlatitude_js : frieghtappdetail_rules_location_getlatitude_js,
	frieghtappdetail_rules_location_getlongitude_js : frieghtappdetail_rules_location_getlongitude_js,
	frieghtappdetail_rules_location_servicemanager_js : frieghtappdetail_rules_location_servicemanager_js,
	frieghtappdetail_rules_location_showlocationvalues_js : frieghtappdetail_rules_location_showlocationvalues_js,
	frieghtappdetail_rules_logging_loglevels_js : frieghtappdetail_rules_logging_loglevels_js,
	frieghtappdetail_rules_logging_materialfetchonsuccessfulupdate_js : frieghtappdetail_rules_logging_materialfetchonsuccessfulupdate_js,
	frieghtappdetail_rules_logging_settracecategories_js : frieghtappdetail_rules_logging_settracecategories_js,
	frieghtappdetail_rules_logging_setuserloglevel_js : frieghtappdetail_rules_logging_setuserloglevel_js,
	frieghtappdetail_rules_logging_togglelogging_js : frieghtappdetail_rules_logging_togglelogging_js,
	frieghtappdetail_rules_logging_tracecategories_js : frieghtappdetail_rules_logging_tracecategories_js,
	frieghtappdetail_rules_logging_userlogsetting_js : frieghtappdetail_rules_logging_userlogsetting_js,
	frieghtappdetail_rules_proofofdelivery_buildmaterialitempath_js : frieghtappdetail_rules_proofofdelivery_buildmaterialitempath_js,
	frieghtappdetail_rules_proofofdelivery_fetchmaterialitem_js : frieghtappdetail_rules_proofofdelivery_fetchmaterialitem_js,
	frieghtappdetail_rules_proofofdelivery_fetchmaterialitemwrapper_js : frieghtappdetail_rules_proofofdelivery_fetchmaterialitemwrapper_js,
	frieghtappdetail_rules_proofofdelivery_formatdisplayquantity_js : frieghtappdetail_rules_proofofdelivery_formatdisplayquantity_js,
	frieghtappdetail_rules_proofofdelivery_formatrecievedquantity_js : frieghtappdetail_rules_proofofdelivery_formatrecievedquantity_js,
	frieghtappdetail_rules_proofofdelivery_getlocationidformaterialupdate_js : frieghtappdetail_rules_proofofdelivery_getlocationidformaterialupdate_js,
	frieghtappdetail_rules_proofofdelivery_getproofofdeliveryitems_js : frieghtappdetail_rules_proofofdelivery_getproofofdeliveryitems_js,
	frieghtappdetail_rules_proofofdelivery_getshipmentnumformaterialupdate_js : frieghtappdetail_rules_proofofdelivery_getshipmentnumformaterialupdate_js,
	frieghtappdetail_rules_proofofdelivery_isemailsectionvisible_js : frieghtappdetail_rules_proofofdelivery_isemailsectionvisible_js,
	frieghtappdetail_rules_proofofdelivery_materialdescriptionstyle_js : frieghtappdetail_rules_proofofdelivery_materialdescriptionstyle_js,
	frieghtappdetail_rules_proofofdelivery_postproofofdelivery_js : frieghtappdetail_rules_proofofdelivery_postproofofdelivery_js,
	frieghtappdetail_rules_proofofdelivery_proofofdeliveryupdateattachment_js : frieghtappdetail_rules_proofofdelivery_proofofdeliveryupdateattachment_js,
	frieghtappdetail_rules_proofofdelivery_proofofdeliveryupdatesignature_js : frieghtappdetail_rules_proofofdelivery_proofofdeliveryupdatesignature_js,
	frieghtappdetail_rules_proofofdelivery_triggerproofofdelivery_js : frieghtappdetail_rules_proofofdelivery_triggerproofofdelivery_js,
	frieghtappdetail_rules_route_showshipmentroute_js : frieghtappdetail_rules_route_showshipmentroute_js,
	frieghtappdetail_rules_shipment_buildshipmentpath_js : frieghtappdetail_rules_shipment_buildshipmentpath_js,
	frieghtappdetail_rules_shipment_getshipmentobject_js : frieghtappdetail_rules_shipment_getshipmentobject_js,
	frieghtappdetail_rules_shipment_getstopid_js : frieghtappdetail_rules_shipment_getstopid_js,
	frieghtappdetail_rules_shipment_gettimezone_js : frieghtappdetail_rules_shipment_gettimezone_js,
	frieghtappdetail_rules_shipment_navtoshipmentdetails_js : frieghtappdetail_rules_shipment_navtoshipmentdetails_js,
	frieghtappdetail_rules_shipment_shipmentlistviewarrivalbuttonvisible_js : frieghtappdetail_rules_shipment_shipmentlistviewarrivalbuttonvisible_js,
	frieghtappdetail_rules_shipment_shipmentlistviewcaption_js : frieghtappdetail_rules_shipment_shipmentlistviewcaption_js,
	frieghtappdetail_rules_shipment_shipmentlistviewdeparturebuttonvisible_js : frieghtappdetail_rules_shipment_shipmentlistviewdeparturebuttonvisible_js,
	frieghtappdetail_rules_shipment_shipmentlistviewicon_js : frieghtappdetail_rules_shipment_shipmentlistviewicon_js,
	frieghtappdetail_rules_shipment_shipmentlistviewonreturning_js : frieghtappdetail_rules_shipment_shipmentlistviewonreturning_js,
	frieghtappdetail_rules_shipment_shipmentlistviewpodbuttonvisible_js : frieghtappdetail_rules_shipment_shipmentlistviewpodbuttonvisible_js,
	frieghtappdetail_rules_shipment_shipmentlistviewstyle_js : frieghtappdetail_rules_shipment_shipmentlistviewstyle_js,
	frieghtappdetail_rules_shipment_shipmentlistviewsubhead_js : frieghtappdetail_rules_shipment_shipmentlistviewsubhead_js,
	frieghtappdetail_rules_shipment_shipmentstatusupdatealtkey_js : frieghtappdetail_rules_shipment_shipmentstatusupdatealtkey_js,
	frieghtappdetail_rules_shipment_shipmentstatusupdateeventname_js : frieghtappdetail_rules_shipment_shipmentstatusupdateeventname_js,
	frieghtappdetail_rules_shipment_shipmentstatusupdateeventtime_js : frieghtappdetail_rules_shipment_shipmentstatusupdateeventtime_js,
	frieghtappdetail_rules_shipment_shipmentstatusupdatelocationaltkey_js : frieghtappdetail_rules_shipment_shipmentstatusupdatelocationaltkey_js,
	frieghtappdetail_rules_shipment_storefetchedshipmentdetail_js : frieghtappdetail_rules_shipment_storefetchedshipmentdetail_js,
	frieghtappdetail_rules_unplannedevent_postunplannedevent_js : frieghtappdetail_rules_unplannedevent_postunplannedevent_js,
	frieghtappdetail_rules_unplannedevent_unplannedeventcodelistpicker_js : frieghtappdetail_rules_unplannedevent_unplannedeventcodelistpicker_js,
	frieghtappdetail_rules_unplannedevent_unplannedeventlistpickerlist_js : frieghtappdetail_rules_unplannedevent_unplannedeventlistpickerlist_js,
	frieghtappdetail_rules_unplannedevent_unplannedeventreasoncodelistpicker_js : frieghtappdetail_rules_unplannedevent_unplannedeventreasoncodelistpicker_js,
	frieghtappdetail_services_frieghtrestsrv_service : frieghtappdetail_services_frieghtrestsrv_service,
	frieghtappdetail_styles_styles_css : frieghtappdetail_styles_styles_css,
	frieghtappdetail_styles_styles_dark_css : frieghtappdetail_styles_styles_dark_css,
	frieghtappdetail_styles_styles_dark_json : frieghtappdetail_styles_styles_dark_json,
	frieghtappdetail_styles_styles_dark_less : frieghtappdetail_styles_styles_dark_less,
	frieghtappdetail_styles_styles_dark_nss : frieghtappdetail_styles_styles_dark_nss,
	frieghtappdetail_styles_styles_json : frieghtappdetail_styles_styles_json,
	frieghtappdetail_styles_styles_less : frieghtappdetail_styles_styles_less,
	frieghtappdetail_styles_styles_nss : frieghtappdetail_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Styles/Styles.css":
/*!**************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Styles/Styles.css ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ns-light .ObjectTableRed {
	color: #ff0000;
}
.ns-light .ObjectTableBlue {
	color: #3333cc;
}
.ns-light .ObjectTableGreen {
	color: #339966;
}
.ns-light .FormCellLabelCritical {
	color: #ff0000;
	font-name: boldSystem;
	font-size: 14;
}
.ns-light .FormCellLabelStandard {
	color: #0040ff;
	font-name: thinSystem;
	font-size: 12;
}
.ns-light .FormCellValueCritical {
	color: #B0D450;
	font-name: boldSystem;
	font-size: 16;
}
.ns-light .FormCellValueStandard {
	color: #895600;
	font-name: thinSystem;
	font-size: 12;
}
.ns-light .FormCellLabelPropertyStandard {
	color: #ff0000;
	font-name: italicSystem;
	font-size: 14;
}
.ns-light .FormCellLabelPropertyCritical {
	color: #3333cc;
	font-name: boldSystem;
	font-size: 14;
}
.ns-light .FormCellValuePropertyStandard {
	color: #ff3333;
	font-name: italicSystem;
	font-size: 12;
}
.ns-light .FormCellValuePropertyCritical {
	color: #7070db;
	font-name: boldSystem;
	font-size: 12;
}
.ns-light .FormCellLabelPickerStandard {
	color: #ff0000;
	font-name: italicSystem;
	font-size: 14;
}
.ns-light .FormCellLabelPickerCritical {
	color: #3333cc;
	font-name: boldSystem;
	font-size: 14;
}
.ns-light .FormCellValuePickerStandard {
	color: #ff3333;
	font-name: italicSystem;
	font-size: 12;
}
.ns-light .FormCellValuePickerCritical {
	color: #7070db;
	font-name: boldSystem;
	font-size: 12;
}
.ns-light .FormCellBackgroundCritical {
	background-color: #ffe6e6;
	tint-color: #ffd9cc;
	color: #33cc33;
	font-name: italicSystem;
	font-size: 14;
}
.ns-light .FormCellBackgroundStandard {
	background-color: #e6f0ff;
	tint-color: blue;
	color: #cc6600;
	font-name: thinSystem;
	font-size: 12;
}
.ns-light .FormCellBackgroundCriticalTitle {
	background-color: #339966;
	tint-color: purple;
	color: #33cc33;
	font-name: italicSystem;
	font-size: 12;
}
.ns-light .FormCellBackgroundStandardTitle {
	background-color: #79d2a6;
	tint-color: #339966;
	color: #cc6600;
	font-name: thinSystem;
	font-size: 10;
}
.ns-light .FormCellSwitchStandard {
	on-tint-color: #adadeb;
	tint-color: #80b3ff;
	thumb-tint-color: brown;
}
.ns-light .FormCellSwitchCritical {
	on-tint-color: #ff6666;
	tint-color: #ffb399;
	thumb-tint-color: yellow;
}
.ns-light .FormCellNoteTextCritical {
	color: #ff6666;
	font-name: boldSystem;
	font-size: 14;
}
.ns-light .FormCellNoteTextStandard {
	color: #adadeb;
	font-name: thinSystem;
	font-size: 12;
}
.ns-light .FormCellTitleTextCritical {
	color: #ff3333;
	font-name: boldSystem;
	font-size: 14;
}
.ns-light .FormCellTitleTextStandard {
	color: #7070db;
	font-name: thinSystem;
	font-size: 12;
}
.ns-light .FormCellBackgroundNotEditable {
	background-color: #ffffff;
}
.ns-light .FormCellBackgroundEditable {
	background-color: #ffffff;
}
.ns-light .ObjectCellStyleBlack {
	color: #000000;
}
.ns-light .ObjectCellStyleRed {
	font-color: #D9364C;
}
.ns-light .FootnotePrimary {
	color: #76767B;
}
.ns-light .IosHighPriorityRed {
	color: #BB0000;
}
.ns-light .IosMediumPriorityOrange {
	color: #E9730C;
}
.ns-light .AndroidHighPriorityRed {
	color: #BB0000;
}
.ns-light .AndroidMediumPriorityOrange {
	color: #E9730C;
}
.ns-light .ResetRed {
	color: #D9364C;
}
.ns-light .FormCellButton {
	color: #0A6ED1;
}
.ns-light .FormCellReadOnlyEntry {
	color: #76767B;
}
.ns-light .GrayText {
	color: #76767B;
}
.ns-light .FormCellTextEntry {
	color: #3F3A3A;
}
.ns-light .GridTableTextBlack {
	color: #32363A;
}
.ns-light .GridTableTextBlackLarge {
	color: #32363A;
	font-size: 16;
}
.ns-light .GridTableHeaderText {
	color: #6A6D70;
}
.ns-light .GridTableRowText {
	color: #393E42;
	font-size: 14;
}
.ns-light .ObjectHeaderKPITintColor {
	tint-color: #0070F2;
	/*for KPIView */
  color: #0070F2;
}
.ns-light .ObjectHeaderKPICaption {
	font-size: 30;
	color: #0070F2;
	font-style: UIFontTextStyleBody;
}
.ns-light .ObjectHeaderBackground {
	background-color: white;
	color: #000000;
}
.ns-light .WorkOrderFilterPage_ToolBar {
	color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
.ns-light .WorkOrderFilterPage {
	anchorcolor: #445E75;
}
.ns-light .NotificationFilterPage_ToolBar {
	color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
.ns-light .NotificationFilterPage {
	anchorcolor: #445E75;
}
.ns-light .EquipmentFilterPage_ToolBar {
	color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
.ns-light .EquipmentFilterPage {
	anchorcolor: #445E75;
}
.ns-light .FunctionalLocationFilterPage_ToolBar {
	color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
.ns-light .FunctionalLocationFilterPage {
	anchorcolor: #445E75;
}
.ns-light .Title {
	color: #4A4A4A;
	font-size: 17;
	font-weight: 600;
}
.ns-light .WorkOrderDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-light .MeasuringPointDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-light .NotificationDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-light .NotificationItemTaskDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-light .NotificationTaskDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-light .WorkOrderOperationDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-light .SubOperationDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-light .SideDrawerBackground {
	background-color: white;
}
.ns-light .SideDrawerHeaderBackground {
	background-color: white;
}
.ns-light .SideDrawerHeaderIcon {
	font-size: 16;
	color: #FF0000;
	background-color: #000000;
}
.ns-light .SideDrawerHeadline {
	color: black;
}
.ns-light .SideDrawerSubHeadline {
	font-style: italic;
}
.ns-light .SideDrawerHeaderSeparator {
	border-bottom-color: #f2f2f2;
	border-bottom-width: 30;
}
.ns-light .SideDrawerHeaderSeparatorAndroid {
	border-bottom-color: #f2f2f2;
	border-bottom-width: 1;
}
.ns-light .SideDrawerSectionCaption {
	background-color: #192325;
	color: black;
	text-align: left;
}
.ns-light .SideDrawerSectionSeparator {
	border-bottom-color: #f2f2f2;
	border-bottom-width: 30;
}
.ns-light .SideDrawerSectionSeparatorAndroid {
	border-bottom-color: #f2f2f2;
	border-bottom-width: 1;
}
.ns-light .SideDrawerItemActive {
	background-color: white;
	color: black;
	text-align: left;
}
.ns-light .SideDrawerItemInactive {
	color: black;
	text-align: left;
}
.ns-light .SideDrawerItemOnPress {
	background-color: white;
	color: black;
	text-align: left;
}
.ns-light .SideDrawerHeaderIconText {
	font-size: 16;
	color: #FF0000;
}
.ns-light .SideDrawerHeaderIconBackground {
	background-color: #000000;
}
.ns-light .SectionCaption {
	background-color: #adadeb;
	color: red;
	text-align: left;
}
.ns-light .SectionSeparator {
	border-bottom-color: #f2f2f2;
	border-bottom-width: 7;
}
.ns-light .SectionItemActive {
	border-bottom-color: #E8E8ED;
	border-bottom-width: 1;
}
.ns-light .SectionItemInactive {
	border-bottom-color: #E8E8ED;
	border-bottom-width: 1;
}
.ns-light .SectionItemOnPress {
	border-bottom-color: #E8E8ED;
	border-bottom-width: 1;
}
.ns-light .SerialNumberStatusText {
	padding: 14;
	font-size: 16;
}
.ns-light .ContextMenuGreen {
	background-color: #79d2a6;
	color: white;
}
.ns-light .RejectedRed {
	color: #BB0000;
	font-size: 12;
}
.ns-light .AcceptedGreen {
	color: #107E3E;
}
.ns-light .Color_2A6D3C {
	color: #3A835B;
}
.ns-light .Color_0000 {
	color: #000000;
}
.ns-light .Color_DE890D {
	color: #FFA325;
}
.ns-light .Color_930A0A {
	color: #D9364C;
}
.ns-light .Color_AFD149 {
	color: #3A835B;
}
.ns-light .ZCardTittleGreen {
	color: #6FAB28;
}
.ns-light .ZCardTittleOrange {
	color: #F7BF04;
}
.ns-light .ZCardTittleBlack {
	color: #000000;
}
`, "",{"version":3,"sources":["webpack://./build.definitions/FrieghtAppDetail/Styles/Styles.css"],"names":[],"mappings":"AAAA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,mBAAmB;CACnB,cAAc;CACd,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,gBAAgB;CAChB,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,kBAAkB;CAClB,cAAc;CACd,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,mBAAmB;CACnB,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,sBAAsB;CACtB,mBAAmB;CACnB,uBAAuB;AACxB;AACA;CACC,sBAAsB;CACtB,mBAAmB;CACnB,wBAAwB;AACzB;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,cAAc;AACf;AACA;CACC,mBAAmB;AACpB;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;CACd,aAAa;AACd;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;CACd,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,eAAe;EACd,cAAc;AAChB;AACA;CACC,aAAa;CACb,cAAc;CACd,+BAA+B;AAChC;AACA;CACC,uBAAuB;CACvB,cAAc;AACf;AACA;CACC,cAAc;CACd,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,cAAc;CACd,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,cAAc;CACd,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,cAAc;CACd,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,cAAc;CACd,aAAa;CACb,gBAAgB;AACjB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,uBAAuB;AACxB;AACA;CACC,uBAAuB;AACxB;AACA;CACC,aAAa;CACb,cAAc;CACd,yBAAyB;AAC1B;AACA;CACC,YAAY;AACb;AACA;CACC,kBAAkB;AACnB;AACA;CACC,4BAA4B;CAC5B,uBAAuB;AACxB;AACA;CACC,4BAA4B;CAC5B,sBAAsB;AACvB;AACA;CACC,yBAAyB;CACzB,YAAY;CACZ,gBAAgB;AACjB;AACA;CACC,4BAA4B;CAC5B,uBAAuB;AACxB;AACA;CACC,4BAA4B;CAC5B,sBAAsB;AACvB;AACA;CACC,uBAAuB;CACvB,YAAY;CACZ,gBAAgB;AACjB;AACA;CACC,YAAY;CACZ,gBAAgB;AACjB;AACA;CACC,uBAAuB;CACvB,YAAY;CACZ,gBAAgB;AACjB;AACA;CACC,aAAa;CACb,cAAc;AACf;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;CACzB,UAAU;CACV,gBAAgB;AACjB;AACA;CACC,4BAA4B;CAC5B,sBAAsB;AACvB;AACA;CACC,4BAA4B;CAC5B,sBAAsB;AACvB;AACA;CACC,4BAA4B;CAC5B,sBAAsB;AACvB;AACA;CACC,4BAA4B;CAC5B,sBAAsB;AACvB;AACA;CACC,WAAW;CACX,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,YAAY;AACb;AACA;CACC,cAAc;CACd,aAAa;AACd;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf","sourcesContent":[".ns-light .ObjectTableRed {\n\tcolor: #ff0000;\n}\n.ns-light .ObjectTableBlue {\n\tcolor: #3333cc;\n}\n.ns-light .ObjectTableGreen {\n\tcolor: #339966;\n}\n.ns-light .FormCellLabelCritical {\n\tcolor: #ff0000;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\n.ns-light .FormCellLabelStandard {\n\tcolor: #0040ff;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\n.ns-light .FormCellValueCritical {\n\tcolor: #B0D450;\n\tfont-name: boldSystem;\n\tfont-size: 16;\n}\n.ns-light .FormCellValueStandard {\n\tcolor: #895600;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\n.ns-light .FormCellLabelPropertyStandard {\n\tcolor: #ff0000;\n\tfont-name: italicSystem;\n\tfont-size: 14;\n}\n.ns-light .FormCellLabelPropertyCritical {\n\tcolor: #3333cc;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\n.ns-light .FormCellValuePropertyStandard {\n\tcolor: #ff3333;\n\tfont-name: italicSystem;\n\tfont-size: 12;\n}\n.ns-light .FormCellValuePropertyCritical {\n\tcolor: #7070db;\n\tfont-name: boldSystem;\n\tfont-size: 12;\n}\n.ns-light .FormCellLabelPickerStandard {\n\tcolor: #ff0000;\n\tfont-name: italicSystem;\n\tfont-size: 14;\n}\n.ns-light .FormCellLabelPickerCritical {\n\tcolor: #3333cc;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\n.ns-light .FormCellValuePickerStandard {\n\tcolor: #ff3333;\n\tfont-name: italicSystem;\n\tfont-size: 12;\n}\n.ns-light .FormCellValuePickerCritical {\n\tcolor: #7070db;\n\tfont-name: boldSystem;\n\tfont-size: 12;\n}\n.ns-light .FormCellBackgroundCritical {\n\tbackground-color: #ffe6e6;\n\ttint-color: #ffd9cc;\n\tcolor: #33cc33;\n\tfont-name: italicSystem;\n\tfont-size: 14;\n}\n.ns-light .FormCellBackgroundStandard {\n\tbackground-color: #e6f0ff;\n\ttint-color: blue;\n\tcolor: #cc6600;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\n.ns-light .FormCellBackgroundCriticalTitle {\n\tbackground-color: #339966;\n\ttint-color: purple;\n\tcolor: #33cc33;\n\tfont-name: italicSystem;\n\tfont-size: 12;\n}\n.ns-light .FormCellBackgroundStandardTitle {\n\tbackground-color: #79d2a6;\n\ttint-color: #339966;\n\tcolor: #cc6600;\n\tfont-name: thinSystem;\n\tfont-size: 10;\n}\n.ns-light .FormCellSwitchStandard {\n\ton-tint-color: #adadeb;\n\ttint-color: #80b3ff;\n\tthumb-tint-color: brown;\n}\n.ns-light .FormCellSwitchCritical {\n\ton-tint-color: #ff6666;\n\ttint-color: #ffb399;\n\tthumb-tint-color: yellow;\n}\n.ns-light .FormCellNoteTextCritical {\n\tcolor: #ff6666;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\n.ns-light .FormCellNoteTextStandard {\n\tcolor: #adadeb;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\n.ns-light .FormCellTitleTextCritical {\n\tcolor: #ff3333;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\n.ns-light .FormCellTitleTextStandard {\n\tcolor: #7070db;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\n.ns-light .FormCellBackgroundNotEditable {\n\tbackground-color: #ffffff;\n}\n.ns-light .FormCellBackgroundEditable {\n\tbackground-color: #ffffff;\n}\n.ns-light .ObjectCellStyleBlack {\n\tcolor: #000000;\n}\n.ns-light .ObjectCellStyleRed {\n\tfont-color: #D9364C;\n}\n.ns-light .FootnotePrimary {\n\tcolor: #76767B;\n}\n.ns-light .IosHighPriorityRed {\n\tcolor: #BB0000;\n}\n.ns-light .IosMediumPriorityOrange {\n\tcolor: #E9730C;\n}\n.ns-light .AndroidHighPriorityRed {\n\tcolor: #BB0000;\n}\n.ns-light .AndroidMediumPriorityOrange {\n\tcolor: #E9730C;\n}\n.ns-light .ResetRed {\n\tcolor: #D9364C;\n}\n.ns-light .FormCellButton {\n\tcolor: #0A6ED1;\n}\n.ns-light .FormCellReadOnlyEntry {\n\tcolor: #76767B;\n}\n.ns-light .GrayText {\n\tcolor: #76767B;\n}\n.ns-light .FormCellTextEntry {\n\tcolor: #3F3A3A;\n}\n.ns-light .GridTableTextBlack {\n\tcolor: #32363A;\n}\n.ns-light .GridTableTextBlackLarge {\n\tcolor: #32363A;\n\tfont-size: 16;\n}\n.ns-light .GridTableHeaderText {\n\tcolor: #6A6D70;\n}\n.ns-light .GridTableRowText {\n\tcolor: #393E42;\n\tfont-size: 14;\n}\n.ns-light .ObjectHeaderKPITintColor {\n\ttint-color: #0070F2;\n\t/*for KPIView */\n  color: #0070F2;\n}\n.ns-light .ObjectHeaderKPICaption {\n\tfont-size: 30;\n\tcolor: #0070F2;\n\tfont-style: UIFontTextStyleBody;\n}\n.ns-light .ObjectHeaderBackground {\n\tbackground-color: white;\n\tcolor: #000000;\n}\n.ns-light .WorkOrderFilterPage_ToolBar {\n\tcolor: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\n.ns-light .WorkOrderFilterPage {\n\tanchorcolor: #445E75;\n}\n.ns-light .NotificationFilterPage_ToolBar {\n\tcolor: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\n.ns-light .NotificationFilterPage {\n\tanchorcolor: #445E75;\n}\n.ns-light .EquipmentFilterPage_ToolBar {\n\tcolor: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\n.ns-light .EquipmentFilterPage {\n\tanchorcolor: #445E75;\n}\n.ns-light .FunctionalLocationFilterPage_ToolBar {\n\tcolor: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\n.ns-light .FunctionalLocationFilterPage {\n\tanchorcolor: #445E75;\n}\n.ns-light .Title {\n\tcolor: #4A4A4A;\n\tfont-size: 17;\n\tfont-weight: 600;\n}\n.ns-light .WorkOrderDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-light .MeasuringPointDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-light .NotificationDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-light .NotificationItemTaskDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-light .NotificationTaskDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-light .WorkOrderOperationDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-light .SubOperationDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-light .SideDrawerBackground {\n\tbackground-color: white;\n}\n.ns-light .SideDrawerHeaderBackground {\n\tbackground-color: white;\n}\n.ns-light .SideDrawerHeaderIcon {\n\tfont-size: 16;\n\tcolor: #FF0000;\n\tbackground-color: #000000;\n}\n.ns-light .SideDrawerHeadline {\n\tcolor: black;\n}\n.ns-light .SideDrawerSubHeadline {\n\tfont-style: italic;\n}\n.ns-light .SideDrawerHeaderSeparator {\n\tborder-bottom-color: #f2f2f2;\n\tborder-bottom-width: 30;\n}\n.ns-light .SideDrawerHeaderSeparatorAndroid {\n\tborder-bottom-color: #f2f2f2;\n\tborder-bottom-width: 1;\n}\n.ns-light .SideDrawerSectionCaption {\n\tbackground-color: #192325;\n\tcolor: black;\n\ttext-align: left;\n}\n.ns-light .SideDrawerSectionSeparator {\n\tborder-bottom-color: #f2f2f2;\n\tborder-bottom-width: 30;\n}\n.ns-light .SideDrawerSectionSeparatorAndroid {\n\tborder-bottom-color: #f2f2f2;\n\tborder-bottom-width: 1;\n}\n.ns-light .SideDrawerItemActive {\n\tbackground-color: white;\n\tcolor: black;\n\ttext-align: left;\n}\n.ns-light .SideDrawerItemInactive {\n\tcolor: black;\n\ttext-align: left;\n}\n.ns-light .SideDrawerItemOnPress {\n\tbackground-color: white;\n\tcolor: black;\n\ttext-align: left;\n}\n.ns-light .SideDrawerHeaderIconText {\n\tfont-size: 16;\n\tcolor: #FF0000;\n}\n.ns-light .SideDrawerHeaderIconBackground {\n\tbackground-color: #000000;\n}\n.ns-light .SectionCaption {\n\tbackground-color: #adadeb;\n\tcolor: red;\n\ttext-align: left;\n}\n.ns-light .SectionSeparator {\n\tborder-bottom-color: #f2f2f2;\n\tborder-bottom-width: 7;\n}\n.ns-light .SectionItemActive {\n\tborder-bottom-color: #E8E8ED;\n\tborder-bottom-width: 1;\n}\n.ns-light .SectionItemInactive {\n\tborder-bottom-color: #E8E8ED;\n\tborder-bottom-width: 1;\n}\n.ns-light .SectionItemOnPress {\n\tborder-bottom-color: #E8E8ED;\n\tborder-bottom-width: 1;\n}\n.ns-light .SerialNumberStatusText {\n\tpadding: 14;\n\tfont-size: 16;\n}\n.ns-light .ContextMenuGreen {\n\tbackground-color: #79d2a6;\n\tcolor: white;\n}\n.ns-light .RejectedRed {\n\tcolor: #BB0000;\n\tfont-size: 12;\n}\n.ns-light .AcceptedGreen {\n\tcolor: #107E3E;\n}\n.ns-light .Color_2A6D3C {\n\tcolor: #3A835B;\n}\n.ns-light .Color_0000 {\n\tcolor: #000000;\n}\n.ns-light .Color_DE890D {\n\tcolor: #FFA325;\n}\n.ns-light .Color_930A0A {\n\tcolor: #D9364C;\n}\n.ns-light .Color_AFD149 {\n\tcolor: #3A835B;\n}\n.ns-light .ZCardTittleGreen {\n\tcolor: #6FAB28;\n}\n.ns-light .ZCardTittleOrange {\n\tcolor: #F7BF04;\n}\n.ns-light .ZCardTittleBlack {\n\tcolor: #000000;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Styles/Styles.dark.css":
/*!*******************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Styles/Styles.dark.css ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ns-dark .FormCellLabelCritical {
	color: #ff0000;
	font-name: boldSystem;
	font-size: 14;
}
.ns-dark .FormCellLabelStandard {
	color: #0040ff;
	font-name: thinSystem;
	font-size: 12;
}
.ns-dark .FormCellValueCritical {
	color: #B0D450;
	font-name: boldSystem;
	font-size: 16;
}
.ns-dark .FormCellValueStandard {
	color: #895600;
	font-name: thinSystem;
	font-size: 12;
}
.ns-dark .FormCellLabelPropertyStandard {
	color: #ff0000;
	font-name: italicSystem;
	font-size: 14;
}
.ns-dark .FormCellLabelPropertyCritical {
	color: #3333cc;
	font-name: boldSystem;
	font-size: 14;
}
.ns-dark .FormCellValuePropertyStandard {
	color: #ff3333;
	font-name: italicSystem;
	font-size: 12;
}
.ns-dark .FormCellValuePropertyCritical {
	color: #7070db;
	font-name: boldSystem;
	font-size: 12;
}
.ns-dark .FormCellLabelPickerStandard {
	color: #ff0000;
	font-name: italicSystem;
	font-size: 14;
}
.ns-dark .FormCellLabelPickerCritical {
	color: #3333cc;
	font-name: boldSystem;
	font-size: 14;
}
.ns-dark .FormCellValuePickerStandard {
	color: #ff3333;
	font-name: italicSystem;
	font-size: 12;
}
.ns-dark .FormCellValuePickerCritical {
	color: #7070db;
	font-name: boldSystem;
	font-size: 12;
}
.ns-dark .FormCellBackgroundCritical {
	background-color: #ffe6e6;
	tint-color: #ffd9cc;
	color: #33cc33;
	font-name: italicSystem;
	font-size: 14;
}
.ns-dark .FormCellBackgroundStandard {
	background-color: #e6f0ff;
	tint-color: blue;
	color: #cc6600;
	font-name: thinSystem;
	font-size: 12;
}
.ns-dark .FormCellBackgroundCriticalTitle {
	background-color: #339966;
	tint-color: purple;
	color: #33cc33;
	font-name: italicSystem;
	font-size: 12;
}
.ns-dark .FormCellBackgroundStandardTitle {
	background-color: #79d2a6;
	tint-color: #339966;
	color: #cc6600;
	font-name: thinSystem;
	font-size: 10;
}
.ns-dark .FormCellSwitchStandard {
	on-tint-color: #adadeb;
	tint-color: #80b3ff;
	thumb-tint-color: brown;
}
.ns-dark .FormCellSwitchCritical {
	on-tint-color: #ff6666;
	tint-color: #ffb399;
	thumb-tint-color: yellow;
}
.ns-dark .FormCellNoteTextCritical {
	color: #ff6666;
	font-name: boldSystem;
	font-size: 14;
}
.ns-dark .FormCellNoteTextStandard {
	color: #adadeb;
	font-name: thinSystem;
	font-size: 12;
}
.ns-dark .FormCellTitleTextCritical {
	color: #ff3333;
	font-name: boldSystem;
	font-size: 14;
}
.ns-dark .FormCellTitleTextStandard {
	color: #7070db;
	font-name: thinSystem;
	font-size: 12;
}
.ns-dark .FormCellBackgroundNotEditable {
	background-color: #161616;
}
.ns-dark .FormCellBackgroundEditable {
	background-color: #ffffff;
}
.ns-dark .ObjectCellStyleBlack {
	color: #000000;
}
.ns-dark .ObjectCellStyleRed {
	font-color: #D9364C;
}
.ns-dark .FootnotePrimary {
	color: #76767B;
}
.ns-dark .IosHighPriorityRed {
	color: #FF453A;
}
.ns-dark .IosMediumPriorityOrange {
	color: #FF9F0A;
}
.ns-dark .AndroidHighPriorityRed {
	color: #FFBBBB;
}
.ns-dark .AndroidMediumPriorityOrange {
	color: #FCD295;
}
.ns-dark .ResetRed {
	color: #D9364C;
}
.ns-dark .FormCellButton {
	color: #91C8F6;
}
.ns-dark .FormCellReadOnlyEntry {
	color: #76767B;
}
.ns-dark .GrayText {
	color: #76767B;
}
.ns-dark .FormCellTextEntry {
	color: #3F3A3A;
}
.ns-dark .GridTableTextBlack {
	color: #ffffff;
}
.ns-dark .GridTableTextBlackLarge {
	color: #ffffff;
	font-size: 16;
}
.ns-dark .GridTableHeaderText {
	color: #ffffff;
}
.ns-dark .GridTableRowText {
	color: #ffffff;
	font-size: 14;
}
.ns-dark .ObjectHeaderKPITintColor {
	tint-color: #0A84FF;
	/*for KPIView */
  color: #0A84FF;
}
.ns-dark .ObjectHeaderKPICaption {
	font-size: 30;
	color: #0A84FF;
	font-style: UIFontTextStyleBody;
}
.ns-dark .ObjectHeaderBackground {
	background-color: white;
	color: #000000;
}
.ns-dark .WorkOrderFilterPage_ToolBar {
	color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
.ns-dark .WorkOrderFilterPage {
	anchorcolor: #445E75;
}
.ns-dark .NotificationFilterPage_ToolBar {
	color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
.ns-dark .NotificationFilterPage {
	anchorcolor: #445E75;
}
.ns-dark .EquipmentFilterPage_ToolBar {
	color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
.ns-dark .EquipmentFilterPage {
	anchorcolor: #445E75;
}
.ns-dark .FunctionalLocationFilterPage_ToolBar {
	color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
.ns-dark .FunctionalLocationFilterPage {
	anchorcolor: #445E75;
}
.ns-dark .Title {
	color: #4A4A4A;
	font-size: 17;
	font-weight: 600;
}
.ns-dark .WorkOrderDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-dark .MeasuringPointDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-dark .NotificationDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-dark .NotificationItemTaskDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-dark .NotificationTaskDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-dark .WorkOrderOperationDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-dark .SubOperationDetailsPage_ToolBar {
	color: #3678AF;
	bartintcolor: #F8F8F8;
}
.ns-dark .SerialNumberStatusText {
	padding: 14;
	font-size: 16;
}
`, "",{"version":3,"sources":["webpack://./build.definitions/FrieghtAppDetail/Styles/Styles.dark.css"],"names":[],"mappings":"AAAA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,mBAAmB;CACnB,cAAc;CACd,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,gBAAgB;CAChB,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,kBAAkB;CAClB,cAAc;CACd,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,mBAAmB;CACnB,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,sBAAsB;CACtB,mBAAmB;CACnB,uBAAuB;AACxB;AACA;CACC,sBAAsB;CACtB,mBAAmB;CACnB,wBAAwB;AACzB;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,cAAc;CACd,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,cAAc;AACf;AACA;CACC,mBAAmB;AACpB;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;CACd,aAAa;AACd;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;CACd,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,eAAe;EACd,cAAc;AAChB;AACA;CACC,aAAa;CACb,cAAc;CACd,+BAA+B;AAChC;AACA;CACC,uBAAuB;CACvB,cAAc;AACf;AACA;CACC,cAAc;CACd,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,cAAc;CACd,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,cAAc;CACd,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,cAAc;CACd,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,cAAc;CACd,aAAa;CACb,gBAAgB;AACjB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,cAAc;CACd,qBAAqB;AACtB;AACA;CACC,WAAW;CACX,aAAa;AACd","sourcesContent":[".ns-dark .FormCellLabelCritical {\n\tcolor: #ff0000;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\n.ns-dark .FormCellLabelStandard {\n\tcolor: #0040ff;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\n.ns-dark .FormCellValueCritical {\n\tcolor: #B0D450;\n\tfont-name: boldSystem;\n\tfont-size: 16;\n}\n.ns-dark .FormCellValueStandard {\n\tcolor: #895600;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\n.ns-dark .FormCellLabelPropertyStandard {\n\tcolor: #ff0000;\n\tfont-name: italicSystem;\n\tfont-size: 14;\n}\n.ns-dark .FormCellLabelPropertyCritical {\n\tcolor: #3333cc;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\n.ns-dark .FormCellValuePropertyStandard {\n\tcolor: #ff3333;\n\tfont-name: italicSystem;\n\tfont-size: 12;\n}\n.ns-dark .FormCellValuePropertyCritical {\n\tcolor: #7070db;\n\tfont-name: boldSystem;\n\tfont-size: 12;\n}\n.ns-dark .FormCellLabelPickerStandard {\n\tcolor: #ff0000;\n\tfont-name: italicSystem;\n\tfont-size: 14;\n}\n.ns-dark .FormCellLabelPickerCritical {\n\tcolor: #3333cc;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\n.ns-dark .FormCellValuePickerStandard {\n\tcolor: #ff3333;\n\tfont-name: italicSystem;\n\tfont-size: 12;\n}\n.ns-dark .FormCellValuePickerCritical {\n\tcolor: #7070db;\n\tfont-name: boldSystem;\n\tfont-size: 12;\n}\n.ns-dark .FormCellBackgroundCritical {\n\tbackground-color: #ffe6e6;\n\ttint-color: #ffd9cc;\n\tcolor: #33cc33;\n\tfont-name: italicSystem;\n\tfont-size: 14;\n}\n.ns-dark .FormCellBackgroundStandard {\n\tbackground-color: #e6f0ff;\n\ttint-color: blue;\n\tcolor: #cc6600;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\n.ns-dark .FormCellBackgroundCriticalTitle {\n\tbackground-color: #339966;\n\ttint-color: purple;\n\tcolor: #33cc33;\n\tfont-name: italicSystem;\n\tfont-size: 12;\n}\n.ns-dark .FormCellBackgroundStandardTitle {\n\tbackground-color: #79d2a6;\n\ttint-color: #339966;\n\tcolor: #cc6600;\n\tfont-name: thinSystem;\n\tfont-size: 10;\n}\n.ns-dark .FormCellSwitchStandard {\n\ton-tint-color: #adadeb;\n\ttint-color: #80b3ff;\n\tthumb-tint-color: brown;\n}\n.ns-dark .FormCellSwitchCritical {\n\ton-tint-color: #ff6666;\n\ttint-color: #ffb399;\n\tthumb-tint-color: yellow;\n}\n.ns-dark .FormCellNoteTextCritical {\n\tcolor: #ff6666;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\n.ns-dark .FormCellNoteTextStandard {\n\tcolor: #adadeb;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\n.ns-dark .FormCellTitleTextCritical {\n\tcolor: #ff3333;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\n.ns-dark .FormCellTitleTextStandard {\n\tcolor: #7070db;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\n.ns-dark .FormCellBackgroundNotEditable {\n\tbackground-color: #161616;\n}\n.ns-dark .FormCellBackgroundEditable {\n\tbackground-color: #ffffff;\n}\n.ns-dark .ObjectCellStyleBlack {\n\tcolor: #000000;\n}\n.ns-dark .ObjectCellStyleRed {\n\tfont-color: #D9364C;\n}\n.ns-dark .FootnotePrimary {\n\tcolor: #76767B;\n}\n.ns-dark .IosHighPriorityRed {\n\tcolor: #FF453A;\n}\n.ns-dark .IosMediumPriorityOrange {\n\tcolor: #FF9F0A;\n}\n.ns-dark .AndroidHighPriorityRed {\n\tcolor: #FFBBBB;\n}\n.ns-dark .AndroidMediumPriorityOrange {\n\tcolor: #FCD295;\n}\n.ns-dark .ResetRed {\n\tcolor: #D9364C;\n}\n.ns-dark .FormCellButton {\n\tcolor: #91C8F6;\n}\n.ns-dark .FormCellReadOnlyEntry {\n\tcolor: #76767B;\n}\n.ns-dark .GrayText {\n\tcolor: #76767B;\n}\n.ns-dark .FormCellTextEntry {\n\tcolor: #3F3A3A;\n}\n.ns-dark .GridTableTextBlack {\n\tcolor: #ffffff;\n}\n.ns-dark .GridTableTextBlackLarge {\n\tcolor: #ffffff;\n\tfont-size: 16;\n}\n.ns-dark .GridTableHeaderText {\n\tcolor: #ffffff;\n}\n.ns-dark .GridTableRowText {\n\tcolor: #ffffff;\n\tfont-size: 14;\n}\n.ns-dark .ObjectHeaderKPITintColor {\n\ttint-color: #0A84FF;\n\t/*for KPIView */\n  color: #0A84FF;\n}\n.ns-dark .ObjectHeaderKPICaption {\n\tfont-size: 30;\n\tcolor: #0A84FF;\n\tfont-style: UIFontTextStyleBody;\n}\n.ns-dark .ObjectHeaderBackground {\n\tbackground-color: white;\n\tcolor: #000000;\n}\n.ns-dark .WorkOrderFilterPage_ToolBar {\n\tcolor: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\n.ns-dark .WorkOrderFilterPage {\n\tanchorcolor: #445E75;\n}\n.ns-dark .NotificationFilterPage_ToolBar {\n\tcolor: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\n.ns-dark .NotificationFilterPage {\n\tanchorcolor: #445E75;\n}\n.ns-dark .EquipmentFilterPage_ToolBar {\n\tcolor: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\n.ns-dark .EquipmentFilterPage {\n\tanchorcolor: #445E75;\n}\n.ns-dark .FunctionalLocationFilterPage_ToolBar {\n\tcolor: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\n.ns-dark .FunctionalLocationFilterPage {\n\tanchorcolor: #445E75;\n}\n.ns-dark .Title {\n\tcolor: #4A4A4A;\n\tfont-size: 17;\n\tfont-weight: 600;\n}\n.ns-dark .WorkOrderDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-dark .MeasuringPointDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-dark .NotificationDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-dark .NotificationItemTaskDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-dark .NotificationTaskDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-dark .WorkOrderOperationDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-dark .SubOperationDetailsPage_ToolBar {\n\tcolor: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\n.ns-dark .SerialNumberStatusText {\n\tpadding: 14;\n\tfont-size: 16;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Styles/Styles.dark.less":
/*!********************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Styles/Styles.dark.less ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
FioriDesignLanguage.nss

Copyright © 2016 - 2017 SAP SE or an SAP affiliate company. All rights reserved.
No part of this publication may be reproduced or transmitted in any form or for any purpose
without the express permission of SAP SE. The information contained herein may be changed
without prior notice.

*/

@samprimary1:              #ff0000; /*red*/
@samprimary2:              #0040ff; /*blue*/
@samprimary3:              #33cc33; /*green*/
@samprimary4:              #cc6600; /*brown*/
@samprimary5:              #ffbb33; /*yellow*/
@samprimary6:              #A65395;
@samprimary7:              #9BE1FF;
@samprimary8:              #42CCC8;
@samprimary9:              #B0D450;
@samprimary10:       		   #895600;
@samprimary11:             #6A6D70;

@samblue1:                      #3333cc;
@samblue2:                      #7070db;
@samblue3:                      #adadeb;
@samblue4:                      #91C8F6;

@samred1:  	           	#ff0000;
@samred2:  	           	#ff3333;
@samred3:  	           	#ff6666;
@samred4:  	           	#D9364C;

@samgreen1:				#339966;
@samgreen2:				#39ac63;
@samgreen3:				#79d2a6;

@samblack:                 #000000;
@samgridblack:             #32363A;

@sambackground1:			#ffe6e6;
@sambackground2:			#e6f0ff;
@sambackground3:			#ffd9cc;
@sambackground4:			#cce0ff;
@sambackground5:			#ffc6b3;
@sambackground6:			#b3d1ff;
@sambackground7:			#ffb399;
@sambackground8:			#80b3ff;
@sambackground9:			#ff9f80;
@sambackground10:		#66a3ff;

@samBackgroundLightGrey: #f2f2f2;
@samBackgroundLightGrey: #f2f2f2;
@samBackgroundWhite: #ffffff;

@samFootnotePrimary: #76767B;
@samCaptionBlack: #3F3A3A;
@samHighPriorityiOS: #FF453A;
@samMediumPriorityiOS: #FF9F0A;
@samHighPriorityAndroid: #FFBBBB;
@samMediumPriorityAndroid: #FCD295;

.FormCellLabelCritical {
  color: @samprimary1;
  font-name: boldSystem;
  font-size: 14;
}

.FormCellLabelStandard {
  color: @samprimary2;
  font-name: thinSystem;
  font-size: 12;
}

.FormCellValueCritical {
  color: @samprimary9;
  font-name: boldSystem;
  font-size: 16;
}

.FormCellValueStandard {
  color: @samprimary10;
  font-name: thinSystem;
  font-size: 12;
}

.FormCellLabelPropertyStandard {
  color: @samred1;
  font-name: italicSystem;
  font-size: 14;
}

.FormCellLabelPropertyCritical {
  color: @samblue1;
  font-name: boldSystem;
  font-size: 14;
}

.FormCellValuePropertyStandard {
  color: @samred2;
  font-name: italicSystem;
  font-size: 12;
}

.FormCellValuePropertyCritical {
  color: @samblue2;
  font-name: boldSystem;
  font-size: 12;
}

.FormCellLabelPickerStandard {
  color: @samred1;
  font-name: italicSystem;
  font-size: 14;
}

.FormCellLabelPickerCritical {
  color: @samblue1;
  font-name: boldSystem;
  font-size: 14;
}

.FormCellValuePickerStandard {
  color: @samred2;
  font-name: italicSystem;
  font-size: 12;
}

.FormCellValuePickerCritical {
  color: @samblue2;
  font-name: boldSystem;
  font-size: 12;
}

.FormCellBackgroundCritical {
	background-color: @sambackground1;
	tint-color: @sambackground3;
	color: @samprimary3;
	font-name: italicSystem;
  font-size: 14;
}

.FormCellBackgroundStandard {
	background-color: @sambackground2;
	tint-color: blue;
	color: @samprimary4;
	font-name: thinSystem;
  font-size: 12;
}

.FormCellBackgroundCriticalTitle {
	background-color: @samgreen1;
	tint-color: purple;
	color: @samprimary3;
	font-name: italicSystem;
  font-size: 12;
}

.FormCellBackgroundStandardTitle {
	background-color: @samgreen3;
	tint-color: @samgreen1;
	color: @samprimary4;
	font-name: thinSystem;
  font-size: 10;
}

.FormCellSwitchStandard {
	on-tint-color: @samblue3;
	tint-color: @sambackground8;
	thumb-tint-color: brown;
}

.FormCellSwitchCritical {
  on-tint-color: @samred3;
  tint-color: @sambackground7;
  thumb-tint-color: yellow;
}

.FormCellNoteTextCritical {
	color: @samred3;
  	font-name: boldSystem;
  	font-size: 14;
}

.FormCellNoteTextStandard {
	color: @samblue3;
  	font-name: thinSystem;
  	font-size: 12;
}

.FormCellTitleTextCritical {
	color: @samred2;
  	font-name: boldSystem;
  	font-size: 14;
}

.FormCellTitleTextStandard {
	color: @samblue2;
  	font-name: thinSystem;
  	font-size: 12;
}


.FormCellBackgroundNotEditable {
    background-color: #161616;
}

.FormCellBackgroundEditable {
    background-color: @samBackgroundWhite;
}

.ObjectCellStyleBlack {
    color: @samblack;
}
.ObjectCellStyleRed {
  font-color: @samred4;
}
.FootnotePrimary {
    color: @samFootnotePrimary;
}
.IosHighPriorityRed {
  color: @samHighPriorityiOS;
}

.IosMediumPriorityOrange {
  color: @samMediumPriorityiOS;
}

.AndroidHighPriorityRed {
  color: @samHighPriorityAndroid;
}

.AndroidMediumPriorityOrange {
  color: @samMediumPriorityAndroid;
}

.ResetRed {
  color: @samred4;
}

.FormCellButton {
    color: @samblue4;
}

.FormCellReadOnlyEntry {
    color: #76767B;
}

.GrayText {
    color: @samFootnotePrimary;
}

.FormCellTextEntry {
    color: #3F3A3A;
}

.GridTableTextBlack {
  color: @samBackgroundWhite;
}

.GridTableTextBlackLarge {
  color: @samBackgroundWhite;
  font-size: 16;
}

.GridTableHeaderText {
color: @samBackgroundWhite;
}

.GridTableRowText {
color: @samBackgroundWhite;
font-size: 14;
}

.ObjectHeaderKPITintColor {
  tint-color: #0A84FF;  /*for KPIView */
  color: #0A84FF;  /*for KPIProgressView */
}

/* For Styling of Object Header KPI Caption Label */
.ObjectHeaderKPICaption {
  font-size: 30;
  color: #0A84FF; 
  font-style: UIFontTextStyleBody;
}

.ObjectHeaderBackground {
  background-color: white;
  color: @samblack;
}

/* Work Order Filter Page */
.WorkOrderFilterPage_ToolBar { 
  color: #3678AF; 
  font-size: 17; 
  bartintcolor: #F2F2F2;
  border-top-color: #F2F2F2; 
  border-width: 1; 
}
.WorkOrderFilterPage { 
  anchorcolor: #445E75;
}

/* Notificaiton Filter Page */
.NotificationFilterPage_ToolBar { 
  color: #3678AF; 
  font-size: 17; 
  bartintcolor: #F2F2F2;
  border-top-color: #F2F2F2; 
  border-width: 1; 
}
.NotificationFilterPage { 
  anchorcolor: #445E75;
}
/* Asset Filter Page */
.EquipmentFilterPage_ToolBar { 
  color: #3678AF; 
  font-size: 17; 
  bartintcolor: #F2F2F2;
  border-top-color: #F2F2F2; 
  border-width: 1; 
}
.EquipmentFilterPage { 
  anchorcolor: #445E75;
}
/* Functional Location Filter Page */
.FunctionalLocationFilterPage_ToolBar { 
  color: #3678AF; 
  font-size: 17; 
  bartintcolor: #F2F2F2;
  border-top-color: #F2F2F2; 
  border-width: 1; 
}
.FunctionalLocationFilterPage { 
  anchorcolor: #445E75;
}

/* Title of all the Filter toolbar */
.Title {
  color: #4A4A4A;
  font-size: 17;
  font-weight: 600;
}

/* Styling of the toolbar statues */
.WorkOrderDetailsPage_ToolBar { 
  color: #3678AF;
  bartintcolor: #F8F8F8;
} 

.MeasuringPointDetailsPage_ToolBar { 
  color: #3678AF;
  bartintcolor: #F8F8F8;
}

.NotificationDetailsPage_ToolBar { 
  color: #3678AF;
  bartintcolor: #F8F8F8;
}

.NotificationItemTaskDetailsPage_ToolBar {
  color: #3678AF;
  bartintcolor: #F8F8F8;
}

.NotificationTaskDetailsPage_ToolBar {
  color: #3678AF;
  bartintcolor: #F8F8F8;
}

.WorkOrderOperationDetailsPage_ToolBar {
  color: #3678AF;
  bartintcolor: #F8F8F8;
}

.SubOperationDetailsPage_ToolBar {
  color: #3678AF;
  bartintcolor: #F8F8F8;
}


.SerialNumberStatusText {
  padding: 14;
  font-size: 16;
}`, "",{"version":3,"sources":["webpack://./build.definitions/FrieghtAppDetail/Styles/Styles.dark.less"],"names":[],"mappings":"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,qBAAqB;EACrB,yBAAyB;EACzB,eAAe;AACjB;AACA;EACE,oBAAoB;AACtB;;AAEA,6BAA6B;AAC7B;EACE,cAAc;EACd,aAAa;EACb,qBAAqB;EACrB,yBAAyB;EACzB,eAAe;AACjB;AACA;EACE,oBAAoB;AACtB;AACA,sBAAsB;AACtB;EACE,cAAc;EACd,aAAa;EACb,qBAAqB;EACrB,yBAAyB;EACzB,eAAe;AACjB;AACA;EACE,oBAAoB;AACtB;AACA,oCAAoC;AACpC;EACE,cAAc;EACd,aAAa;EACb,qBAAqB;EACrB,yBAAyB;EACzB,eAAe;AACjB;AACA;EACE,oBAAoB;AACtB;;AAEA,oCAAoC;AACpC;EACE,cAAc;EACd,aAAa;EACb,gBAAgB;AAClB;;AAEA,mCAAmC;AACnC;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;;AAGA;EACE,WAAW;EACX,aAAa;AACf","sourcesContent":["/*\nFioriDesignLanguage.nss\n\nCopyright © 2016 - 2017 SAP SE or an SAP affiliate company. All rights reserved.\nNo part of this publication may be reproduced or transmitted in any form or for any purpose\nwithout the express permission of SAP SE. The information contained herein may be changed\nwithout prior notice.\n\n*/\n\n@samprimary1:              #ff0000; /*red*/\n@samprimary2:              #0040ff; /*blue*/\n@samprimary3:              #33cc33; /*green*/\n@samprimary4:              #cc6600; /*brown*/\n@samprimary5:              #ffbb33; /*yellow*/\n@samprimary6:              #A65395;\n@samprimary7:              #9BE1FF;\n@samprimary8:              #42CCC8;\n@samprimary9:              #B0D450;\n@samprimary10:       \t\t   #895600;\n@samprimary11:             #6A6D70;\n\n@samblue1:                      #3333cc;\n@samblue2:                      #7070db;\n@samblue3:                      #adadeb;\n@samblue4:                      #91C8F6;\n\n@samred1:  \t           \t#ff0000;\n@samred2:  \t           \t#ff3333;\n@samred3:  \t           \t#ff6666;\n@samred4:  \t           \t#D9364C;\n\n@samgreen1:\t\t\t\t#339966;\n@samgreen2:\t\t\t\t#39ac63;\n@samgreen3:\t\t\t\t#79d2a6;\n\n@samblack:                 #000000;\n@samgridblack:             #32363A;\n\n@sambackground1:\t\t\t#ffe6e6;\n@sambackground2:\t\t\t#e6f0ff;\n@sambackground3:\t\t\t#ffd9cc;\n@sambackground4:\t\t\t#cce0ff;\n@sambackground5:\t\t\t#ffc6b3;\n@sambackground6:\t\t\t#b3d1ff;\n@sambackground7:\t\t\t#ffb399;\n@sambackground8:\t\t\t#80b3ff;\n@sambackground9:\t\t\t#ff9f80;\n@sambackground10:\t\t#66a3ff;\n\n@samBackgroundLightGrey: #f2f2f2;\n@samBackgroundLightGrey: #f2f2f2;\n@samBackgroundWhite: #ffffff;\n\n@samFootnotePrimary: #76767B;\n@samCaptionBlack: #3F3A3A;\n@samHighPriorityiOS: #FF453A;\n@samMediumPriorityiOS: #FF9F0A;\n@samHighPriorityAndroid: #FFBBBB;\n@samMediumPriorityAndroid: #FCD295;\n\n.FormCellLabelCritical {\n  color: @samprimary1;\n  font-name: boldSystem;\n  font-size: 14;\n}\n\n.FormCellLabelStandard {\n  color: @samprimary2;\n  font-name: thinSystem;\n  font-size: 12;\n}\n\n.FormCellValueCritical {\n  color: @samprimary9;\n  font-name: boldSystem;\n  font-size: 16;\n}\n\n.FormCellValueStandard {\n  color: @samprimary10;\n  font-name: thinSystem;\n  font-size: 12;\n}\n\n.FormCellLabelPropertyStandard {\n  color: @samred1;\n  font-name: italicSystem;\n  font-size: 14;\n}\n\n.FormCellLabelPropertyCritical {\n  color: @samblue1;\n  font-name: boldSystem;\n  font-size: 14;\n}\n\n.FormCellValuePropertyStandard {\n  color: @samred2;\n  font-name: italicSystem;\n  font-size: 12;\n}\n\n.FormCellValuePropertyCritical {\n  color: @samblue2;\n  font-name: boldSystem;\n  font-size: 12;\n}\n\n.FormCellLabelPickerStandard {\n  color: @samred1;\n  font-name: italicSystem;\n  font-size: 14;\n}\n\n.FormCellLabelPickerCritical {\n  color: @samblue1;\n  font-name: boldSystem;\n  font-size: 14;\n}\n\n.FormCellValuePickerStandard {\n  color: @samred2;\n  font-name: italicSystem;\n  font-size: 12;\n}\n\n.FormCellValuePickerCritical {\n  color: @samblue2;\n  font-name: boldSystem;\n  font-size: 12;\n}\n\n.FormCellBackgroundCritical {\n\tbackground-color: @sambackground1;\n\ttint-color: @sambackground3;\n\tcolor: @samprimary3;\n\tfont-name: italicSystem;\n  font-size: 14;\n}\n\n.FormCellBackgroundStandard {\n\tbackground-color: @sambackground2;\n\ttint-color: blue;\n\tcolor: @samprimary4;\n\tfont-name: thinSystem;\n  font-size: 12;\n}\n\n.FormCellBackgroundCriticalTitle {\n\tbackground-color: @samgreen1;\n\ttint-color: purple;\n\tcolor: @samprimary3;\n\tfont-name: italicSystem;\n  font-size: 12;\n}\n\n.FormCellBackgroundStandardTitle {\n\tbackground-color: @samgreen3;\n\ttint-color: @samgreen1;\n\tcolor: @samprimary4;\n\tfont-name: thinSystem;\n  font-size: 10;\n}\n\n.FormCellSwitchStandard {\n\ton-tint-color: @samblue3;\n\ttint-color: @sambackground8;\n\tthumb-tint-color: brown;\n}\n\n.FormCellSwitchCritical {\n  on-tint-color: @samred3;\n  tint-color: @sambackground7;\n  thumb-tint-color: yellow;\n}\n\n.FormCellNoteTextCritical {\n\tcolor: @samred3;\n  \tfont-name: boldSystem;\n  \tfont-size: 14;\n}\n\n.FormCellNoteTextStandard {\n\tcolor: @samblue3;\n  \tfont-name: thinSystem;\n  \tfont-size: 12;\n}\n\n.FormCellTitleTextCritical {\n\tcolor: @samred2;\n  \tfont-name: boldSystem;\n  \tfont-size: 14;\n}\n\n.FormCellTitleTextStandard {\n\tcolor: @samblue2;\n  \tfont-name: thinSystem;\n  \tfont-size: 12;\n}\n\n\n.FormCellBackgroundNotEditable {\n    background-color: #161616;\n}\n\n.FormCellBackgroundEditable {\n    background-color: @samBackgroundWhite;\n}\n\n.ObjectCellStyleBlack {\n    color: @samblack;\n}\n.ObjectCellStyleRed {\n  font-color: @samred4;\n}\n.FootnotePrimary {\n    color: @samFootnotePrimary;\n}\n.IosHighPriorityRed {\n  color: @samHighPriorityiOS;\n}\n\n.IosMediumPriorityOrange {\n  color: @samMediumPriorityiOS;\n}\n\n.AndroidHighPriorityRed {\n  color: @samHighPriorityAndroid;\n}\n\n.AndroidMediumPriorityOrange {\n  color: @samMediumPriorityAndroid;\n}\n\n.ResetRed {\n  color: @samred4;\n}\n\n.FormCellButton {\n    color: @samblue4;\n}\n\n.FormCellReadOnlyEntry {\n    color: #76767B;\n}\n\n.GrayText {\n    color: @samFootnotePrimary;\n}\n\n.FormCellTextEntry {\n    color: #3F3A3A;\n}\n\n.GridTableTextBlack {\n  color: @samBackgroundWhite;\n}\n\n.GridTableTextBlackLarge {\n  color: @samBackgroundWhite;\n  font-size: 16;\n}\n\n.GridTableHeaderText {\ncolor: @samBackgroundWhite;\n}\n\n.GridTableRowText {\ncolor: @samBackgroundWhite;\nfont-size: 14;\n}\n\n.ObjectHeaderKPITintColor {\n  tint-color: #0A84FF;  /*for KPIView */\n  color: #0A84FF;  /*for KPIProgressView */\n}\n\n/* For Styling of Object Header KPI Caption Label */\n.ObjectHeaderKPICaption {\n  font-size: 30;\n  color: #0A84FF; \n  font-style: UIFontTextStyleBody;\n}\n\n.ObjectHeaderBackground {\n  background-color: white;\n  color: @samblack;\n}\n\n/* Work Order Filter Page */\n.WorkOrderFilterPage_ToolBar { \n  color: #3678AF; \n  font-size: 17; \n  bartintcolor: #F2F2F2;\n  border-top-color: #F2F2F2; \n  border-width: 1; \n}\n.WorkOrderFilterPage { \n  anchorcolor: #445E75;\n}\n\n/* Notificaiton Filter Page */\n.NotificationFilterPage_ToolBar { \n  color: #3678AF; \n  font-size: 17; \n  bartintcolor: #F2F2F2;\n  border-top-color: #F2F2F2; \n  border-width: 1; \n}\n.NotificationFilterPage { \n  anchorcolor: #445E75;\n}\n/* Asset Filter Page */\n.EquipmentFilterPage_ToolBar { \n  color: #3678AF; \n  font-size: 17; \n  bartintcolor: #F2F2F2;\n  border-top-color: #F2F2F2; \n  border-width: 1; \n}\n.EquipmentFilterPage { \n  anchorcolor: #445E75;\n}\n/* Functional Location Filter Page */\n.FunctionalLocationFilterPage_ToolBar { \n  color: #3678AF; \n  font-size: 17; \n  bartintcolor: #F2F2F2;\n  border-top-color: #F2F2F2; \n  border-width: 1; \n}\n.FunctionalLocationFilterPage { \n  anchorcolor: #445E75;\n}\n\n/* Title of all the Filter toolbar */\n.Title {\n  color: #4A4A4A;\n  font-size: 17;\n  font-weight: 600;\n}\n\n/* Styling of the toolbar statues */\n.WorkOrderDetailsPage_ToolBar { \n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n} \n\n.MeasuringPointDetailsPage_ToolBar { \n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n}\n\n.NotificationDetailsPage_ToolBar { \n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n}\n\n.NotificationItemTaskDetailsPage_ToolBar {\n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n}\n\n.NotificationTaskDetailsPage_ToolBar {\n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n}\n\n.WorkOrderOperationDetailsPage_ToolBar {\n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n}\n\n.SubOperationDetailsPage_ToolBar {\n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n}\n\n\n.SerialNumberStatusText {\n  padding: 14;\n  font-size: 16;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Styles/Styles.dark.nss":
/*!*******************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Styles/Styles.dark.nss ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@samprimary1: #ff0000;
/*red*/
@samprimary2: #0040ff;
/*blue*/
@samprimary3: #33cc33;
/*green*/
@samprimary4: #cc6600;
/*brown*/
@samprimary5: #ffbb33;
/*yellow*/
@samprimary6: #A65395;
@samprimary7: #9BE1FF;
@samprimary8: #42CCC8;
@samprimary9: #B0D450;
@samprimary10: #895600;
@samprimary11: #6A6D70;
@samblue1: #3333cc;
@samblue2: #7070db;
@samblue3: #adadeb;
@samblue4: #91C8F6;
@samred1: #ff0000;
@samred2: #ff3333;
@samred3: #ff6666;
@samred4: #D9364C;
@samgreen1: #339966;
@samgreen2: #39ac63;
@samgreen3: #79d2a6;
@samblack: #000000;
@samgridblack: #32363A;
@sambackground1: #ffe6e6;
@sambackground2: #e6f0ff;
@sambackground3: #ffd9cc;
@sambackground4: #cce0ff;
@sambackground5: #ffc6b3;
@sambackground6: #b3d1ff;
@sambackground7: #ffb399;
@sambackground8: #80b3ff;
@sambackground9: #ff9f80;
@sambackground10: #66a3ff;
@samBackgroundLightGrey: #f2f2f2;
@samBackgroundLightGrey: #f2f2f2;
@samBackgroundWhite: #ffffff;
@samFootnotePrimary: #76767B;
@samCaptionBlack: #3F3A3A;
@samHighPriorityiOS: #FF453A;
@samMediumPriorityiOS: #FF9F0A;
@samHighPriorityAndroid: #FFBBBB;
@samMediumPriorityAndroid: #FCD295;
FormCellLabelCritical {
	font-color: #ff0000;
	font-name: boldSystem;
	font-size: 14;
}
FormCellLabelStandard {
	font-color: #0040ff;
	font-name: thinSystem;
	font-size: 12;
}
FormCellValueCritical {
	font-color: #B0D450;
	font-name: boldSystem;
	font-size: 16;
}
FormCellValueStandard {
	font-color: #895600;
	font-name: thinSystem;
	font-size: 12;
}
FormCellLabelPropertyStandard {
	font-color: #ff0000;
	font-name: italicSystem;
	font-size: 14;
}
FormCellLabelPropertyCritical {
	font-color: #3333cc;
	font-name: boldSystem;
	font-size: 14;
}
FormCellValuePropertyStandard {
	font-color: #ff3333;
	font-name: italicSystem;
	font-size: 12;
}
FormCellValuePropertyCritical {
	font-color: #7070db;
	font-name: boldSystem;
	font-size: 12;
}
FormCellLabelPickerStandard {
	font-color: #ff0000;
	font-name: italicSystem;
	font-size: 14;
}
FormCellLabelPickerCritical {
	font-color: #3333cc;
	font-name: boldSystem;
	font-size: 14;
}
FormCellValuePickerStandard {
	font-color: #ff3333;
	font-name: italicSystem;
	font-size: 12;
}
FormCellValuePickerCritical {
	font-color: #7070db;
	font-name: boldSystem;
	font-size: 12;
}
FormCellBackgroundCritical {
	background-color: #ffe6e6;
	tint-color: #ffd9cc;
	font-color: #33cc33;
	font-name: italicSystem;
	font-size: 14;
}
FormCellBackgroundStandard {
	background-color: #e6f0ff;
	tint-color: blue;
	font-color: #cc6600;
	font-name: thinSystem;
	font-size: 12;
}
FormCellBackgroundCriticalTitle {
	background-color: #339966;
	tint-color: purple;
	font-color: #33cc33;
	font-name: italicSystem;
	font-size: 12;
}
FormCellBackgroundStandardTitle {
	background-color: #79d2a6;
	tint-color: #339966;
	font-color: #cc6600;
	font-name: thinSystem;
	font-size: 10;
}
FormCellSwitchStandard {
	on-tint-color: #adadeb;
	tint-color: #80b3ff;
	thumb-tint-color: brown;
}
FormCellSwitchCritical {
	on-tint-color: #ff6666;
	tint-color: #ffb399;
	thumb-tint-color: yellow;
}
FormCellNoteTextCritical {
	font-color: #ff6666;
	font-name: boldSystem;
	font-size: 14;
}
FormCellNoteTextStandard {
	font-color: #adadeb;
	font-name: thinSystem;
	font-size: 12;
}
FormCellTitleTextCritical {
	font-color: #ff3333;
	font-name: boldSystem;
	font-size: 14;
}
FormCellTitleTextStandard {
	font-color: #7070db;
	font-name: thinSystem;
	font-size: 12;
}
FormCellBackgroundNotEditable {
	background-color: #161616;
}
FormCellBackgroundEditable {
	background-color: #ffffff;
}
ObjectCellStyleBlack {
	font-color: #000000;
}
ObjectCellStyleRed {
	font-color: #D9364C;
}
FootnotePrimary {
	font-color: #76767B;
}
IosHighPriorityRed {
	font-color: #FF453A;
}
IosMediumPriorityOrange {
	font-color: #FF9F0A;
}
AndroidHighPriorityRed {
	font-color: #FFBBBB;
}
AndroidMediumPriorityOrange {
	font-color: #FCD295;
}
ResetRed {
	font-color: #D9364C;
}
FormCellButton {
	font-color: #91C8F6;
}
FormCellReadOnlyEntry {
	font-color: #76767B;
}
GrayText {
	font-color: #76767B;
}
FormCellTextEntry {
	font-color: #3F3A3A;
}
GridTableTextBlack {
	font-color: #ffffff;
}
GridTableTextBlackLarge {
	font-color: #ffffff;
	font-size: 16;
}
GridTableHeaderText {
	font-color: #ffffff;
}
GridTableRowText {
	font-color: #ffffff;
	font-size: 14;
}
ObjectHeaderKPITintColor {
	tint-color: #0A84FF;
	/*for KPIView */
  color: #0A84FF;
}
ObjectHeaderKPICaption {
	font-size: 30;
	font-color: #0A84FF;
	font-style: UIFontTextStyleBody;
}
ObjectHeaderBackground {
	background-color: white;
	font-color: #000000;
}
WorkOrderFilterPage_ToolBar {
	font-color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
WorkOrderFilterPage {
	anchorcolor: #445E75;
}
NotificationFilterPage_ToolBar {
	font-color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
NotificationFilterPage {
	anchorcolor: #445E75;
}
EquipmentFilterPage_ToolBar {
	font-color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
EquipmentFilterPage {
	anchorcolor: #445E75;
}
FunctionalLocationFilterPage_ToolBar {
	font-color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
FunctionalLocationFilterPage {
	anchorcolor: #445E75;
}
Title {
	font-color: #4A4A4A;
	font-size: 17;
	font-weight: 600;
}
WorkOrderDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
MeasuringPointDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
NotificationDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
NotificationItemTaskDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
NotificationTaskDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
WorkOrderOperationDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
SubOperationDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
SerialNumberStatusText {
	padding: 14;
	font-size: 16;
}
`, "",{"version":3,"sources":["webpack://./build.definitions/FrieghtAppDetail/Styles/Styles.dark.nss"],"names":[],"mappings":"AAAA,qBAAqB;AACrB,MAAM;AACN,qBAAqB;AACrB,OAAO;AACP,qBAAqB;AACrB,QAAQ;AACR,qBAAqB;AACrB,QAAQ;AACR,qBAAqB;AACrB,SAAS;AACT,qBAAqB;AACrB,qBAAqB;AACrB,qBAAqB;AACrB,qBAAqB;AACrB,sBAAsB;AACtB,sBAAsB;AACtB,kBAAkB;AAClB,kBAAkB;AAClB,kBAAkB;AAClB,kBAAkB;AAClB,iBAAiB;AACjB,iBAAiB;AACjB,iBAAiB;AACjB,iBAAiB;AACjB,mBAAmB;AACnB,mBAAmB;AACnB,mBAAmB;AACnB,kBAAkB;AAClB,sBAAsB;AACtB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,yBAAyB;AACzB,gCAAgC;AAChC,gCAAgC;AAChC,4BAA4B;AAC5B,4BAA4B;AAC5B,yBAAyB;AACzB,4BAA4B;AAC5B,8BAA8B;AAC9B,gCAAgC;AAChC,kCAAkC;AAClC;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,mBAAmB;CACnB,mBAAmB;CACnB,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,gBAAgB;CAChB,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,kBAAkB;CAClB,mBAAmB;CACnB,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,mBAAmB;CACnB,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,sBAAsB;CACtB,mBAAmB;CACnB,uBAAuB;AACxB;AACA;CACC,sBAAsB;CACtB,mBAAmB;CACnB,wBAAwB;AACzB;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;CACnB,aAAa;AACd;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;CACnB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,eAAe;EACd,cAAc;AAChB;AACA;CACC,aAAa;CACb,mBAAmB;CACnB,+BAA+B;AAChC;AACA;CACC,uBAAuB;CACvB,mBAAmB;AACpB;AACA;CACC,mBAAmB;CACnB,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,mBAAmB;CACnB,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,mBAAmB;CACnB,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,mBAAmB;CACnB,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,mBAAmB;CACnB,aAAa;CACb,gBAAgB;AACjB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,WAAW;CACX,aAAa;AACd","sourcesContent":["@samprimary1: #ff0000;\n/*red*/\n@samprimary2: #0040ff;\n/*blue*/\n@samprimary3: #33cc33;\n/*green*/\n@samprimary4: #cc6600;\n/*brown*/\n@samprimary5: #ffbb33;\n/*yellow*/\n@samprimary6: #A65395;\n@samprimary7: #9BE1FF;\n@samprimary8: #42CCC8;\n@samprimary9: #B0D450;\n@samprimary10: #895600;\n@samprimary11: #6A6D70;\n@samblue1: #3333cc;\n@samblue2: #7070db;\n@samblue3: #adadeb;\n@samblue4: #91C8F6;\n@samred1: #ff0000;\n@samred2: #ff3333;\n@samred3: #ff6666;\n@samred4: #D9364C;\n@samgreen1: #339966;\n@samgreen2: #39ac63;\n@samgreen3: #79d2a6;\n@samblack: #000000;\n@samgridblack: #32363A;\n@sambackground1: #ffe6e6;\n@sambackground2: #e6f0ff;\n@sambackground3: #ffd9cc;\n@sambackground4: #cce0ff;\n@sambackground5: #ffc6b3;\n@sambackground6: #b3d1ff;\n@sambackground7: #ffb399;\n@sambackground8: #80b3ff;\n@sambackground9: #ff9f80;\n@sambackground10: #66a3ff;\n@samBackgroundLightGrey: #f2f2f2;\n@samBackgroundLightGrey: #f2f2f2;\n@samBackgroundWhite: #ffffff;\n@samFootnotePrimary: #76767B;\n@samCaptionBlack: #3F3A3A;\n@samHighPriorityiOS: #FF453A;\n@samMediumPriorityiOS: #FF9F0A;\n@samHighPriorityAndroid: #FFBBBB;\n@samMediumPriorityAndroid: #FCD295;\nFormCellLabelCritical {\n\tfont-color: #ff0000;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\nFormCellLabelStandard {\n\tfont-color: #0040ff;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\nFormCellValueCritical {\n\tfont-color: #B0D450;\n\tfont-name: boldSystem;\n\tfont-size: 16;\n}\nFormCellValueStandard {\n\tfont-color: #895600;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\nFormCellLabelPropertyStandard {\n\tfont-color: #ff0000;\n\tfont-name: italicSystem;\n\tfont-size: 14;\n}\nFormCellLabelPropertyCritical {\n\tfont-color: #3333cc;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\nFormCellValuePropertyStandard {\n\tfont-color: #ff3333;\n\tfont-name: italicSystem;\n\tfont-size: 12;\n}\nFormCellValuePropertyCritical {\n\tfont-color: #7070db;\n\tfont-name: boldSystem;\n\tfont-size: 12;\n}\nFormCellLabelPickerStandard {\n\tfont-color: #ff0000;\n\tfont-name: italicSystem;\n\tfont-size: 14;\n}\nFormCellLabelPickerCritical {\n\tfont-color: #3333cc;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\nFormCellValuePickerStandard {\n\tfont-color: #ff3333;\n\tfont-name: italicSystem;\n\tfont-size: 12;\n}\nFormCellValuePickerCritical {\n\tfont-color: #7070db;\n\tfont-name: boldSystem;\n\tfont-size: 12;\n}\nFormCellBackgroundCritical {\n\tbackground-color: #ffe6e6;\n\ttint-color: #ffd9cc;\n\tfont-color: #33cc33;\n\tfont-name: italicSystem;\n\tfont-size: 14;\n}\nFormCellBackgroundStandard {\n\tbackground-color: #e6f0ff;\n\ttint-color: blue;\n\tfont-color: #cc6600;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\nFormCellBackgroundCriticalTitle {\n\tbackground-color: #339966;\n\ttint-color: purple;\n\tfont-color: #33cc33;\n\tfont-name: italicSystem;\n\tfont-size: 12;\n}\nFormCellBackgroundStandardTitle {\n\tbackground-color: #79d2a6;\n\ttint-color: #339966;\n\tfont-color: #cc6600;\n\tfont-name: thinSystem;\n\tfont-size: 10;\n}\nFormCellSwitchStandard {\n\ton-tint-color: #adadeb;\n\ttint-color: #80b3ff;\n\tthumb-tint-color: brown;\n}\nFormCellSwitchCritical {\n\ton-tint-color: #ff6666;\n\ttint-color: #ffb399;\n\tthumb-tint-color: yellow;\n}\nFormCellNoteTextCritical {\n\tfont-color: #ff6666;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\nFormCellNoteTextStandard {\n\tfont-color: #adadeb;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\nFormCellTitleTextCritical {\n\tfont-color: #ff3333;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\nFormCellTitleTextStandard {\n\tfont-color: #7070db;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\nFormCellBackgroundNotEditable {\n\tbackground-color: #161616;\n}\nFormCellBackgroundEditable {\n\tbackground-color: #ffffff;\n}\nObjectCellStyleBlack {\n\tfont-color: #000000;\n}\nObjectCellStyleRed {\n\tfont-color: #D9364C;\n}\nFootnotePrimary {\n\tfont-color: #76767B;\n}\nIosHighPriorityRed {\n\tfont-color: #FF453A;\n}\nIosMediumPriorityOrange {\n\tfont-color: #FF9F0A;\n}\nAndroidHighPriorityRed {\n\tfont-color: #FFBBBB;\n}\nAndroidMediumPriorityOrange {\n\tfont-color: #FCD295;\n}\nResetRed {\n\tfont-color: #D9364C;\n}\nFormCellButton {\n\tfont-color: #91C8F6;\n}\nFormCellReadOnlyEntry {\n\tfont-color: #76767B;\n}\nGrayText {\n\tfont-color: #76767B;\n}\nFormCellTextEntry {\n\tfont-color: #3F3A3A;\n}\nGridTableTextBlack {\n\tfont-color: #ffffff;\n}\nGridTableTextBlackLarge {\n\tfont-color: #ffffff;\n\tfont-size: 16;\n}\nGridTableHeaderText {\n\tfont-color: #ffffff;\n}\nGridTableRowText {\n\tfont-color: #ffffff;\n\tfont-size: 14;\n}\nObjectHeaderKPITintColor {\n\ttint-color: #0A84FF;\n\t/*for KPIView */\n  color: #0A84FF;\n}\nObjectHeaderKPICaption {\n\tfont-size: 30;\n\tfont-color: #0A84FF;\n\tfont-style: UIFontTextStyleBody;\n}\nObjectHeaderBackground {\n\tbackground-color: white;\n\tfont-color: #000000;\n}\nWorkOrderFilterPage_ToolBar {\n\tfont-color: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\nWorkOrderFilterPage {\n\tanchorcolor: #445E75;\n}\nNotificationFilterPage_ToolBar {\n\tfont-color: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\nNotificationFilterPage {\n\tanchorcolor: #445E75;\n}\nEquipmentFilterPage_ToolBar {\n\tfont-color: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\nEquipmentFilterPage {\n\tanchorcolor: #445E75;\n}\nFunctionalLocationFilterPage_ToolBar {\n\tfont-color: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\nFunctionalLocationFilterPage {\n\tanchorcolor: #445E75;\n}\nTitle {\n\tfont-color: #4A4A4A;\n\tfont-size: 17;\n\tfont-weight: 600;\n}\nWorkOrderDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nMeasuringPointDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nNotificationDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nNotificationItemTaskDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nNotificationTaskDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nWorkOrderOperationDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nSubOperationDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nSerialNumberStatusText {\n\tpadding: 14;\n\tfont-size: 16;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Styles/Styles.less":
/*!***************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Styles/Styles.less ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
FioriDesignLanguage.nss

Copyright © 2016 - 2017 SAP SE or an SAP affiliate company. All rights reserved.
No part of this publication may be reproduced or transmitted in any form or for any purpose
without the express permission of SAP SE. The information contained herein may be changed
without prior notice.

*/

@samprimary1:              #ff0000; /*red*/
@samprimary2:              #0040ff; /*blue*/
@samprimary3:              #33cc33; /*green*/
@samprimary4:              #cc6600; /*brown*/
@samprimary5:              #ffbb33; /*yellow*/
@samprimary6:              #A65395;
@samprimary7:              #9BE1FF;
@samprimary8:              #42CCC8;
@samprimary9:              #B0D450;
@samprimary10:       		   #895600;
@samprimary11:             #6A6D70;

@samblue1:                      #3333cc;
@samblue2:                      #7070db;
@samblue3:                      #adadeb;
@samblue4:                      #0A6ED1;

@samred1:  	           	#ff0000;
@samred2:  	           	#ff3333;
@samred3:  	           	#ff6666;
@samred4:  	           	#D9364C;

@samgreen1:				#339966;
@samgreen2:				#39ac63;
@samgreen3:				#79d2a6;

@samblack:                 #000000;
@samgridblack:             #32363A;

@sambackground1:			#ffe6e6;
@sambackground2:			#e6f0ff;
@sambackground3:			#ffd9cc;
@sambackground4:			#cce0ff;
@sambackground5:			#ffc6b3;
@sambackground6:			#b3d1ff;
@sambackground7:			#ffb399;
@sambackground8:			#80b3ff;
@sambackground9:			#ff9f80;
@sambackground10:		#66a3ff;

@samBackgroundLightGrey: #f2f2f2;
@samBackgroundLightGrey: #f2f2f2;
@samBackgroundWhite: #ffffff;

@samFootnotePrimary: #76767B;
@samCaptionBlack: #3F3A3A;
@samHighPriority: #BB0000;
@samMediumPriority: #E9730C;


.ObjectTableRed{
    color: @samred1;
  }


.ObjectTableBlue{
    color: @samblue1;
  }


.ObjectTableGreen{
    color: @samgreen1;
  }
  



.FormCellLabelCritical {
  color: @samprimary1;
  font-name: boldSystem;
  font-size: 14;
}

.FormCellLabelStandard {
  color: @samprimary2;
  font-name: thinSystem;
  font-size: 12;
}

.FormCellValueCritical {
  color: @samprimary9;
  font-name: boldSystem;
  font-size: 16;
}

.FormCellValueStandard {
  color: @samprimary10;
  font-name: thinSystem;
  font-size: 12;
}

.FormCellLabelPropertyStandard {
  color: @samred1;
  font-name: italicSystem;
  font-size: 14;
}

.FormCellLabelPropertyCritical {
  color: @samblue1;
  font-name: boldSystem;
  font-size: 14;
}

.FormCellValuePropertyStandard {
  color: @samred2;
  font-name: italicSystem;
  font-size: 12;
}

.FormCellValuePropertyCritical {
  color: @samblue2;
  font-name: boldSystem;
  font-size: 12;
}

.FormCellLabelPickerStandard {
  color: @samred1;
  font-name: italicSystem;
  font-size: 14;
}

.FormCellLabelPickerCritical {
  color: @samblue1;
  font-name: boldSystem;
  font-size: 14;
}

.FormCellValuePickerStandard {
  color: @samred2;
  font-name: italicSystem;
  font-size: 12;
}

.FormCellValuePickerCritical {
  color: @samblue2;
  font-name: boldSystem;
  font-size: 12;
}

.FormCellBackgroundCritical {
	background-color: @sambackground1;
	tint-color: @sambackground3;
	color: @samprimary3;
	font-name: italicSystem;
  font-size: 14;
}

.FormCellBackgroundStandard {
	background-color: @sambackground2;
	tint-color: blue;
	color: @samprimary4;
	font-name: thinSystem;
  font-size: 12;
}

.FormCellBackgroundCriticalTitle {
	background-color: @samgreen1;
	tint-color: purple;
	color: @samprimary3;
	font-name: italicSystem;
  font-size: 12;
}

.FormCellBackgroundStandardTitle {
	background-color: @samgreen3;
	tint-color: @samgreen1;
	color: @samprimary4;
	font-name: thinSystem;
  font-size: 10;
}

.FormCellSwitchStandard {
	on-tint-color: @samblue3;
	tint-color: @sambackground8;
	thumb-tint-color: brown;
}

.FormCellSwitchCritical {
  on-tint-color: @samred3;
  tint-color: @sambackground7;
  thumb-tint-color: yellow;
}

.FormCellNoteTextCritical {
	color: @samred3;
  	font-name: boldSystem;
  	font-size: 14;
}

.FormCellNoteTextStandard {
	color: @samblue3;
  	font-name: thinSystem;
  	font-size: 12;
}

.FormCellTitleTextCritical {
	color: @samred2;
  	font-name: boldSystem;
  	font-size: 14;
}

.FormCellTitleTextStandard {
	color: @samblue2;
  	font-name: thinSystem;
  	font-size: 12;
}

.FormCellBackgroundNotEditable {
    background-color: @samBackgroundWhite;
}

.FormCellBackgroundEditable {
    background-color: @samBackgroundWhite;
}

.ObjectCellStyleBlack {
    color: @samblack;
}
.ObjectCellStyleRed {
  font-color: @samred4;
}
.FootnotePrimary {
    color: @samFootnotePrimary;
}

.IosHighPriorityRed {
  color: @samHighPriority;
}

.IosMediumPriorityOrange {
  color: @samMediumPriority;
}

.AndroidHighPriorityRed {
  color: @samHighPriority;
}

.AndroidMediumPriorityOrange {
  color: @samMediumPriority;
}

.ResetRed {
  color: @samred4;
}

.FormCellButton {
    color: @samblue4;
}

.FormCellReadOnlyEntry {
    color: #76767B;
}

.GrayText {
    color: @samFootnotePrimary;
}

.FormCellTextEntry {
    color: #3F3A3A;
}

.GridTableTextBlack {
    color: @samgridblack;
}

.GridTableTextBlackLarge {
    color: @samgridblack;
    font-size: 16;
}

.GridTableHeaderText {
    color: #6A6D70;
}

.GridTableRowText {
    color: #393E42;
    font-size: 14;
}

.ObjectHeaderKPITintColor {
  tint-color: #0070F2;  /*for KPIView */
  color: #0070F2;  /*for KPIProgressView */
}

/* For Styling of Object Header KPI Caption Label */
.ObjectHeaderKPICaption {
  font-size: 30;
  color: #0070F2;
  font-style: UIFontTextStyleBody;
}

.ObjectHeaderBackground {
  background-color: white;
  color: @samblack;
}

/* Work Order Filter Page */
.WorkOrderFilterPage_ToolBar {
  color: #3678AF;
  font-size: 17;
  bartintcolor: #F2F2F2;
  border-top-color: #F2F2F2;
  border-width: 1;
}
.WorkOrderFilterPage {
  anchorcolor: #445E75;
}

/* Notificaiton Filter Page */
.NotificationFilterPage_ToolBar {
  color: #3678AF;
  font-size: 17;
  bartintcolor: #F2F2F2;
  border-top-color: #F2F2F2;
  border-width: 1;
}
.NotificationFilterPage {
  anchorcolor: #445E75;
}
/* Asset Filter Page */
.EquipmentFilterPage_ToolBar {
  color: #3678AF;
  font-size: 17;
  bartintcolor: #F2F2F2;
  border-top-color: #F2F2F2;
  border-width: 1;
}
.EquipmentFilterPage {
  anchorcolor: #445E75;
}
/* Functional Location Filter Page */
.FunctionalLocationFilterPage_ToolBar {
  color: #3678AF;
  font-size: 17;
  bartintcolor: #F2F2F2;
  border-top-color: #F2F2F2;
  border-width: 1;
}
.FunctionalLocationFilterPage {
  anchorcolor: #445E75;
}

/* Title of all the Filter toolbar */
.Title {
  color: #4A4A4A;
  font-size: 17;
  font-weight: 600;
}

/* Styling of the toolbar statues */
.WorkOrderDetailsPage_ToolBar {
  color: #3678AF;
  bartintcolor: #F8F8F8;
}

.MeasuringPointDetailsPage_ToolBar {
  color: #3678AF;
  bartintcolor: #F8F8F8;
}

.NotificationDetailsPage_ToolBar {
  color: #3678AF;
  bartintcolor: #F8F8F8;
}

.NotificationItemTaskDetailsPage_ToolBar {
  color: #3678AF;
  bartintcolor: #F8F8F8;
}

.NotificationTaskDetailsPage_ToolBar {
  color: #3678AF;
  bartintcolor: #F8F8F8;
}

.WorkOrderOperationDetailsPage_ToolBar {
  color: #3678AF;
  bartintcolor: #F8F8F8;
}

.SubOperationDetailsPage_ToolBar {
  color: #3678AF;
  bartintcolor: #F8F8F8;
}

/* SideDrawerStyles */
.SideDrawerBackground {
  background-color: white;
}
.SideDrawerHeaderBackground {
  background-color: white;
}
.SideDrawerHeaderIcon {
  font-size: 16;
  color: #FF0000;
  background-color: #000000;
}
.SideDrawerHeadline {
  color: black;
}
.SideDrawerSubHeadline {
  font-style: italic;
}
.SideDrawerHeaderSeparator {
  border-bottom-color: @samBackgroundLightGrey;
  border-bottom-width: 30;
}
.SideDrawerHeaderSeparatorAndroid {
  border-bottom-color: @samBackgroundLightGrey;
  border-bottom-width: 1;
}
.SideDrawerSectionCaption {
  background-color: #192325;
  color:black;
  text-align: left;
}
.SideDrawerSectionSeparator {
  border-bottom-color: @samBackgroundLightGrey;
  border-bottom-width: 30;
}
.SideDrawerSectionSeparatorAndroid {
  border-bottom-color: @samBackgroundLightGrey;
  border-bottom-width: 1;
}
.SideDrawerItemActive {
  background-color: white;
  color: black;
  text-align:left;
}
.SideDrawerItemInactive {
  color: black;
  text-align:left;
}
.SideDrawerItemOnPress {
  background-color: white;
  color: black;
  text-align:left;
}
.SideDrawerHeaderIconText {
  font-size: 16;
  color: #FF0000;
}
.SideDrawerHeaderIconBackground {
  background-color: #000000;
}
.SectionCaption{
  background-color: #adadeb;
  color: red;
  text-align:left;
}
.SectionSeparator{
  border-bottom-color: @samBackgroundLightGrey;
  border-bottom-width: 7;
}
.SectionItemActive {
  border-bottom-color: #E8E8ED;
  border-bottom-width: 1;
}
.SectionItemInactive {
  border-bottom-color: #E8E8ED;
  border-bottom-width: 1;
}
.SectionItemOnPress {
  border-bottom-color: #E8E8ED;
  border-bottom-width: 1;
}

.SerialNumberStatusText {
  padding: 14;
  font-size: 16;
}

.ContextMenuGreen {
    background-color: @samgreen3;
    color: white;
}

.RejectedRed {
  color: #BB0000;
  font-size: 12;
}

.AcceptedGreen {
  color: #107E3E;
}

.Color_2A6D3C {
  color: #3A835B;
}

.Color_0000 {
  color: #000000;
}

.Color_DE890D {	
  color: #FFA325;
}

.Color_930A0A {	
  color: #D9364C;
}

.Color_AFD149 {	
  color: #3A835B;	
}
@zsamgreen1:				#6FAB28;
@zsamOrange:				#F7BF04;

.ZCardTittleGreen{
  color: @zsamgreen1;
}

.ZCardTittleOrange{
  color: @zsamOrange
}

.ZCardTittleBlack{
  color: @samblack
}
`, "",{"version":3,"sources":["webpack://./build.definitions/FrieghtAppDetail/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;CAQC;;AAED,kCAAkC,EAAE,MAAM;AAC1C,kCAAkC,EAAE,OAAO;AAC3C,kCAAkC,EAAE,QAAQ;AAC5C,kCAAkC,EAAE,QAAQ;AAC5C,kCAAkC,EAAE,SAAS;AAC7C,kCAAkC;AAClC,kCAAkC;AAClC,kCAAkC;AAClC,kCAAkC;AAClC,iCAAiC;AACjC,kCAAkC;;AAElC,uCAAuC;AACvC,uCAAuC;AACvC,uCAAuC;AACvC,uCAAuC;;AAEvC,+BAA+B;AAC/B,+BAA+B;AAC/B,+BAA+B;AAC/B,+BAA+B;;AAE/B,sBAAsB;AACtB,sBAAsB;AACtB,sBAAsB;;AAEtB,kCAAkC;AAClC,kCAAkC;;AAElC,0BAA0B;AAC1B,0BAA0B;AAC1B,0BAA0B;AAC1B,0BAA0B;AAC1B,0BAA0B;AAC1B,0BAA0B;AAC1B,0BAA0B;AAC1B,0BAA0B;AAC1B,0BAA0B;AAC1B,0BAA0B;;AAE1B,gCAAgC;AAChC,gCAAgC;AAChC,4BAA4B;;AAE5B,4BAA4B;AAC5B,yBAAyB;AACzB,yBAAyB;AACzB,2BAA2B;;;AAG3B;IACI,eAAe;EACjB;;;AAGF;IACI,gBAAgB;EAClB;;;AAGF;IACI,iBAAiB;EACnB;;;;;AAKF;EACE,mBAAmB;EACnB,qBAAqB;EACrB,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,aAAa;AACf;;AAEA;EACE,oBAAoB;EACpB,qBAAqB;EACrB,aAAa;AACf;;AAEA;EACE,eAAe;EACf,uBAAuB;EACvB,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,qBAAqB;EACrB,aAAa;AACf;;AAEA;EACE,eAAe;EACf,uBAAuB;EACvB,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,qBAAqB;EACrB,aAAa;AACf;;AAEA;EACE,eAAe;EACf,uBAAuB;EACvB,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,qBAAqB;EACrB,aAAa;AACf;;AAEA;EACE,eAAe;EACf,uBAAuB;EACvB,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,qBAAqB;EACrB,aAAa;AACf;;AAEA;CACC,iCAAiC;CACjC,2BAA2B;CAC3B,mBAAmB;CACnB,uBAAuB;EACtB,aAAa;AACf;;AAEA;CACC,iCAAiC;CACjC,gBAAgB;CAChB,mBAAmB;CACnB,qBAAqB;EACpB,aAAa;AACf;;AAEA;CACC,4BAA4B;CAC5B,kBAAkB;CAClB,mBAAmB;CACnB,uBAAuB;EACtB,aAAa;AACf;;AAEA;CACC,4BAA4B;CAC5B,sBAAsB;CACtB,mBAAmB;CACnB,qBAAqB;EACpB,aAAa;AACf;;AAEA;CACC,wBAAwB;CACxB,2BAA2B;CAC3B,uBAAuB;AACxB;;AAEA;EACE,uBAAuB;EACvB,2BAA2B;EAC3B,wBAAwB;AAC1B;;AAEA;CACC,eAAe;GACb,qBAAqB;GACrB,aAAa;AAChB;;AAEA;CACC,gBAAgB;GACd,qBAAqB;GACrB,aAAa;AAChB;;AAEA;CACC,eAAe;GACb,qBAAqB;GACrB,aAAa;AAChB;;AAEA;CACC,gBAAgB;GACd,qBAAqB;GACrB,aAAa;AAChB;;AAEA;IACI,qCAAqC;AACzC;;AAEA;IACI,qCAAqC;AACzC;;AAEA;IACI,gBAAgB;AACpB;AACA;EACE,oBAAoB;AACtB;AACA;IACI,0BAA0B;AAC9B;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,eAAe;AACjB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,oBAAoB;AACxB;;AAEA;IACI,oBAAoB;IACpB,aAAa;AACjB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,cAAc;IACd,aAAa;AACjB;;AAEA;EACE,mBAAmB,GAAG,eAAe;EACrC,cAAc,GAAG,uBAAuB;AAC1C;;AAEA,mDAAmD;AACnD;EACE,aAAa;EACb,cAAc;EACd,+BAA+B;AACjC;;AAEA;EACE,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA,2BAA2B;AAC3B;EACE,cAAc;EACd,aAAa;EACb,qBAAqB;EACrB,yBAAyB;EACzB,eAAe;AACjB;AACA;EACE,oBAAoB;AACtB;;AAEA,6BAA6B;AAC7B;EACE,cAAc;EACd,aAAa;EACb,qBAAqB;EACrB,yBAAyB;EACzB,eAAe;AACjB;AACA;EACE,oBAAoB;AACtB;AACA,sBAAsB;AACtB;EACE,cAAc;EACd,aAAa;EACb,qBAAqB;EACrB,yBAAyB;EACzB,eAAe;AACjB;AACA;EACE,oBAAoB;AACtB;AACA,oCAAoC;AACpC;EACE,cAAc;EACd,aAAa;EACb,qBAAqB;EACrB,yBAAyB;EACzB,eAAe;AACjB;AACA;EACE,oBAAoB;AACtB;;AAEA,oCAAoC;AACpC;EACE,cAAc;EACd,aAAa;EACb,gBAAgB;AAClB;;AAEA,mCAAmC;AACnC;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA,qBAAqB;AACrB;EACE,uBAAuB;AACzB;AACA;EACE,uBAAuB;AACzB;AACA;EACE,aAAa;EACb,cAAc;EACd,yBAAyB;AAC3B;AACA;EACE,YAAY;AACd;AACA;EACE,kBAAkB;AACpB;AACA;EACE,4CAA4C;EAC5C,uBAAuB;AACzB;AACA;EACE,4CAA4C;EAC5C,sBAAsB;AACxB;AACA;EACE,yBAAyB;EACzB,WAAW;EACX,gBAAgB;AAClB;AACA;EACE,4CAA4C;EAC5C,uBAAuB;AACzB;AACA;EACE,4CAA4C;EAC5C,sBAAsB;AACxB;AACA;EACE,uBAAuB;EACvB,YAAY;EACZ,eAAe;AACjB;AACA;EACE,YAAY;EACZ,eAAe;AACjB;AACA;EACE,uBAAuB;EACvB,YAAY;EACZ,eAAe;AACjB;AACA;EACE,aAAa;EACb,cAAc;AAChB;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,yBAAyB;EACzB,UAAU;EACV,eAAe;AACjB;AACA;EACE,4CAA4C;EAC5C,sBAAsB;AACxB;AACA;EACE,4BAA4B;EAC5B,sBAAsB;AACxB;AACA;EACE,4BAA4B;EAC5B,sBAAsB;AACxB;AACA;EACE,4BAA4B;EAC5B,sBAAsB;AACxB;;AAEA;EACE,WAAW;EACX,aAAa;AACf;;AAEA;IACI,4BAA4B;IAC5B,YAAY;AAChB;;AAEA;EACE,cAAc;EACd,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;AACA,uBAAuB;AACvB,uBAAuB;;AAEvB;EACE,kBAAkB;AACpB;;AAEA;EACE;AACF;;AAEA;EACE;AACF","sourcesContent":["/*\nFioriDesignLanguage.nss\n\nCopyright © 2016 - 2017 SAP SE or an SAP affiliate company. All rights reserved.\nNo part of this publication may be reproduced or transmitted in any form or for any purpose\nwithout the express permission of SAP SE. The information contained herein may be changed\nwithout prior notice.\n\n*/\n\n@samprimary1:              #ff0000; /*red*/\n@samprimary2:              #0040ff; /*blue*/\n@samprimary3:              #33cc33; /*green*/\n@samprimary4:              #cc6600; /*brown*/\n@samprimary5:              #ffbb33; /*yellow*/\n@samprimary6:              #A65395;\n@samprimary7:              #9BE1FF;\n@samprimary8:              #42CCC8;\n@samprimary9:              #B0D450;\n@samprimary10:       \t\t   #895600;\n@samprimary11:             #6A6D70;\n\n@samblue1:                      #3333cc;\n@samblue2:                      #7070db;\n@samblue3:                      #adadeb;\n@samblue4:                      #0A6ED1;\n\n@samred1:  \t           \t#ff0000;\n@samred2:  \t           \t#ff3333;\n@samred3:  \t           \t#ff6666;\n@samred4:  \t           \t#D9364C;\n\n@samgreen1:\t\t\t\t#339966;\n@samgreen2:\t\t\t\t#39ac63;\n@samgreen3:\t\t\t\t#79d2a6;\n\n@samblack:                 #000000;\n@samgridblack:             #32363A;\n\n@sambackground1:\t\t\t#ffe6e6;\n@sambackground2:\t\t\t#e6f0ff;\n@sambackground3:\t\t\t#ffd9cc;\n@sambackground4:\t\t\t#cce0ff;\n@sambackground5:\t\t\t#ffc6b3;\n@sambackground6:\t\t\t#b3d1ff;\n@sambackground7:\t\t\t#ffb399;\n@sambackground8:\t\t\t#80b3ff;\n@sambackground9:\t\t\t#ff9f80;\n@sambackground10:\t\t#66a3ff;\n\n@samBackgroundLightGrey: #f2f2f2;\n@samBackgroundLightGrey: #f2f2f2;\n@samBackgroundWhite: #ffffff;\n\n@samFootnotePrimary: #76767B;\n@samCaptionBlack: #3F3A3A;\n@samHighPriority: #BB0000;\n@samMediumPriority: #E9730C;\n\n\n.ObjectTableRed{\n    color: @samred1;\n  }\n\n\n.ObjectTableBlue{\n    color: @samblue1;\n  }\n\n\n.ObjectTableGreen{\n    color: @samgreen1;\n  }\n  \n\n\n\n.FormCellLabelCritical {\n  color: @samprimary1;\n  font-name: boldSystem;\n  font-size: 14;\n}\n\n.FormCellLabelStandard {\n  color: @samprimary2;\n  font-name: thinSystem;\n  font-size: 12;\n}\n\n.FormCellValueCritical {\n  color: @samprimary9;\n  font-name: boldSystem;\n  font-size: 16;\n}\n\n.FormCellValueStandard {\n  color: @samprimary10;\n  font-name: thinSystem;\n  font-size: 12;\n}\n\n.FormCellLabelPropertyStandard {\n  color: @samred1;\n  font-name: italicSystem;\n  font-size: 14;\n}\n\n.FormCellLabelPropertyCritical {\n  color: @samblue1;\n  font-name: boldSystem;\n  font-size: 14;\n}\n\n.FormCellValuePropertyStandard {\n  color: @samred2;\n  font-name: italicSystem;\n  font-size: 12;\n}\n\n.FormCellValuePropertyCritical {\n  color: @samblue2;\n  font-name: boldSystem;\n  font-size: 12;\n}\n\n.FormCellLabelPickerStandard {\n  color: @samred1;\n  font-name: italicSystem;\n  font-size: 14;\n}\n\n.FormCellLabelPickerCritical {\n  color: @samblue1;\n  font-name: boldSystem;\n  font-size: 14;\n}\n\n.FormCellValuePickerStandard {\n  color: @samred2;\n  font-name: italicSystem;\n  font-size: 12;\n}\n\n.FormCellValuePickerCritical {\n  color: @samblue2;\n  font-name: boldSystem;\n  font-size: 12;\n}\n\n.FormCellBackgroundCritical {\n\tbackground-color: @sambackground1;\n\ttint-color: @sambackground3;\n\tcolor: @samprimary3;\n\tfont-name: italicSystem;\n  font-size: 14;\n}\n\n.FormCellBackgroundStandard {\n\tbackground-color: @sambackground2;\n\ttint-color: blue;\n\tcolor: @samprimary4;\n\tfont-name: thinSystem;\n  font-size: 12;\n}\n\n.FormCellBackgroundCriticalTitle {\n\tbackground-color: @samgreen1;\n\ttint-color: purple;\n\tcolor: @samprimary3;\n\tfont-name: italicSystem;\n  font-size: 12;\n}\n\n.FormCellBackgroundStandardTitle {\n\tbackground-color: @samgreen3;\n\ttint-color: @samgreen1;\n\tcolor: @samprimary4;\n\tfont-name: thinSystem;\n  font-size: 10;\n}\n\n.FormCellSwitchStandard {\n\ton-tint-color: @samblue3;\n\ttint-color: @sambackground8;\n\tthumb-tint-color: brown;\n}\n\n.FormCellSwitchCritical {\n  on-tint-color: @samred3;\n  tint-color: @sambackground7;\n  thumb-tint-color: yellow;\n}\n\n.FormCellNoteTextCritical {\n\tcolor: @samred3;\n  \tfont-name: boldSystem;\n  \tfont-size: 14;\n}\n\n.FormCellNoteTextStandard {\n\tcolor: @samblue3;\n  \tfont-name: thinSystem;\n  \tfont-size: 12;\n}\n\n.FormCellTitleTextCritical {\n\tcolor: @samred2;\n  \tfont-name: boldSystem;\n  \tfont-size: 14;\n}\n\n.FormCellTitleTextStandard {\n\tcolor: @samblue2;\n  \tfont-name: thinSystem;\n  \tfont-size: 12;\n}\n\n.FormCellBackgroundNotEditable {\n    background-color: @samBackgroundWhite;\n}\n\n.FormCellBackgroundEditable {\n    background-color: @samBackgroundWhite;\n}\n\n.ObjectCellStyleBlack {\n    color: @samblack;\n}\n.ObjectCellStyleRed {\n  font-color: @samred4;\n}\n.FootnotePrimary {\n    color: @samFootnotePrimary;\n}\n\n.IosHighPriorityRed {\n  color: @samHighPriority;\n}\n\n.IosMediumPriorityOrange {\n  color: @samMediumPriority;\n}\n\n.AndroidHighPriorityRed {\n  color: @samHighPriority;\n}\n\n.AndroidMediumPriorityOrange {\n  color: @samMediumPriority;\n}\n\n.ResetRed {\n  color: @samred4;\n}\n\n.FormCellButton {\n    color: @samblue4;\n}\n\n.FormCellReadOnlyEntry {\n    color: #76767B;\n}\n\n.GrayText {\n    color: @samFootnotePrimary;\n}\n\n.FormCellTextEntry {\n    color: #3F3A3A;\n}\n\n.GridTableTextBlack {\n    color: @samgridblack;\n}\n\n.GridTableTextBlackLarge {\n    color: @samgridblack;\n    font-size: 16;\n}\n\n.GridTableHeaderText {\n    color: #6A6D70;\n}\n\n.GridTableRowText {\n    color: #393E42;\n    font-size: 14;\n}\n\n.ObjectHeaderKPITintColor {\n  tint-color: #0070F2;  /*for KPIView */\n  color: #0070F2;  /*for KPIProgressView */\n}\n\n/* For Styling of Object Header KPI Caption Label */\n.ObjectHeaderKPICaption {\n  font-size: 30;\n  color: #0070F2;\n  font-style: UIFontTextStyleBody;\n}\n\n.ObjectHeaderBackground {\n  background-color: white;\n  color: @samblack;\n}\n\n/* Work Order Filter Page */\n.WorkOrderFilterPage_ToolBar {\n  color: #3678AF;\n  font-size: 17;\n  bartintcolor: #F2F2F2;\n  border-top-color: #F2F2F2;\n  border-width: 1;\n}\n.WorkOrderFilterPage {\n  anchorcolor: #445E75;\n}\n\n/* Notificaiton Filter Page */\n.NotificationFilterPage_ToolBar {\n  color: #3678AF;\n  font-size: 17;\n  bartintcolor: #F2F2F2;\n  border-top-color: #F2F2F2;\n  border-width: 1;\n}\n.NotificationFilterPage {\n  anchorcolor: #445E75;\n}\n/* Asset Filter Page */\n.EquipmentFilterPage_ToolBar {\n  color: #3678AF;\n  font-size: 17;\n  bartintcolor: #F2F2F2;\n  border-top-color: #F2F2F2;\n  border-width: 1;\n}\n.EquipmentFilterPage {\n  anchorcolor: #445E75;\n}\n/* Functional Location Filter Page */\n.FunctionalLocationFilterPage_ToolBar {\n  color: #3678AF;\n  font-size: 17;\n  bartintcolor: #F2F2F2;\n  border-top-color: #F2F2F2;\n  border-width: 1;\n}\n.FunctionalLocationFilterPage {\n  anchorcolor: #445E75;\n}\n\n/* Title of all the Filter toolbar */\n.Title {\n  color: #4A4A4A;\n  font-size: 17;\n  font-weight: 600;\n}\n\n/* Styling of the toolbar statues */\n.WorkOrderDetailsPage_ToolBar {\n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n}\n\n.MeasuringPointDetailsPage_ToolBar {\n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n}\n\n.NotificationDetailsPage_ToolBar {\n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n}\n\n.NotificationItemTaskDetailsPage_ToolBar {\n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n}\n\n.NotificationTaskDetailsPage_ToolBar {\n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n}\n\n.WorkOrderOperationDetailsPage_ToolBar {\n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n}\n\n.SubOperationDetailsPage_ToolBar {\n  color: #3678AF;\n  bartintcolor: #F8F8F8;\n}\n\n/* SideDrawerStyles */\n.SideDrawerBackground {\n  background-color: white;\n}\n.SideDrawerHeaderBackground {\n  background-color: white;\n}\n.SideDrawerHeaderIcon {\n  font-size: 16;\n  color: #FF0000;\n  background-color: #000000;\n}\n.SideDrawerHeadline {\n  color: black;\n}\n.SideDrawerSubHeadline {\n  font-style: italic;\n}\n.SideDrawerHeaderSeparator {\n  border-bottom-color: @samBackgroundLightGrey;\n  border-bottom-width: 30;\n}\n.SideDrawerHeaderSeparatorAndroid {\n  border-bottom-color: @samBackgroundLightGrey;\n  border-bottom-width: 1;\n}\n.SideDrawerSectionCaption {\n  background-color: #192325;\n  color:black;\n  text-align: left;\n}\n.SideDrawerSectionSeparator {\n  border-bottom-color: @samBackgroundLightGrey;\n  border-bottom-width: 30;\n}\n.SideDrawerSectionSeparatorAndroid {\n  border-bottom-color: @samBackgroundLightGrey;\n  border-bottom-width: 1;\n}\n.SideDrawerItemActive {\n  background-color: white;\n  color: black;\n  text-align:left;\n}\n.SideDrawerItemInactive {\n  color: black;\n  text-align:left;\n}\n.SideDrawerItemOnPress {\n  background-color: white;\n  color: black;\n  text-align:left;\n}\n.SideDrawerHeaderIconText {\n  font-size: 16;\n  color: #FF0000;\n}\n.SideDrawerHeaderIconBackground {\n  background-color: #000000;\n}\n.SectionCaption{\n  background-color: #adadeb;\n  color: red;\n  text-align:left;\n}\n.SectionSeparator{\n  border-bottom-color: @samBackgroundLightGrey;\n  border-bottom-width: 7;\n}\n.SectionItemActive {\n  border-bottom-color: #E8E8ED;\n  border-bottom-width: 1;\n}\n.SectionItemInactive {\n  border-bottom-color: #E8E8ED;\n  border-bottom-width: 1;\n}\n.SectionItemOnPress {\n  border-bottom-color: #E8E8ED;\n  border-bottom-width: 1;\n}\n\n.SerialNumberStatusText {\n  padding: 14;\n  font-size: 16;\n}\n\n.ContextMenuGreen {\n    background-color: @samgreen3;\n    color: white;\n}\n\n.RejectedRed {\n  color: #BB0000;\n  font-size: 12;\n}\n\n.AcceptedGreen {\n  color: #107E3E;\n}\n\n.Color_2A6D3C {\n  color: #3A835B;\n}\n\n.Color_0000 {\n  color: #000000;\n}\n\n.Color_DE890D {\t\n  color: #FFA325;\n}\n\n.Color_930A0A {\t\n  color: #D9364C;\n}\n\n.Color_AFD149 {\t\n  color: #3A835B;\t\n}\n@zsamgreen1:\t\t\t\t#6FAB28;\n@zsamOrange:\t\t\t\t#F7BF04;\n\n.ZCardTittleGreen{\n  color: @zsamgreen1;\n}\n\n.ZCardTittleOrange{\n  color: @zsamOrange\n}\n\n.ZCardTittleBlack{\n  color: @samblack\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Styles/Styles.nss":
/*!**************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Styles/Styles.nss ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@samprimary1: #ff0000;
/*red*/
@samprimary2: #0040ff;
/*blue*/
@samprimary3: #33cc33;
/*green*/
@samprimary4: #cc6600;
/*brown*/
@samprimary5: #ffbb33;
/*yellow*/
@samprimary6: #A65395;
@samprimary7: #9BE1FF;
@samprimary8: #42CCC8;
@samprimary9: #B0D450;
@samprimary10: #895600;
@samprimary11: #6A6D70;
@samblue1: #3333cc;
@samblue2: #7070db;
@samblue3: #adadeb;
@samblue4: #0A6ED1;
@samred1: #ff0000;
@samred2: #ff3333;
@samred3: #ff6666;
@samred4: #D9364C;
@samgreen1: #339966;
@samgreen2: #39ac63;
@samgreen3: #79d2a6;
@samblack: #000000;
@samgridblack: #32363A;
@sambackground1: #ffe6e6;
@sambackground2: #e6f0ff;
@sambackground3: #ffd9cc;
@sambackground4: #cce0ff;
@sambackground5: #ffc6b3;
@sambackground6: #b3d1ff;
@sambackground7: #ffb399;
@sambackground8: #80b3ff;
@sambackground9: #ff9f80;
@sambackground10: #66a3ff;
@samBackgroundLightGrey: #f2f2f2;
@samBackgroundLightGrey: #f2f2f2;
@samBackgroundWhite: #ffffff;
@samFootnotePrimary: #76767B;
@samCaptionBlack: #3F3A3A;
@samHighPriority: #BB0000;
@samMediumPriority: #E9730C;
@zsamgreen1: #6FAB28;
@zsamOrange: #F7BF04;
ObjectTableRed {
	font-color: #ff0000;
}
ObjectTableBlue {
	font-color: #3333cc;
}
ObjectTableGreen {
	font-color: #339966;
}
FormCellLabelCritical {
	font-color: #ff0000;
	font-name: boldSystem;
	font-size: 14;
}
FormCellLabelStandard {
	font-color: #0040ff;
	font-name: thinSystem;
	font-size: 12;
}
FormCellValueCritical {
	font-color: #B0D450;
	font-name: boldSystem;
	font-size: 16;
}
FormCellValueStandard {
	font-color: #895600;
	font-name: thinSystem;
	font-size: 12;
}
FormCellLabelPropertyStandard {
	font-color: #ff0000;
	font-name: italicSystem;
	font-size: 14;
}
FormCellLabelPropertyCritical {
	font-color: #3333cc;
	font-name: boldSystem;
	font-size: 14;
}
FormCellValuePropertyStandard {
	font-color: #ff3333;
	font-name: italicSystem;
	font-size: 12;
}
FormCellValuePropertyCritical {
	font-color: #7070db;
	font-name: boldSystem;
	font-size: 12;
}
FormCellLabelPickerStandard {
	font-color: #ff0000;
	font-name: italicSystem;
	font-size: 14;
}
FormCellLabelPickerCritical {
	font-color: #3333cc;
	font-name: boldSystem;
	font-size: 14;
}
FormCellValuePickerStandard {
	font-color: #ff3333;
	font-name: italicSystem;
	font-size: 12;
}
FormCellValuePickerCritical {
	font-color: #7070db;
	font-name: boldSystem;
	font-size: 12;
}
FormCellBackgroundCritical {
	background-color: #ffe6e6;
	tint-color: #ffd9cc;
	font-color: #33cc33;
	font-name: italicSystem;
	font-size: 14;
}
FormCellBackgroundStandard {
	background-color: #e6f0ff;
	tint-color: blue;
	font-color: #cc6600;
	font-name: thinSystem;
	font-size: 12;
}
FormCellBackgroundCriticalTitle {
	background-color: #339966;
	tint-color: purple;
	font-color: #33cc33;
	font-name: italicSystem;
	font-size: 12;
}
FormCellBackgroundStandardTitle {
	background-color: #79d2a6;
	tint-color: #339966;
	font-color: #cc6600;
	font-name: thinSystem;
	font-size: 10;
}
FormCellSwitchStandard {
	on-tint-color: #adadeb;
	tint-color: #80b3ff;
	thumb-tint-color: brown;
}
FormCellSwitchCritical {
	on-tint-color: #ff6666;
	tint-color: #ffb399;
	thumb-tint-color: yellow;
}
FormCellNoteTextCritical {
	font-color: #ff6666;
	font-name: boldSystem;
	font-size: 14;
}
FormCellNoteTextStandard {
	font-color: #adadeb;
	font-name: thinSystem;
	font-size: 12;
}
FormCellTitleTextCritical {
	font-color: #ff3333;
	font-name: boldSystem;
	font-size: 14;
}
FormCellTitleTextStandard {
	font-color: #7070db;
	font-name: thinSystem;
	font-size: 12;
}
FormCellBackgroundNotEditable {
	background-color: #ffffff;
}
FormCellBackgroundEditable {
	background-color: #ffffff;
}
ObjectCellStyleBlack {
	font-color: #000000;
}
ObjectCellStyleRed {
	font-color: #D9364C;
}
FootnotePrimary {
	font-color: #76767B;
}
IosHighPriorityRed {
	font-color: #BB0000;
}
IosMediumPriorityOrange {
	font-color: #E9730C;
}
AndroidHighPriorityRed {
	font-color: #BB0000;
}
AndroidMediumPriorityOrange {
	font-color: #E9730C;
}
ResetRed {
	font-color: #D9364C;
}
FormCellButton {
	font-color: #0A6ED1;
}
FormCellReadOnlyEntry {
	font-color: #76767B;
}
GrayText {
	font-color: #76767B;
}
FormCellTextEntry {
	font-color: #3F3A3A;
}
GridTableTextBlack {
	font-color: #32363A;
}
GridTableTextBlackLarge {
	font-color: #32363A;
	font-size: 16;
}
GridTableHeaderText {
	font-color: #6A6D70;
}
GridTableRowText {
	font-color: #393E42;
	font-size: 14;
}
ObjectHeaderKPITintColor {
	tint-color: #0070F2;
	/*for KPIView */
  color: #0070F2;
}
ObjectHeaderKPICaption {
	font-size: 30;
	font-color: #0070F2;
	font-style: UIFontTextStyleBody;
}
ObjectHeaderBackground {
	background-color: white;
	font-color: #000000;
}
WorkOrderFilterPage_ToolBar {
	font-color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
WorkOrderFilterPage {
	anchorcolor: #445E75;
}
NotificationFilterPage_ToolBar {
	font-color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
NotificationFilterPage {
	anchorcolor: #445E75;
}
EquipmentFilterPage_ToolBar {
	font-color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
EquipmentFilterPage {
	anchorcolor: #445E75;
}
FunctionalLocationFilterPage_ToolBar {
	font-color: #3678AF;
	font-size: 17;
	bartintcolor: #F2F2F2;
	border-top-color: #F2F2F2;
	border-width: 1;
}
FunctionalLocationFilterPage {
	anchorcolor: #445E75;
}
Title {
	font-color: #4A4A4A;
	font-size: 17;
	font-weight: 600;
}
WorkOrderDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
MeasuringPointDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
NotificationDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
NotificationItemTaskDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
NotificationTaskDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
WorkOrderOperationDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
SubOperationDetailsPage_ToolBar {
	font-color: #3678AF;
	bartintcolor: #F8F8F8;
}
SideDrawerBackground {
	background-color: white;
}
SideDrawerHeaderBackground {
	background-color: white;
}
SideDrawerHeaderIcon {
	font-size: 16;
	font-color: #FF0000;
	background-color: #000000;
}
SideDrawerHeadline {
	font-color: black;
}
SideDrawerSubHeadline {
	font-style: italic;
}
SideDrawerHeaderSeparator {
	border-bottom-color: #f2f2f2;
	border-bottom-width: 30;
}
SideDrawerHeaderSeparatorAndroid {
	border-bottom-color: #f2f2f2;
	border-bottom-width: 1;
}
SideDrawerSectionCaption {
	background-color: #192325;
	font-color: black;
	text-align: left;
}
SideDrawerSectionSeparator {
	border-bottom-color: #f2f2f2;
	border-bottom-width: 30;
}
SideDrawerSectionSeparatorAndroid {
	border-bottom-color: #f2f2f2;
	border-bottom-width: 1;
}
SideDrawerItemActive {
	background-color: white;
	font-color: black;
	text-align: left;
}
SideDrawerItemInactive {
	font-color: black;
	text-align: left;
}
SideDrawerItemOnPress {
	background-color: white;
	font-color: black;
	text-align: left;
}
SideDrawerHeaderIconText {
	font-size: 16;
	font-color: #FF0000;
}
SideDrawerHeaderIconBackground {
	background-color: #000000;
}
SectionCaption {
	background-color: #adadeb;
	font-color: red;
	text-align: left;
}
SectionSeparator {
	border-bottom-color: #f2f2f2;
	border-bottom-width: 7;
}
SectionItemActive {
	border-bottom-color: #E8E8ED;
	border-bottom-width: 1;
}
SectionItemInactive {
	border-bottom-color: #E8E8ED;
	border-bottom-width: 1;
}
SectionItemOnPress {
	border-bottom-color: #E8E8ED;
	border-bottom-width: 1;
}
SerialNumberStatusText {
	padding: 14;
	font-size: 16;
}
ContextMenuGreen {
	background-color: #79d2a6;
	font-color: white;
}
RejectedRed {
	font-color: #BB0000;
	font-size: 12;
}
AcceptedGreen {
	font-color: #107E3E;
}
Color_2A6D3C {
	font-color: #3A835B;
}
Color_0000 {
	font-color: #000000;
}
Color_DE890D {
	font-color: #FFA325;
}
Color_930A0A {
	font-color: #D9364C;
}
Color_AFD149 {
	font-color: #3A835B;
}
ZCardTittleGreen {
	font-color: #6FAB28;
}
ZCardTittleOrange {
	font-color: #F7BF04;
}
ZCardTittleBlack {
	font-color: #000000;
}
`, "",{"version":3,"sources":["webpack://./build.definitions/FrieghtAppDetail/Styles/Styles.nss"],"names":[],"mappings":"AAAA,qBAAqB;AACrB,MAAM;AACN,qBAAqB;AACrB,OAAO;AACP,qBAAqB;AACrB,QAAQ;AACR,qBAAqB;AACrB,QAAQ;AACR,qBAAqB;AACrB,SAAS;AACT,qBAAqB;AACrB,qBAAqB;AACrB,qBAAqB;AACrB,qBAAqB;AACrB,sBAAsB;AACtB,sBAAsB;AACtB,kBAAkB;AAClB,kBAAkB;AAClB,kBAAkB;AAClB,kBAAkB;AAClB,iBAAiB;AACjB,iBAAiB;AACjB,iBAAiB;AACjB,iBAAiB;AACjB,mBAAmB;AACnB,mBAAmB;AACnB,mBAAmB;AACnB,kBAAkB;AAClB,sBAAsB;AACtB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,wBAAwB;AACxB,yBAAyB;AACzB,gCAAgC;AAChC,gCAAgC;AAChC,4BAA4B;AAC5B,4BAA4B;AAC5B,yBAAyB;AACzB,yBAAyB;AACzB,2BAA2B;AAC3B,oBAAoB;AACpB,oBAAoB;AACpB;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,mBAAmB;CACnB,mBAAmB;CACnB,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,gBAAgB;CAChB,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,kBAAkB;CAClB,mBAAmB;CACnB,uBAAuB;CACvB,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,mBAAmB;CACnB,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,sBAAsB;CACtB,mBAAmB;CACnB,uBAAuB;AACxB;AACA;CACC,sBAAsB;CACtB,mBAAmB;CACnB,wBAAwB;AACzB;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,qBAAqB;CACrB,aAAa;AACd;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;CACnB,aAAa;AACd;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;CACnB,aAAa;AACd;AACA;CACC,mBAAmB;CACnB,eAAe;EACd,cAAc;AAChB;AACA;CACC,aAAa;CACb,mBAAmB;CACnB,+BAA+B;AAChC;AACA;CACC,uBAAuB;CACvB,mBAAmB;AACpB;AACA;CACC,mBAAmB;CACnB,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,mBAAmB;CACnB,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,mBAAmB;CACnB,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,mBAAmB;CACnB,aAAa;CACb,qBAAqB;CACrB,yBAAyB;CACzB,eAAe;AAChB;AACA;CACC,oBAAoB;AACrB;AACA;CACC,mBAAmB;CACnB,aAAa;CACb,gBAAgB;AACjB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,mBAAmB;CACnB,qBAAqB;AACtB;AACA;CACC,uBAAuB;AACxB;AACA;CACC,uBAAuB;AACxB;AACA;CACC,aAAa;CACb,mBAAmB;CACnB,yBAAyB;AAC1B;AACA;CACC,iBAAiB;AAClB;AACA;CACC,kBAAkB;AACnB;AACA;CACC,4BAA4B;CAC5B,uBAAuB;AACxB;AACA;CACC,4BAA4B;CAC5B,sBAAsB;AACvB;AACA;CACC,yBAAyB;CACzB,iBAAiB;CACjB,gBAAgB;AACjB;AACA;CACC,4BAA4B;CAC5B,uBAAuB;AACxB;AACA;CACC,4BAA4B;CAC5B,sBAAsB;AACvB;AACA;CACC,uBAAuB;CACvB,iBAAiB;CACjB,gBAAgB;AACjB;AACA;CACC,iBAAiB;CACjB,gBAAgB;AACjB;AACA;CACC,uBAAuB;CACvB,iBAAiB;CACjB,gBAAgB;AACjB;AACA;CACC,aAAa;CACb,mBAAmB;AACpB;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;CACzB,eAAe;CACf,gBAAgB;AACjB;AACA;CACC,4BAA4B;CAC5B,sBAAsB;AACvB;AACA;CACC,4BAA4B;CAC5B,sBAAsB;AACvB;AACA;CACC,4BAA4B;CAC5B,sBAAsB;AACvB;AACA;CACC,4BAA4B;CAC5B,sBAAsB;AACvB;AACA;CACC,WAAW;CACX,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,iBAAiB;AAClB;AACA;CACC,mBAAmB;CACnB,aAAa;AACd;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB","sourcesContent":["@samprimary1: #ff0000;\n/*red*/\n@samprimary2: #0040ff;\n/*blue*/\n@samprimary3: #33cc33;\n/*green*/\n@samprimary4: #cc6600;\n/*brown*/\n@samprimary5: #ffbb33;\n/*yellow*/\n@samprimary6: #A65395;\n@samprimary7: #9BE1FF;\n@samprimary8: #42CCC8;\n@samprimary9: #B0D450;\n@samprimary10: #895600;\n@samprimary11: #6A6D70;\n@samblue1: #3333cc;\n@samblue2: #7070db;\n@samblue3: #adadeb;\n@samblue4: #0A6ED1;\n@samred1: #ff0000;\n@samred2: #ff3333;\n@samred3: #ff6666;\n@samred4: #D9364C;\n@samgreen1: #339966;\n@samgreen2: #39ac63;\n@samgreen3: #79d2a6;\n@samblack: #000000;\n@samgridblack: #32363A;\n@sambackground1: #ffe6e6;\n@sambackground2: #e6f0ff;\n@sambackground3: #ffd9cc;\n@sambackground4: #cce0ff;\n@sambackground5: #ffc6b3;\n@sambackground6: #b3d1ff;\n@sambackground7: #ffb399;\n@sambackground8: #80b3ff;\n@sambackground9: #ff9f80;\n@sambackground10: #66a3ff;\n@samBackgroundLightGrey: #f2f2f2;\n@samBackgroundLightGrey: #f2f2f2;\n@samBackgroundWhite: #ffffff;\n@samFootnotePrimary: #76767B;\n@samCaptionBlack: #3F3A3A;\n@samHighPriority: #BB0000;\n@samMediumPriority: #E9730C;\n@zsamgreen1: #6FAB28;\n@zsamOrange: #F7BF04;\nObjectTableRed {\n\tfont-color: #ff0000;\n}\nObjectTableBlue {\n\tfont-color: #3333cc;\n}\nObjectTableGreen {\n\tfont-color: #339966;\n}\nFormCellLabelCritical {\n\tfont-color: #ff0000;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\nFormCellLabelStandard {\n\tfont-color: #0040ff;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\nFormCellValueCritical {\n\tfont-color: #B0D450;\n\tfont-name: boldSystem;\n\tfont-size: 16;\n}\nFormCellValueStandard {\n\tfont-color: #895600;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\nFormCellLabelPropertyStandard {\n\tfont-color: #ff0000;\n\tfont-name: italicSystem;\n\tfont-size: 14;\n}\nFormCellLabelPropertyCritical {\n\tfont-color: #3333cc;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\nFormCellValuePropertyStandard {\n\tfont-color: #ff3333;\n\tfont-name: italicSystem;\n\tfont-size: 12;\n}\nFormCellValuePropertyCritical {\n\tfont-color: #7070db;\n\tfont-name: boldSystem;\n\tfont-size: 12;\n}\nFormCellLabelPickerStandard {\n\tfont-color: #ff0000;\n\tfont-name: italicSystem;\n\tfont-size: 14;\n}\nFormCellLabelPickerCritical {\n\tfont-color: #3333cc;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\nFormCellValuePickerStandard {\n\tfont-color: #ff3333;\n\tfont-name: italicSystem;\n\tfont-size: 12;\n}\nFormCellValuePickerCritical {\n\tfont-color: #7070db;\n\tfont-name: boldSystem;\n\tfont-size: 12;\n}\nFormCellBackgroundCritical {\n\tbackground-color: #ffe6e6;\n\ttint-color: #ffd9cc;\n\tfont-color: #33cc33;\n\tfont-name: italicSystem;\n\tfont-size: 14;\n}\nFormCellBackgroundStandard {\n\tbackground-color: #e6f0ff;\n\ttint-color: blue;\n\tfont-color: #cc6600;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\nFormCellBackgroundCriticalTitle {\n\tbackground-color: #339966;\n\ttint-color: purple;\n\tfont-color: #33cc33;\n\tfont-name: italicSystem;\n\tfont-size: 12;\n}\nFormCellBackgroundStandardTitle {\n\tbackground-color: #79d2a6;\n\ttint-color: #339966;\n\tfont-color: #cc6600;\n\tfont-name: thinSystem;\n\tfont-size: 10;\n}\nFormCellSwitchStandard {\n\ton-tint-color: #adadeb;\n\ttint-color: #80b3ff;\n\tthumb-tint-color: brown;\n}\nFormCellSwitchCritical {\n\ton-tint-color: #ff6666;\n\ttint-color: #ffb399;\n\tthumb-tint-color: yellow;\n}\nFormCellNoteTextCritical {\n\tfont-color: #ff6666;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\nFormCellNoteTextStandard {\n\tfont-color: #adadeb;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\nFormCellTitleTextCritical {\n\tfont-color: #ff3333;\n\tfont-name: boldSystem;\n\tfont-size: 14;\n}\nFormCellTitleTextStandard {\n\tfont-color: #7070db;\n\tfont-name: thinSystem;\n\tfont-size: 12;\n}\nFormCellBackgroundNotEditable {\n\tbackground-color: #ffffff;\n}\nFormCellBackgroundEditable {\n\tbackground-color: #ffffff;\n}\nObjectCellStyleBlack {\n\tfont-color: #000000;\n}\nObjectCellStyleRed {\n\tfont-color: #D9364C;\n}\nFootnotePrimary {\n\tfont-color: #76767B;\n}\nIosHighPriorityRed {\n\tfont-color: #BB0000;\n}\nIosMediumPriorityOrange {\n\tfont-color: #E9730C;\n}\nAndroidHighPriorityRed {\n\tfont-color: #BB0000;\n}\nAndroidMediumPriorityOrange {\n\tfont-color: #E9730C;\n}\nResetRed {\n\tfont-color: #D9364C;\n}\nFormCellButton {\n\tfont-color: #0A6ED1;\n}\nFormCellReadOnlyEntry {\n\tfont-color: #76767B;\n}\nGrayText {\n\tfont-color: #76767B;\n}\nFormCellTextEntry {\n\tfont-color: #3F3A3A;\n}\nGridTableTextBlack {\n\tfont-color: #32363A;\n}\nGridTableTextBlackLarge {\n\tfont-color: #32363A;\n\tfont-size: 16;\n}\nGridTableHeaderText {\n\tfont-color: #6A6D70;\n}\nGridTableRowText {\n\tfont-color: #393E42;\n\tfont-size: 14;\n}\nObjectHeaderKPITintColor {\n\ttint-color: #0070F2;\n\t/*for KPIView */\n  color: #0070F2;\n}\nObjectHeaderKPICaption {\n\tfont-size: 30;\n\tfont-color: #0070F2;\n\tfont-style: UIFontTextStyleBody;\n}\nObjectHeaderBackground {\n\tbackground-color: white;\n\tfont-color: #000000;\n}\nWorkOrderFilterPage_ToolBar {\n\tfont-color: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\nWorkOrderFilterPage {\n\tanchorcolor: #445E75;\n}\nNotificationFilterPage_ToolBar {\n\tfont-color: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\nNotificationFilterPage {\n\tanchorcolor: #445E75;\n}\nEquipmentFilterPage_ToolBar {\n\tfont-color: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\nEquipmentFilterPage {\n\tanchorcolor: #445E75;\n}\nFunctionalLocationFilterPage_ToolBar {\n\tfont-color: #3678AF;\n\tfont-size: 17;\n\tbartintcolor: #F2F2F2;\n\tborder-top-color: #F2F2F2;\n\tborder-width: 1;\n}\nFunctionalLocationFilterPage {\n\tanchorcolor: #445E75;\n}\nTitle {\n\tfont-color: #4A4A4A;\n\tfont-size: 17;\n\tfont-weight: 600;\n}\nWorkOrderDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nMeasuringPointDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nNotificationDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nNotificationItemTaskDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nNotificationTaskDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nWorkOrderOperationDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nSubOperationDetailsPage_ToolBar {\n\tfont-color: #3678AF;\n\tbartintcolor: #F8F8F8;\n}\nSideDrawerBackground {\n\tbackground-color: white;\n}\nSideDrawerHeaderBackground {\n\tbackground-color: white;\n}\nSideDrawerHeaderIcon {\n\tfont-size: 16;\n\tfont-color: #FF0000;\n\tbackground-color: #000000;\n}\nSideDrawerHeadline {\n\tfont-color: black;\n}\nSideDrawerSubHeadline {\n\tfont-style: italic;\n}\nSideDrawerHeaderSeparator {\n\tborder-bottom-color: #f2f2f2;\n\tborder-bottom-width: 30;\n}\nSideDrawerHeaderSeparatorAndroid {\n\tborder-bottom-color: #f2f2f2;\n\tborder-bottom-width: 1;\n}\nSideDrawerSectionCaption {\n\tbackground-color: #192325;\n\tfont-color: black;\n\ttext-align: left;\n}\nSideDrawerSectionSeparator {\n\tborder-bottom-color: #f2f2f2;\n\tborder-bottom-width: 30;\n}\nSideDrawerSectionSeparatorAndroid {\n\tborder-bottom-color: #f2f2f2;\n\tborder-bottom-width: 1;\n}\nSideDrawerItemActive {\n\tbackground-color: white;\n\tfont-color: black;\n\ttext-align: left;\n}\nSideDrawerItemInactive {\n\tfont-color: black;\n\ttext-align: left;\n}\nSideDrawerItemOnPress {\n\tbackground-color: white;\n\tfont-color: black;\n\ttext-align: left;\n}\nSideDrawerHeaderIconText {\n\tfont-size: 16;\n\tfont-color: #FF0000;\n}\nSideDrawerHeaderIconBackground {\n\tbackground-color: #000000;\n}\nSectionCaption {\n\tbackground-color: #adadeb;\n\tfont-color: red;\n\ttext-align: left;\n}\nSectionSeparator {\n\tborder-bottom-color: #f2f2f2;\n\tborder-bottom-width: 7;\n}\nSectionItemActive {\n\tborder-bottom-color: #E8E8ED;\n\tborder-bottom-width: 1;\n}\nSectionItemInactive {\n\tborder-bottom-color: #E8E8ED;\n\tborder-bottom-width: 1;\n}\nSectionItemOnPress {\n\tborder-bottom-color: #E8E8ED;\n\tborder-bottom-width: 1;\n}\nSerialNumberStatusText {\n\tpadding: 14;\n\tfont-size: 16;\n}\nContextMenuGreen {\n\tbackground-color: #79d2a6;\n\tfont-color: white;\n}\nRejectedRed {\n\tfont-color: #BB0000;\n\tfont-size: 12;\n}\nAcceptedGreen {\n\tfont-color: #107E3E;\n}\nColor_2A6D3C {\n\tfont-color: #3A835B;\n}\nColor_0000 {\n\tfont-color: #000000;\n}\nColor_DE890D {\n\tfont-color: #FFA325;\n}\nColor_930A0A {\n\tfont-color: #D9364C;\n}\nColor_AFD149 {\n\tfont-color: #3A835B;\n}\nZCardTittleGreen {\n\tfont-color: #6FAB28;\n}\nZCardTittleOrange {\n\tfont-color: #F7BF04;\n}\nZCardTittleBlack {\n\tfont-color: #000000;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Pages/Application/About.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Pages/Application/About.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/FrieghtAppDetail/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/FrieghtAppDetail/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/FrieghtAppDetail/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":true},{"Value":"/FrieghtAppDetail/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/FrieghtAppDetail/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Pages/Application/Support.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Pages/Application/Support.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/FrieghtAppDetail/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/FrieghtAppDetail/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/FrieghtAppDetail/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":true,"EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/FrieghtAppDetail/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/FrieghtAppDetail/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Pages/Application/UserActivityLog.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Pages/Application/UserActivityLog.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/FrieghtAppDetail/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/FrieghtAppDetail/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/FrieghtAppDetail/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/FrieghtAppDetail/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/FrieghtAppDetail/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/FrieghtAppDetail/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/FrieghtAppDetail/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/FrieghtAppDetail/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Pages/Main.page":
/*!************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Pages/Main.page ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[]}],"_Name":"Main","_Type":"Page","Caption":"Main","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/FrieghtAppDetail/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofDeliveryCaptureSignature.page":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofDeliveryCaptureSignature.page ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Signature","ActionBar":{"Items":[{"Position":"left","SystemItem":"Cancel","OnPress":"/FrieghtAppDetail/Actions/ClosePage.action"},{"Position":"right","SystemItem":"Done","OnPress":"/FrieghtAppDetail/Rules/ProofOfDelivery/PostProofOfDelivery.js"}]},"Controls":[{"Sections":[{"Controls":[{"_Type":"Control.Type.FormCell.InlineSignatureCapture","_Name":"SignatureCaptureFormCell","Caption":"Add Signature","ShowTimestampInImage":true,"ShowXMark":true,"ShowUnderline":true,"WatermarkText":"","WatermarkTextMaxLines":5,"TimestampFormatter":"MM/dd/yy hh:mm a zzz","HelperText":""}]},{"_Type":"Section.Type.FormCell","_Name":"FormCellSection5","Controls":[{"Caption":"Attachment Description","PlaceHolder":"Attachment Description","IsEditable":true,"IsVisible":false,"_Name":"AttachmentDescription","Value":"","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"Attachment","_Type":"Control.Type.FormCell.Attachment","AttachmentTitle":"Attach Files","AttachmentAddTitle":"Add","AttachmentCancelTitle":"Cancel","AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"],"AllowedFileTypes":[],"OnValueChange":"","Value":[],"IsEditable":true,"IsVisible":true}]},{"_Type":"Section.Type.FormCell","_Name":"FormCellSection6","Controls":[{"Caption":"Mail ID","PlaceHolder":"Enter mail id","IsEditable":true,"IsVisible":"/FrieghtAppDetail/Rules/ProofOfDelivery/IsEmailSectionVisible.js","KeyboardType":"Email","_Name":"captureemail","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"SignatureControlPage"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialCreateUpdate.page":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialCreateUpdate.page ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"","ActionBar":{"Items":[{"Position":"left","SystemItem":"Cancel","OnPress":"/FrieghtAppDetail/Actions/ClosePage.action"},{"Position":"right","SystemItem":"Done","Text":"Done","OnPress":"/FrieghtAppDetail/Actions/ProofOfDelivery/MaterialItemUpdateRest.action"}]},"Controls":[{"Sections":[{"Controls":[{"Value":"{itemDesc}","_Name":"Item Description","Caption":"Item Description","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false,"IsVisible":true},{"Value":"{itemNo}","_Name":"ItemNo","Caption":"Item No:.","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false,"IsVisible":true},{"Value":"{productId}","_Name":"ProductId","Caption":"Product ID","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false,"IsVisible":true},{"Value":"{category}","_Name":"Category","Caption":"Category","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false,"IsVisible":true},{"Value":"/FrieghtAppDetail/Rules/ProofOfDelivery/FormatRecievedQuantity.js","_Name":"Quantity","Caption":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":true,"IsVisible":true},{"Value":"{uom}","_Name":"Unit of measure","Caption":"UOM","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false,"IsVisible":true}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"MaterialUpdatePage"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialDetails.page":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialDetails.page ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Material Details","ActionBar":{"Items":[{"Position":"right","SystemItem":"Edit","OnPress":"/FrieghtAppDetail/Actions/ProofOfDelivery/ProofOfDeliveryMaterialUpdate.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.KeyValue","_Name":"MaterialDetailsSection","Header":{"Caption":"Material Details"},"KeyAndValues":[{"KeyName":"Category","Value":"{{#Property:PKG}}"},{"KeyName":"Description","Value":"{{#Property:itemDesc}}"},{"KeyName":"product Id","Value":"{{#Property:productId}}"},{"KeyName":"Display Quantity","Value":"/FrieghtAppDetail/Rules/ProofOfDelivery/FormatRecievedQuantity.js"},{"KeyName":"Display Quantity","Value":"/FrieghtAppDetail/Rules/ProofOfDelivery/FormatDisplayQuantity.js"}]}],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"MaterialDetailsPage"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialList.page":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialList.page ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Proof of Delivery - Reporting","ActionBar":{"Items":[{"Position":"right","SystemItem":"Done","OnPress":"/FrieghtAppDetail/Actions/ProofOfDelivery/ProofDeliveryCaptureSignature.action","Visible":true}]},"Controls":[{"Sections":[{"Search":{"Enabled":false,"Delay":500,"MinimumCharacterThreshold":3,"Placeholder":"search","BarcodeScanner":false},"Header":{"UseTopPadding":false},"EmptySection":{"Caption":"Material List"},"ObjectCell":{"PreserveIconStackSpacing":true,"AccessoryType":"disclosureIndicator","Title":"{itemDesc}","StatusText":"{productId}","Subhead":"{category}","Footnote":"/FrieghtAppDetail/Rules/ProofOfDelivery/FormatRecievedQuantity.js","OnPress":"/FrieghtAppDetail/Actions/ProofOfDelivery/ProofOfDeliveryMaterialUpdate.action","Styles":{"Title":"/FrieghtAppDetail/Rules/ProofOfDelivery/MaterialDescriptionStyle.js"}},"Target":"/FrieghtAppDetail/Rules/ProofOfDelivery/GetProofOfDeliveryItems.js","_Type":"Section.Type.ObjectTable","_Name":"MaterialListSection"}],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"MaterialListViewPage"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialReadOnlyList.page":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialReadOnlyList.page ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Material Item List","ActionBar":{"Items":[{"Position":"right","SystemItem":"Done","OnPress":"/FrieghtAppDetail/Actions/ClosePage.action","Visible":true}]},"Controls":[{"Sections":[{"Search":{"Enabled":false,"Delay":500,"MinimumCharacterThreshold":3,"Placeholder":"search","BarcodeScanner":false},"Header":{"UseTopPadding":false},"EmptySection":{"Caption":"Material List"},"ObjectCell":{"PreserveIconStackSpacing":true,"AccessoryType":"disclosureIndicator","Title":"{itemDesc}","StatusText":"{productId}","Subhead":"{category}","Footnote":"/FrieghtAppDetail/Rules/ProofOfDelivery/FormatRecievedQuantity.js","Styles":{"Title":"/FrieghtAppDetail/Rules/ProofOfDelivery/MaterialDescriptionStyle.js"}},"Target":"/FrieghtAppDetail/Rules/ProofOfDelivery/GetProofOfDeliveryItems.js","_Type":"Section.Type.ObjectTable","_Name":"MaterialListSection"}],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"MaterialListViewPage"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Pages/Shipment/FetchShipmentDetails.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Pages/Shipment/FetchShipmentDetails.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"OnLoaded":"/FrieghtAppDetail/Rules/Application/InitializeAutoSync.js","Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"FormCellContainer","Sections":[{"Separators":{"ControlSeparator":true},"Controls":[{"IsEditable":true,"PlaceHolder":"Please enter the shipment number","Value":"","_Name":"ShipmentNumber","Caption":"Shipment Number","IsVisible":true,"AlternateInput":"Barcode","_Type":"Control.Type.FormCell.SimpleProperty"}],"Visible":true,"_Type":"Section.Type.FormCell","_Name":"FormCellSection4"}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"FetchShipmentDetails","Caption":"Fetch Shipment Details","ActionBar":{"Items":[{"Position":"left","SystemItem":"Cancel","OnPress":"/FrieghtAppDetail/Actions/ClosePage.action"},{"_Name":"ActionBarItem0","Caption":"Search","Position":"right","OnPress":"/FrieghtAppDetail/Rules/Shipment/NavToShipmentDetails.js"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Pages/Shipment/ShipmentListView.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Pages/Shipment/ShipmentListView.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Page","_Name":"ShipmentListView","OnReturning":"/FrieghtAppDetail/Rules/Shipment/ShipmentListViewOnReturning.js","OnLoaded":"/FrieghtAppDetail/Rules/Application/InitializeAutoSync.js","ActionBar":{"Items":[{"Position":"right","OnPress":"/FrieghtAppDetail/Rules/Route/ShowShipmentRoute.js","Icon":"sap-icon://locate-me","IsIconCircular":false},{"Position":"right","OnPress":"/FrieghtAppDetail/Actions/UnplannedEvent/ReportUnPlannedEvent.action","Icon":"sap-icon://quality-issue","Caption":"Unplanned Event","IsIconCircular":false},{"Icon":"sap-icon://add","Caption":"Shipment Search","Position":"right","IsIconCircular":false,"OnPress":"/FrieghtAppDetail/Actions/Shipment/NavToShipmentDetailsEntry.action"},{"Position":"left","Icon":"sap-icon://menu","OnPress":"/FrieghtAppDetail/Actions/Application/UserMenuPopover.action","Visible":true,"IconText":"Menu"}]},"Controls":[{"_Type":"Control.Type.SectionedTable","LoadingIndicator":{"Enabled":true},"_Name":"SectionedTable","Sections":[{"Header":{"Caption":"/FrieghtAppDetail/Rules/Shipment/ShipmentListViewCaption.js"},"Card":{"_Type":"Control.Type.ObjectCard","Title":"{locationDescription} ({locationId})","Subhead":"/FrieghtAppDetail/Rules/Shipment/ShipmentListViewSubhead.js","Description":"Address: {addressDetail}","Footnote":"Material Load : {materialLoad} Packages","StatusText":"Material Unload : {materialUnload} Packages","DetailImage":"/FrieghtAppDetail/Rules/Shipment/ShipmentListViewIcon.js","Styles":{"Title":"/FrieghtAppDetail/Rules/Shipment/ShipmentListViewStyle.js"},"OverflowButtons":[{"_Name":"Items","Image":"sap-icon://activity-items","Title":"Items","OnPress":"/FrieghtAppDetail/Rules/ProofOfDelivery/FetchMaterialItemWrapper.js"},{"_Name":"Arrival","Image":"sap-icon://journey-arrive","Title":"Arrival","OnPress":"/FrieghtAppDetail/Rules/Departure/PostShipmentArrival.js","Visible":"/FrieghtAppDetail/Rules/Shipment/ShipmentListViewArrivalButtonVisible.js"},{"_Name":"POD","Title":"Proof of Delivery","Image":"sap-icon://customer-order-entry","OnPress":"/FrieghtAppDetail/Rules/ProofOfDelivery/FetchMaterialItem.js","Visible":"/FrieghtAppDetail/Rules/Shipment/ShipmentListViewPODButtonVisible.js"},{"_Name":"Departure","Title":"Departure","Image":"sap-icon://shipping-status","OnPress":"/FrieghtAppDetail/Rules/Departure/PostShipmentDeparture.js","Visible":"/FrieghtAppDetail/Rules/Shipment/ShipmentListViewDepartureButtonVisible.js"}]},"Layout":{"LayoutType":"Vertical"},"_Name":"ObjectCardCollection","_Type":"Section.Type.ObjectCardCollection","EmptySection":{"Caption":"No Shipment Found"},"Target":"/FrieghtAppDetail/Rules/Shipment/GetShipmentObject.js"}]}]}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Pages/UnplannedEvent/ReportUnPlannedEvent.page":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Pages/UnplannedEvent/ReportUnPlannedEvent.page ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"Position":"right","SystemItem":"Done","OnPress":"/FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventCreateRequired.action"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"Caption":"","Controls":[{"_Name":"EventPkr","_Type":"Control.Type.FormCell.ListPicker","Caption":"Unplanned Event","AllowMultipleSelection":false,"AllowDefaultValueIfOneItem":true,"IsPickerDismissedOnSelection":true,"IsSearchCancelledAfterSelection":true,"PickerItems":"/FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventCodeListPicker.js","IsEditable":true,"Value":""},{"_Name":"ReasonCodePkr","_Type":"Control.Type.FormCell.ListPicker","Caption":"Reason Code","AllowMultipleSelection":false,"AllowDefaultValueIfOneItem":true,"IsPickerDismissedOnSelection":true,"IsSearchCancelledAfterSelection":true,"PickerItems":"/FrieghtAppDetail/Rules/UnplannedEvent/UnplannedEventReasonCodeListPicker.js","IsEditable":true,"Value":""}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"UnplannedUpdatePage"}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"MainPage":"/FrieghtAppDetail/Pages/Shipment/ShipmentListView.page","OnWillUpdate":"/FrieghtAppDetail/Rules/Application/OnWillUpdate.js","Styles":"/FrieghtAppDetail/Styles/Styles.less","Localization":"/FrieghtAppDetail/i18n/i18n.properties","_SchemaVersion":"23.8","_Name":"FrieghtAppDetail","StyleSheets":{"Styles.dark":{"css":"/FrieghtAppDetail/Styles/Styles.dark.css","ios":"/FrieghtAppDetail/Styles/Styles.dark.nss","android":"/FrieghtAppDetail/Styles/Styles.dark.json"},"Styles":{"css":"/FrieghtAppDetail/Styles/Styles.css","ios":"/FrieghtAppDetail/Styles/Styles.nss","android":"/FrieghtAppDetail/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Application/AppUpdate.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Application/AppUpdate.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/FrieghtAppDetail/Rules/Application/AppUpdateFailure.js","OnSuccess":"/FrieghtAppDetail/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Application/AppUpdateFailureMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Application/AppUpdateFailureMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Application/AppUpdateProgressBanner.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Application/AppUpdateProgressBanner.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/FrieghtAppDetail/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Application/AppUpdateSuccessMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Application/AppUpdateSuccessMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Application/Logout.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Application/Logout.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Application/NavToAbout.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Application/NavToAbout.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/FrieghtAppDetail/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Application/NavToActivityLog.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Application/NavToActivityLog.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/FrieghtAppDetail/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Application/NavToSupport.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Application/NavToSupport.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/FrieghtAppDetail/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Application/OnWillUpdate.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Application/OnWillUpdate.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Application/Reset.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Application/Reset.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Application/ResetMessage.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Application/ResetMessage.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/FrieghtAppDetail/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Application/UserMenuPopover.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Application/UserMenuPopover.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/FrieghtAppDetail/Actions/Application/NavToSupport.action","Title":"Support","Visible":false},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/FrieghtAppDetail/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/FrieghtAppDetail/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/FrieghtAppDetail/Actions/Application/ResetMessage.action","Title":"Reset","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/FrieghtAppDetail/Actions/Application/Logout.action","Title":"Logout","Visible":true}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/AutoSync/AutoSyncFailureMessage.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/AutoSync/AutoSyncFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Title":"Auto Sync Failure","Message":"Auto Sync Failure","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/AutoSync/AutoSyncPeriodicCall.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/AutoSync/AutoSyncPeriodicCall.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Title":"This is Periodic Call","Message":"This is Periodic Call","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/AutoSync/LocationCordinatesBannerMessage.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/AutoSync/LocationCordinatesBannerMessage.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"/FrieghtAppDetail/Rules/Location/ShowLocationValues.js","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/CloseModalPage_Complete.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/CloseModalPage_Complete.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/ClosePage.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/ClosePage.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Logging/LogUploadFailure.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Logging/LogUploadFailure.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Logging/LogUploadSuccessful.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Logging/LogUploadSuccessful.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Logging/UploadLog.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Logging/UploadLog.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/FrieghtAppDetail/Actions/Logging/LogUploadFailure.action","OnSuccess":"/FrieghtAppDetail/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Logging/UploadLogProgress.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Logging/UploadLogProgress.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/FrieghtAppDetail/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/MaterialItemUpdateRest.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/MaterialItemUpdateRest.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","Target":{"Service":"/FrieghtAppDetail/Services/FrieghtRestSrv.service","Path":"/updateDelivery","RequestProperties":{"Method":"POST","Headers":{"Accept":"application/json","Content-Type":"application/json"},"Body":{"FoId":"/FrieghtAppDetail/Rules/ProofOfDelivery/GetShipmentNumForMaterialUpdate.js","LocationId":"/FrieghtAppDetail/Rules/ProofOfDelivery/GetLocationIDForMaterialUpdate.js","ItemNo":"#Control:ItemNo/#Value","ProductId":"#Control:ProductId/#Value","ActQty":"#Control:Quantity/#Value"}},"ActionResult":{"_Name":"epdResult"}},"ShowActivityIndicator":true,"ActivityIndicatorText":"Posting..","OnSuccess":"/FrieghtAppDetail/Rules/Logging/MaterialFetchOnSuccessfulUpdate.js","OnFailure":"/FrieghtAppDetail/Actions/UpdateFailed.action"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/NavToMaterialDetails.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/NavToMaterialDetails.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"PageToOpen":"/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialDetails.page","NavigationType":"Inner","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/NavToProofOfDeliveryMateriaReadOnlyList.action":
/*!*******************************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/NavToProofOfDeliveryMateriaReadOnlyList.action ***!
  \*******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"PageToOpen":"/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialReadOnlyList.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/NavToProofOfDeliveryMaterialList.action":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/NavToProofOfDeliveryMaterialList.action ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = {"PageToOpen":"/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialList.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/PoolOfDeliveryDialogMessage.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/PoolOfDeliveryDialogMessage.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Any missing/damaged material in the shipment leg?","OKCaption":"YES","CancelCaption":"NO"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/ProofDeliveryCaptureSignature.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/ProofDeliveryCaptureSignature.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"PageToOpen":"/FrieghtAppDetail/Pages/ProofOfDelivery/ProofDeliveryCaptureSignature.page","NavigationType":"Inner","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/ProofOfDeliveryMaterialUpdate.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/ProofOfDeliveryMaterialUpdate.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"PageToOpen":"/FrieghtAppDetail/Pages/ProofOfDelivery/ProofOfDeliveryMaterialCreateUpdate.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/StoreFetchedMaterialItem.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/ProofOfDelivery/StoreFetchedMaterialItem.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"StoreFetchedMaterialItem"},"Target":{"Service":"/FrieghtAppDetail/Services/FrieghtRestSrv.service","Path":"/FrieghtAppDetail/Rules/ProofOfDelivery/BuildMaterialItemPath.js","OutputPath":"/value","RequestProperties":{"Method":"GET"}}}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Shipment/NavToShipmentDetailsEntry.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Shipment/NavToShipmentDetailsEntry.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToShipmentList"},"PageToOpen":"/FrieghtAppDetail/Pages/Shipment/FetchShipmentDetails.page","NavigationType":"Inner","ModalPageFullscreen":true}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Shipment/NavToShipmentList.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Shipment/NavToShipmentList.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToShipmentList"},"PageToOpen":"/FrieghtAppDetail/Pages/Shipment/ShipmentListView.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Shipment/ShipmentIsNotValidMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Shipment/ShipmentIsNotValidMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Title":"Invalid Shipment","Message":"Shipment Number is not valid","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Shipment/ShipmentStatusUpdateRest.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Shipment/ShipmentStatusUpdateRest.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","Target":{"Service":"/FrieghtAppDetail/Services/FrieghtRestSrv.service","Path":"/updateStatus","RequestProperties":{"Method":"POST","Headers":{"Accept":"application/json","Content-Type":"application/json"},"Body":{"altKey":"/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateAltKey.js","locationAltKey":"/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdatelocationAltKey.js","eventName":"/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateEventName.js","eventTime":"/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateEventTime.js","eventLong":"/FrieghtAppDetail/Rules/Location/GetLongitude.js","eventLat":"/FrieghtAppDetail/Rules/Location/GetLatitude.js","stopId":"/FrieghtAppDetail/Rules/Shipment/GetStopID.js","signature":"/FrieghtAppDetail/Rules/ProofOfDelivery/ProofOfDeliveryUpdateSignature.js","podImage":"/FrieghtAppDetail/Rules/ProofOfDelivery/ProofOfDeliveryUpdateAttachment.js","timeZone":"/FrieghtAppDetail/Rules/Shipment/GetTimeZone.js","reasonCode":"#ClientData/#Property:reasonCode"}},"ActionResult":{"_Name":"epdResult"}}}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/Shipment/StoreFetchedShipmentDetail.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/Shipment/StoreFetchedShipmentDetail.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"StoreFetchedShipmentDetail"},"Target":{"Service":"/FrieghtAppDetail/Services/FrieghtRestSrv.service","Path":"/FrieghtAppDetail/Rules/Shipment/BuildShipmentPath.js","OutputPath":"/value","RequestProperties":{"Method":"GET"}}}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/ReportUnPlannedEvent.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/ReportUnPlannedEvent.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"PageToOpen":"/FrieghtAppDetail/Pages/UnplannedEvent/ReportUnPlannedEvent.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/StoreFetchedUnplannedEventCode.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/StoreFetchedUnplannedEventCode.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"StoreFetchedEventCode"},"Target":{"Service":"/FrieghtAppDetail/Services/FrieghtRestSrv.service","Path":"/unplannedEvents","OutputPath":"/value","RequestProperties":{"Method":"GET"}}}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/StoreFetchedUnplannedEventReasonCode.action":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/StoreFetchedUnplannedEventReasonCode.action ***!
  \***************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","ActionResult":{"_Name":"StoreFetchedEventCode"},"Target":{"Service":"/FrieghtAppDetail/Services/FrieghtRestSrv.service","Path":"/reasonCodes","OutputPath":"/value","RequestProperties":{"Method":"GET"}}}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventCreateRequired.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventCreateRequired.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"OnFailure":"/FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventRequiredFieldFailure.action","OnSuccess":"/FrieghtAppDetail/Rules/UnplannedEvent/PostUnplannedEvent.js","RequiredFields":["EventPkr","ReasonCodePkr"],"_Type":"Action.Type.CheckRequiredFields","ShowActivityIndicator":true,"ActivityIndicatorText":"  "}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventRequiredFieldFailure.action":
/*!*************************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventRequiredFieldFailure.action ***!
  \*************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":4,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Enter value for all field","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventUpdateRest.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/UnplannedEvent/UnplannedEventUpdateRest.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.RestService.SendRequest","Target":{"Service":"/FrieghtAppDetail/Services/FrieghtRestSrv.service","Path":"/updateStatus","RequestProperties":{"Method":"POST","Headers":{"Accept":"application/json","Content-Type":"application/json"},"Body":{"altKey":"/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateAltKey.js","locationAltKey":"/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdatelocationAltKey.js","eventName":"/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateEventName.js","eventTime":"/FrieghtAppDetail/Rules/Shipment/ShipmentStatusUpdateEventTime.js","eventLong":"/FrieghtAppDetail/Rules/Location/GetLongitude.js","eventLat":"/FrieghtAppDetail/Rules/Location/GetLatitude.js","stopId":"/FrieghtAppDetail/Rules/Shipment/GetStopID.js","signature":"/FrieghtAppDetail/Rules/ProofOfDelivery/ProofOfDeliveryUpdateSignature.js","podImage":"/FrieghtAppDetail/Rules/ProofOfDelivery/ProofOfDeliveryUpdateAttachment.js","timeZone":"/FrieghtAppDetail/Rules/Shipment/GetTimeZone.js"}},"ActionResult":{"_Name":"epdResult"}}}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/UpdateFailed.action":
/*!************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/UpdateFailed.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update Failed","IsIconHidden":false,"MaxNumberOfLines":1,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Actions/UpdateSuccessMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Actions/UpdateSuccessMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update Successful","IsIconHidden":false,"MaxNumberOfLines":1,"_Type":"Action.Type.ToastMessage","OnSuccess":"/FrieghtAppDetail/Rules/Application/RefreshPage.js"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Fragments/Documents/DocumentFormCell.fragment":
/*!******************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Fragments/Documents/DocumentFormCell.fragment ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Name":"Attachment","_Type":"Control.Type.FormCell.Attachment","AttachmentTitle":"Attach Files","AttachmentAddTitle":"Add","AttachmentCancelTitle":"Cancel","AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"],"AllowedFileTypes":[],"OnValueChange":"","Value":[]}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Globals/Application/AppDefinition_Version.global":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Globals/Application/AppDefinition_Version.global ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Globals/Application/ApplicationName.global":
/*!***************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Globals/Application/ApplicationName.global ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Globals/Application/SupportEmail.global":
/*!************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Globals/Application/SupportEmail.global ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Globals/Application/SupportPhone.global":
/*!************************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Globals/Application/SupportPhone.global ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Services/FrieghtRestSrv.service":
/*!****************************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Services/FrieghtRestSrv.service ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"GTT-SERV","OfflineEnabled":false,"SourceType":"Mobile","RestService":true}

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Images/GreenMarker.png":
/*!*******************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Images/GreenMarker.png ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Images/OrangeMarker.png":
/*!********************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Images/OrangeMarker.png ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Images/RedMarker.png":
/*!*****************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Images/RedMarker.png ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Images/TruckNormal.png":
/*!*******************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Images/TruckNormal.png ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Images/greentruck.png":
/*!******************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Images/greentruck.png ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Images/orangetruck.png":
/*!*******************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Images/orangetruck.png ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "webpack/container/entry/bundle.js":
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var moduleMap = {
	".": () => {
		return Promise.resolve().then(() => (() => ((__webpack_require__(/*! ./build.definitions/application-index.js */ "./build.definitions/application-index.js")))));
	}
};
var get = (module, getScope) => {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(() => {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = (shareScope, initScope) => {
	if (!__webpack_require__.S) return;
	var name = "default"
	var oldScope = __webpack_require__.S[name];
	if(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
	__webpack_require__.S[name] = shareScope;
	return __webpack_require__.I(name, initScope);
};

// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: () => (get),
	init: () => (init)
});

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Styles/Styles.dark.json":
/*!********************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Styles/Styles.dark.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"FormCellLabelCritical":{"font-color":"#ff0000","font-name":"boldSystem","font-size":"14"},"FormCellLabelStandard":{"font-color":"#0040ff","font-name":"thinSystem","font-size":"12"},"FormCellValueCritical":{"font-color":"#B0D450","font-name":"boldSystem","font-size":"16"},"FormCellValueStandard":{"font-color":"#895600","font-name":"thinSystem","font-size":"12"},"FormCellLabelPropertyStandard":{"font-color":"#ff0000","font-name":"italicSystem","font-size":"14"},"FormCellLabelPropertyCritical":{"font-color":"#3333cc","font-name":"boldSystem","font-size":"14"},"FormCellValuePropertyStandard":{"font-color":"#ff3333","font-name":"italicSystem","font-size":"12"},"FormCellValuePropertyCritical":{"font-color":"#7070db","font-name":"boldSystem","font-size":"12"},"FormCellLabelPickerStandard":{"font-color":"#ff0000","font-name":"italicSystem","font-size":"14"},"FormCellLabelPickerCritical":{"font-color":"#3333cc","font-name":"boldSystem","font-size":"14"},"FormCellValuePickerStandard":{"font-color":"#ff3333","font-name":"italicSystem","font-size":"12"},"FormCellValuePickerCritical":{"font-color":"#7070db","font-name":"boldSystem","font-size":"12"},"FormCellBackgroundCritical":{"background-color":"#ffe6e6","tint-color":"#ffd9cc","font-color":"#33cc33","font-name":"italicSystem","font-size":"14"},"FormCellBackgroundStandard":{"background-color":"#e6f0ff","tint-color":"blue","font-color":"#cc6600","font-name":"thinSystem","font-size":"12"},"FormCellBackgroundCriticalTitle":{"background-color":"#339966","tint-color":"purple","font-color":"#33cc33","font-name":"italicSystem","font-size":"12"},"FormCellBackgroundStandardTitle":{"background-color":"#79d2a6","tint-color":"#339966","font-color":"#cc6600","font-name":"thinSystem","font-size":"10"},"FormCellSwitchStandard":{"on-tint-color":"#adadeb","tint-color":"#80b3ff","thumb-tint-color":"brown"},"FormCellSwitchCritical":{"on-tint-color":"#ff6666","tint-color":"#ffb399","thumb-tint-color":"yellow"},"FormCellNoteTextCritical":{"font-color":"#ff6666","font-name":"boldSystem","font-size":"14"},"FormCellNoteTextStandard":{"font-color":"#adadeb","font-name":"thinSystem","font-size":"12"},"FormCellTitleTextCritical":{"font-color":"#ff3333","font-name":"boldSystem","font-size":"14"},"FormCellTitleTextStandard":{"font-color":"#7070db","font-name":"thinSystem","font-size":"12"},"FormCellBackgroundNotEditable":{"background-color":"#161616"},"FormCellBackgroundEditable":{"background-color":"#ffffff"},"ObjectCellStyleBlack":{"font-color":"#000000"},"ObjectCellStyleRed":{"font-color":"#D9364C"},"FootnotePrimary":{"font-color":"#76767B"},"IosHighPriorityRed":{"font-color":"#FF453A"},"IosMediumPriorityOrange":{"font-color":"#FF9F0A"},"AndroidHighPriorityRed":{"font-color":"#FFBBBB"},"AndroidMediumPriorityOrange":{"font-color":"#FCD295"},"ResetRed":{"font-color":"#D9364C"},"FormCellButton":{"font-color":"#91C8F6"},"FormCellReadOnlyEntry":{"font-color":"#76767B"},"GrayText":{"font-color":"#76767B"},"FormCellTextEntry":{"font-color":"#3F3A3A"},"GridTableTextBlack":{"font-color":"#ffffff"},"GridTableTextBlackLarge":{"font-color":"#ffffff","font-size":"16"},"GridTableHeaderText":{"font-color":"#ffffff"},"GridTableRowText":{"font-color":"#ffffff","font-size":"14"},"ObjectHeaderKPITintColor":{"tint-color":"#0A84FF","/*for KPIView */\\n  color":"#0A84FF"},"ObjectHeaderKPICaption":{"font-size":"30","font-color":"#0A84FF","font-style":"UIFontTextStyleBody"},"ObjectHeaderBackground":{"background-color":"white","font-color":"#000000"},"WorkOrderFilterPage_ToolBar":{"font-color":"#3678AF","font-size":"17","bartintcolor":"#F2F2F2","border-top-color":"#F2F2F2","border-width":"1"},"WorkOrderFilterPage":{"anchorcolor":"#445E75"},"NotificationFilterPage_ToolBar":{"font-color":"#3678AF","font-size":"17","bartintcolor":"#F2F2F2","border-top-color":"#F2F2F2","border-width":"1"},"NotificationFilterPage":{"anchorcolor":"#445E75"},"EquipmentFilterPage_ToolBar":{"font-color":"#3678AF","font-size":"17","bartintcolor":"#F2F2F2","border-top-color":"#F2F2F2","border-width":"1"},"EquipmentFilterPage":{"anchorcolor":"#445E75"},"FunctionalLocationFilterPage_ToolBar":{"font-color":"#3678AF","font-size":"17","bartintcolor":"#F2F2F2","border-top-color":"#F2F2F2","border-width":"1"},"FunctionalLocationFilterPage":{"anchorcolor":"#445E75"},"Title":{"font-color":"#4A4A4A","font-size":"17","font-weight":"600"},"WorkOrderDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"MeasuringPointDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"NotificationDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"NotificationItemTaskDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"NotificationTaskDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"WorkOrderOperationDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"SubOperationDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"SerialNumberStatusText":{"padding":"14","font-size":"16"}}');

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/Styles/Styles.json":
/*!***************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/Styles/Styles.json ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"ObjectTableRed":{"font-color":"#ff0000"},"ObjectTableBlue":{"font-color":"#3333cc"},"ObjectTableGreen":{"font-color":"#339966"},"FormCellLabelCritical":{"font-color":"#ff0000","font-name":"boldSystem","font-size":"14"},"FormCellLabelStandard":{"font-color":"#0040ff","font-name":"thinSystem","font-size":"12"},"FormCellValueCritical":{"font-color":"#B0D450","font-name":"boldSystem","font-size":"16"},"FormCellValueStandard":{"font-color":"#895600","font-name":"thinSystem","font-size":"12"},"FormCellLabelPropertyStandard":{"font-color":"#ff0000","font-name":"italicSystem","font-size":"14"},"FormCellLabelPropertyCritical":{"font-color":"#3333cc","font-name":"boldSystem","font-size":"14"},"FormCellValuePropertyStandard":{"font-color":"#ff3333","font-name":"italicSystem","font-size":"12"},"FormCellValuePropertyCritical":{"font-color":"#7070db","font-name":"boldSystem","font-size":"12"},"FormCellLabelPickerStandard":{"font-color":"#ff0000","font-name":"italicSystem","font-size":"14"},"FormCellLabelPickerCritical":{"font-color":"#3333cc","font-name":"boldSystem","font-size":"14"},"FormCellValuePickerStandard":{"font-color":"#ff3333","font-name":"italicSystem","font-size":"12"},"FormCellValuePickerCritical":{"font-color":"#7070db","font-name":"boldSystem","font-size":"12"},"FormCellBackgroundCritical":{"background-color":"#ffe6e6","tint-color":"#ffd9cc","font-color":"#33cc33","font-name":"italicSystem","font-size":"14"},"FormCellBackgroundStandard":{"background-color":"#e6f0ff","tint-color":"blue","font-color":"#cc6600","font-name":"thinSystem","font-size":"12"},"FormCellBackgroundCriticalTitle":{"background-color":"#339966","tint-color":"purple","font-color":"#33cc33","font-name":"italicSystem","font-size":"12"},"FormCellBackgroundStandardTitle":{"background-color":"#79d2a6","tint-color":"#339966","font-color":"#cc6600","font-name":"thinSystem","font-size":"10"},"FormCellSwitchStandard":{"on-tint-color":"#adadeb","tint-color":"#80b3ff","thumb-tint-color":"brown"},"FormCellSwitchCritical":{"on-tint-color":"#ff6666","tint-color":"#ffb399","thumb-tint-color":"yellow"},"FormCellNoteTextCritical":{"font-color":"#ff6666","font-name":"boldSystem","font-size":"14"},"FormCellNoteTextStandard":{"font-color":"#adadeb","font-name":"thinSystem","font-size":"12"},"FormCellTitleTextCritical":{"font-color":"#ff3333","font-name":"boldSystem","font-size":"14"},"FormCellTitleTextStandard":{"font-color":"#7070db","font-name":"thinSystem","font-size":"12"},"FormCellBackgroundNotEditable":{"background-color":"#ffffff"},"FormCellBackgroundEditable":{"background-color":"#ffffff"},"ObjectCellStyleBlack":{"font-color":"#000000"},"ObjectCellStyleRed":{"font-color":"#D9364C"},"FootnotePrimary":{"font-color":"#76767B"},"IosHighPriorityRed":{"font-color":"#BB0000"},"IosMediumPriorityOrange":{"font-color":"#E9730C"},"AndroidHighPriorityRed":{"font-color":"#BB0000"},"AndroidMediumPriorityOrange":{"font-color":"#E9730C"},"ResetRed":{"font-color":"#D9364C"},"FormCellButton":{"font-color":"#0A6ED1"},"FormCellReadOnlyEntry":{"font-color":"#76767B"},"GrayText":{"font-color":"#76767B"},"FormCellTextEntry":{"font-color":"#3F3A3A"},"GridTableTextBlack":{"font-color":"#32363A"},"GridTableTextBlackLarge":{"font-color":"#32363A","font-size":"16"},"GridTableHeaderText":{"font-color":"#6A6D70"},"GridTableRowText":{"font-color":"#393E42","font-size":"14"},"ObjectHeaderKPITintColor":{"tint-color":"#0070F2","/*for KPIView */\\n  color":"#0070F2"},"ObjectHeaderKPICaption":{"font-size":"30","font-color":"#0070F2","font-style":"UIFontTextStyleBody"},"ObjectHeaderBackground":{"background-color":"white","font-color":"#000000"},"WorkOrderFilterPage_ToolBar":{"font-color":"#3678AF","font-size":"17","bartintcolor":"#F2F2F2","border-top-color":"#F2F2F2","border-width":"1"},"WorkOrderFilterPage":{"anchorcolor":"#445E75"},"NotificationFilterPage_ToolBar":{"font-color":"#3678AF","font-size":"17","bartintcolor":"#F2F2F2","border-top-color":"#F2F2F2","border-width":"1"},"NotificationFilterPage":{"anchorcolor":"#445E75"},"EquipmentFilterPage_ToolBar":{"font-color":"#3678AF","font-size":"17","bartintcolor":"#F2F2F2","border-top-color":"#F2F2F2","border-width":"1"},"EquipmentFilterPage":{"anchorcolor":"#445E75"},"FunctionalLocationFilterPage_ToolBar":{"font-color":"#3678AF","font-size":"17","bartintcolor":"#F2F2F2","border-top-color":"#F2F2F2","border-width":"1"},"FunctionalLocationFilterPage":{"anchorcolor":"#445E75"},"Title":{"font-color":"#4A4A4A","font-size":"17","font-weight":"600"},"WorkOrderDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"MeasuringPointDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"NotificationDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"NotificationItemTaskDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"NotificationTaskDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"WorkOrderOperationDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"SubOperationDetailsPage_ToolBar":{"font-color":"#3678AF","bartintcolor":"#F8F8F8"},"SideDrawerBackground":{"background-color":"white"},"SideDrawerHeaderBackground":{"background-color":"white"},"SideDrawerHeaderIcon":{"font-size":"16","font-color":"#FF0000","background-color":"#000000"},"SideDrawerHeadline":{"font-color":"black"},"SideDrawerSubHeadline":{"font-style":"italic"},"SideDrawerHeaderSeparator":{"border-bottom-color":"#f2f2f2","border-bottom-width":"30"},"SideDrawerHeaderSeparatorAndroid":{"border-bottom-color":"#f2f2f2","border-bottom-width":"1"},"SideDrawerSectionCaption":{"background-color":"#192325","font-color":"black","text-align":"left"},"SideDrawerSectionSeparator":{"border-bottom-color":"#f2f2f2","border-bottom-width":"30"},"SideDrawerSectionSeparatorAndroid":{"border-bottom-color":"#f2f2f2","border-bottom-width":"1"},"SideDrawerItemActive":{"background-color":"white","font-color":"black","text-align":"left"},"SideDrawerItemInactive":{"font-color":"black","text-align":"left"},"SideDrawerItemOnPress":{"background-color":"white","font-color":"black","text-align":"left"},"SideDrawerHeaderIconText":{"font-size":"16","font-color":"#FF0000"},"SideDrawerHeaderIconBackground":{"background-color":"#000000"},"SectionCaption":{"background-color":"#adadeb","font-color":"red","text-align":"left"},"SectionSeparator":{"border-bottom-color":"#f2f2f2","border-bottom-width":"7"},"SectionItemActive":{"border-bottom-color":"#E8E8ED","border-bottom-width":"1"},"SectionItemInactive":{"border-bottom-color":"#E8E8ED","border-bottom-width":"1"},"SectionItemOnPress":{"border-bottom-color":"#E8E8ED","border-bottom-width":"1"},"SerialNumberStatusText":{"padding":"14","font-size":"16"},"ContextMenuGreen":{"background-color":"#79d2a6","font-color":"white"},"RejectedRed":{"font-color":"#BB0000","font-size":"12"},"AcceptedGreen":{"font-color":"#107E3E"},"Color_2A6D3C":{"font-color":"#3A835B"},"Color_0000":{"font-color":"#000000"},"Color_DE890D":{"font-color":"#FFA325"},"Color_930A0A":{"font-color":"#D9364C"},"Color_AFD149":{"font-color":"#3A835B"},"ZCardTittleGreen":{"font-color":"#6FAB28"},"ZCardTittleOrange":{"font-color":"#F7BF04"},"ZCardTittleBlack":{"font-color":"#000000"}}');

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/jsconfig.json":
/*!**********************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/jsconfig.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/FrieghtAppDetail/package-lock.json":
/*!**************************************************************!*\
  !*** ./build.definitions/FrieghtAppDetail/package-lock.json ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"FrieghtAppDetail","lockfileVersion":3,"requires":true,"packages":{}}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"module":"esnext","target":"es2019","moduleResolution":"node","lib":["esnext","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/sharing */
/******/ 	(() => {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = (name, initScope) => {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = (msg) => {
/******/ 				if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 			};
/******/ 			var uniqueName = undefined;
/******/ 			var register = (name, version, factory, eager) => {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = (id) => {
/******/ 				var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/consumes */
/******/ 	(() => {
/******/ 		var parseVersion = (str) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var p=p=>{return p.split(".").map((p=>{return+p==p?+p:p}))},n=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(str),r=n[1]?p(n[1]):[];return n[2]&&(r.length++,r.push.apply(r,p(n[2]))),n[3]&&(r.push([]),r.push.apply(r,p(n[3]))),r;
/******/ 		}
/******/ 		var versionLt = (a, b) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			a=parseVersion(a),b=parseVersion(b);for(var r=0;;){if(r>=a.length)return r<b.length&&"u"!=(typeof b[r])[0];var e=a[r],n=(typeof e)[0];if(r>=b.length)return"u"==n;var t=b[r],f=(typeof t)[0];if(n!=f)return"o"==n&&"n"==f||("s"==f||"u"==n);if("o"!=n&&"u"!=n&&e!=t)return e<t;r++}
/******/ 		}
/******/ 		var rangeToString = (range) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var r=range[0],n="";if(1===range.length)return"*";if(r+.5){n+=0==r?">=":-1==r?"<":1==r?"^":2==r?"~":r>0?"=":"!=";for(var e=1,a=1;a<range.length;a++){e--,n+="u"==(typeof(t=range[a]))[0]?"-":(e>0?".":"")+(e=2,t)}return n}var g=[];for(a=1;a<range.length;a++){var t=range[a];g.push(0===t?"not("+o()+")":1===t?"("+o()+" || "+o()+")":2===t?g.pop()+" "+g.pop():rangeToString(t))}return o();function o(){return g.pop().replace(/^\((.+)\)$/,"$1")}
/******/ 		}
/******/ 		var satisfy = (range, version) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			if(0 in range){version=parseVersion(version);var e=range[0],r=e<0;r&&(e=-e-1);for(var n=0,i=1,a=!0;;i++,n++){var f,s,g=i<range.length?(typeof range[i])[0]:"";if(n>=version.length||"o"==(s=(typeof(f=version[n]))[0]))return!a||("u"==g?i>e&&!r:""==g!=r);if("u"==s){if(!a||"u"!=g)return!1}else if(a)if(g==s)if(i<=e){if(f!=range[i])return!1}else{if(r?f>range[i]:f<range[i])return!1;f!=range[i]&&(a=!1)}else if("s"!=g&&"n"!=g){if(r||i<=e)return!1;a=!1,i--}else{if(i<=e||s<g!=r)return!1;a=!1}else"s"!=g&&"n"!=g&&(a=!1,i--)}}var t=[],o=t.pop.bind(t);for(n=1;n<range.length;n++){var u=range[n];t.push(1==u?o()|o():2==u?o()&o():u?satisfy(u,version):!o())}return!!o();
/******/ 		}
/******/ 		var ensureExistence = (scopeName, key) => {
/******/ 			var scope = __webpack_require__.S[scopeName];
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) throw new Error("Shared module " + key + " doesn't exist in shared scope " + scopeName);
/******/ 			return scope;
/******/ 		};
/******/ 		var findVersion = (scope, key) => {
/******/ 			var versions = scope[key];
/******/ 			var key = Object.keys(versions).reduce((a, b) => {
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key]
/******/ 		};
/******/ 		var findSingletonVersionKey = (scope, key) => {
/******/ 			var versions = scope[key];
/******/ 			return Object.keys(versions).reduce((a, b) => {
/******/ 				return !a || (!versions[a].loaded && versionLt(a, b)) ? b : a;
/******/ 			}, 0);
/******/ 		};
/******/ 		var getInvalidSingletonVersionMessage = (scope, key, version, requiredVersion) => {
/******/ 			return "Unsatisfied version " + version + " from " + (version && scope[key][version].from) + " of shared singleton module " + key + " (required " + rangeToString(requiredVersion) + ")"
/******/ 		};
/******/ 		var getSingleton = (scope, scopeName, key, requiredVersion) => {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var getSingletonVersion = (scope, scopeName, key, requiredVersion) => {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			if (!satisfy(requiredVersion, version)) warn(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var getStrictSingletonVersion = (scope, scopeName, key, requiredVersion) => {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			if (!satisfy(requiredVersion, version)) throw new Error(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var findValidVersion = (scope, key, requiredVersion) => {
/******/ 			var versions = scope[key];
/******/ 			var key = Object.keys(versions).reduce((a, b) => {
/******/ 				if (!satisfy(requiredVersion, b)) return a;
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key]
/******/ 		};
/******/ 		var getInvalidVersionMessage = (scope, scopeName, key, requiredVersion) => {
/******/ 			var versions = scope[key];
/******/ 			return "No satisfying version (" + rangeToString(requiredVersion) + ") of shared module " + key + " found in shared scope " + scopeName + ".\n" +
/******/ 				"Available versions: " + Object.keys(versions).map((key) => {
/******/ 				return key + " from " + versions[key].from;
/******/ 			}).join(", ");
/******/ 		};
/******/ 		var getValidVersion = (scope, scopeName, key, requiredVersion) => {
/******/ 			var entry = findValidVersion(scope, key, requiredVersion);
/******/ 			if(entry) return get(entry);
/******/ 			throw new Error(getInvalidVersionMessage(scope, scopeName, key, requiredVersion));
/******/ 		};
/******/ 		var warn = (msg) => {
/******/ 			if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 		};
/******/ 		var warnInvalidVersion = (scope, scopeName, key, requiredVersion) => {
/******/ 			warn(getInvalidVersionMessage(scope, scopeName, key, requiredVersion));
/******/ 		};
/******/ 		var get = (entry) => {
/******/ 			entry.loaded = 1;
/******/ 			return entry.get()
/******/ 		};
/******/ 		var init = (fn) => (function(scopeName, a, b, c) {
/******/ 			var promise = __webpack_require__.I(scopeName);
/******/ 			if (promise && promise.then) return promise.then(fn.bind(fn, scopeName, __webpack_require__.S[scopeName], a, b, c));
/******/ 			return fn(scopeName, __webpack_require__.S[scopeName], a, b, c);
/******/ 		});
/******/ 		
/******/ 		var load = /*#__PURE__*/ init((scopeName, scope, key) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return get(findVersion(scope, key));
/******/ 		});
/******/ 		var loadFallback = /*#__PURE__*/ init((scopeName, scope, key, fallback) => {
/******/ 			return scope && __webpack_require__.o(scope, key) ? get(findVersion(scope, key)) : fallback();
/******/ 		});
/******/ 		var loadVersionCheck = /*#__PURE__*/ init((scopeName, scope, key, version) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return get(findValidVersion(scope, key, version) || warnInvalidVersion(scope, scopeName, key, version) || findVersion(scope, key));
/******/ 		});
/******/ 		var loadSingleton = /*#__PURE__*/ init((scopeName, scope, key) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getSingleton(scope, scopeName, key);
/******/ 		});
/******/ 		var loadSingletonVersionCheck = /*#__PURE__*/ init((scopeName, scope, key, version) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictVersionCheck = /*#__PURE__*/ init((scopeName, scope, key, version) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getValidVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictSingletonVersionCheck = /*#__PURE__*/ init((scopeName, scope, key, version) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getStrictSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadVersionCheckFallback = /*#__PURE__*/ init((scopeName, scope, key, version, fallback) => {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return get(findValidVersion(scope, key, version) || warnInvalidVersion(scope, scopeName, key, version) || findVersion(scope, key));
/******/ 		});
/******/ 		var loadSingletonFallback = /*#__PURE__*/ init((scopeName, scope, key, fallback) => {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getSingleton(scope, scopeName, key);
/******/ 		});
/******/ 		var loadSingletonVersionCheckFallback = /*#__PURE__*/ init((scopeName, scope, key, version, fallback) => {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictVersionCheckFallback = /*#__PURE__*/ init((scopeName, scope, key, version, fallback) => {
/******/ 			var entry = scope && __webpack_require__.o(scope, key) && findValidVersion(scope, key, version);
/******/ 			return entry ? get(entry) : fallback();
/******/ 		});
/******/ 		var loadStrictSingletonVersionCheckFallback = /*#__PURE__*/ init((scopeName, scope, key, version, fallback) => {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getStrictSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var installedModules = {};
/******/ 		var moduleToHandlerMapping = {
/******/ 			"webpack/sharing/consume/default/@nativescript/core": () => (loadSingletonVersionCheck("default", "@nativescript/core", [0])),
/******/ 			"webpack/sharing/consume/default/@nativescript/geolocation": () => (loadSingletonVersionCheck("default", "@nativescript/geolocation", [0]))
/******/ 		};
/******/ 		var initialConsumes = ["webpack/sharing/consume/default/@nativescript/core","webpack/sharing/consume/default/@nativescript/geolocation"];
/******/ 		initialConsumes.forEach((id) => {
/******/ 			__webpack_require__.m[id] = (module) => {
/******/ 				// Handle case when module is used sync
/******/ 				installedModules[id] = 0;
/******/ 				delete __webpack_require__.c[id];
/******/ 				var factory = moduleToHandlerMapping[id]();
/******/ 				if(typeof factory !== "function") throw new Error("Shared module is not available for eager consumption: " + id);
/******/ 				module.exports = factory();
/******/ 			}
/******/ 		});
/******/ 		// no chunk loading of consumes
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("webpack/container/entry/bundle.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map