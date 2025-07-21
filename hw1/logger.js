const fs = require("fs");

function logMessage(text) {
  fs.appendFile("./log.txt", `${text}\n`, (err) => {
    if (err) {
      console.error("Write error: ", err);
      return;
    }
  });
}

module.exports = { logMessage };
