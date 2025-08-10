import moment from "moment";

const currDate = moment();
const format1 = currDate.format("DD-MM-YYYY");
const format2 = currDate.format("MMM Do YY");
const format3 = currDate.format("dddd");

console.log("DD-MM-YYYY: ", format1);
console.log("MMM Do YY: ", format2);
console.log("dddd: ", format3);
