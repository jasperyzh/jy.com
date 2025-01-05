/**
 * output js-date for website, back to number_date (yymmdd)
 * @param {*} date
 * @returns
 */
export default function dateToNumber(date) {
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(-2);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${year}${month}${day}`;
}

// reverse?
export function numberToDate(num) {
    const str = num.toString();
    const year = parseInt(str.substring(0, 2)) + 2000;
    const month = parseInt(str.substring(2, 4)) - 1;
    const day = parseInt(str.substring(4, 6));
    return new Date(year, month, day);
}
