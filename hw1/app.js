const { logMessage } = require("./logger");
const { getCurrentTime } = require("./getCurrentTime");

setInterval(() => {
  const time = getCurrentTime();
  logMessage(time);
}, 10000);
