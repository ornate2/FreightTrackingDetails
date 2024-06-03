import NetworkLib from './NetworkMonitoringLibrary';
import CommonLib from '../Library/CommonLibrary';
import Logger from '../Library/Logger';
import self from './AutoSyncLibrary';
import AutoSyncConstant from '../Constant/AutoSyncConstant';
import GetCurrentLocation from '../Location/GetCurrentLocation';
import locSvcMgr from '../Location/ServiceManager';
import GetCoordinates from '../Location/GetCordinates';
import ApplicationSettings from "../Library/ApplicationSettings";
import ValidationLibrary from '../Library/ValidationLibrary';


export default class AutoSyncLibrary {

    static autoSync(context) {
        const autoSyncConst = "AUTO_SYNC";
        if (self.didThresholdPeriodPass(context)) {
            if (!NetworkLib.isNetworkConnected(context)) {
                Logger.error(autoSyncConst, 'no network connection');
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

            context.getClientData().altKey = ApplicationSettings.getStringArray(context, 'ShipmentObjectArray')[0].altKey,
            context.getClientData().eventName = "LocationUpdate",
            context.getClientData().eventTime = new Date().toJSON();

            CommonLib.setStateVariable(context, 'ShipmentStatusUpdate', context.getClientData());

            return context.executeAction("/FrieghtAppDetail/Actions/Shipment/ShipmentStatusUpdateRest.action");
        }
    }

    static isPeriodicAutoSyncEnabled(context) {
        return AutoSyncConstant.ActivatePeriodicAutoSync;
    }


    static getAutoSyncPeriodValue(context) {
        return AutoSyncConstant.AutoSyncDuration;
    }


    static autoSyncPeriodically(context) {
        // clear previous interval if exists
        const existingInterval = AutoSyncConstant.AutoSyncDuration;;
        if (CommonLib.isDefined(existingInterval)) {
            clearInterval(existingInterval);
            CommonLib.removeStateVariable(context, 'autoSyncIntervalID');
        }
        if (self.isPeriodicAutoSyncEnabled(context)) {
            const interval = self.getAutoSyncPeriodValue(context) * 60 * 1000; // value comes in minutes, so convert to ms

            if(!ValidationLibrary.evalIsEmpty(ApplicationSettings.getStringArray(context, 'ShipmentObjectArray')))
            {
                let shipmentArray = ApplicationSettings.getStringArray(context, 'ShipmentObjectArray');
                if(!ValidationLibrary.evalIsEmpty(shipmentArray[0]))
                {
                    let shipmentObj = shipmentArray[0];
                    //Need input from Pushpak Sir then activate this field 
                    //interval = shipmentObj.plannedDistance;

                }


            }
            const intervalID = setInterval(self.autoSync, interval, context);
            CommonLib.setStateVariable(context, 'autoSyncIntervalID', intervalID);
        }

        return true;
    }


    static didThresholdPeriodPass(context) {
        const thresholdPeriod = AutoSyncConstant.AutoSyncDuration;
        const lastAutoSync = CommonLib.getStateVariable(context, 'lastAutoSyncDateTime');
        if (!CommonLib.isDefined(lastAutoSync)) {
            return true;
        }

        const currentDateTime = new Date();
        const lastAutoSyncDateTime = new Date(lastAutoSync);

        return Math.ceil((currentDateTime - lastAutoSyncDateTime) / 60000) > thresholdPeriod;
    }

}
