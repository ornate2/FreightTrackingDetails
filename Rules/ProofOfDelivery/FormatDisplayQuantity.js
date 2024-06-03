export default function FormatDisplayQuantity(clientAPI) {
    let value = (clientAPI.binding.dispQty).trim();
    return clientAPI.formatNumber(Number(value));

}