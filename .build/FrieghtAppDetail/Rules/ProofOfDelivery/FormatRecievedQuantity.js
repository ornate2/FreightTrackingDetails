export default function FormatRecievedQuantity(clientAPI) {
    let value = (clientAPI.binding.rcvQty).trim();
    return clientAPI.formatNumber(Number(value));

}