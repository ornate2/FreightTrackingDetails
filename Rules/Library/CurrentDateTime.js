import ODataDate from './ODataDate';

export default function CurrentDateTime(context) {
    let odataDate = new ODataDate();
    return odataDate.toDBDateTimeString(context);
}
