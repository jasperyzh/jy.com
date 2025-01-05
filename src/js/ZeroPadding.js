/**
 * zero padding for numbers
 * @param {*} number
 * @param {*} padding
 * @returns
 */
export default function addZeroPadding(number, padding) {
    return number.toString().padStart(padding, "0");
    // console.log(addZeroPadding(5, 3)); // "005"
    // console.log(addZeroPadding(123, 5)); // "00123"
    // console.log(addZeroPadding(1234, 2)); // "1234"
}
