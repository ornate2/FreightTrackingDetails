import NativeScriptObject from './NativeScriptObject';

export default function IsAndroid(context) {
    if (NativeScriptObject.getNativeScriptObject(context).platformModule.isAndroid) {
        return true;
    } else {
        return false;
    }
}
