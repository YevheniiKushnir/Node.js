const fs = require("fs");

const FilePath = __dirname + "/info.txt";

fs.writeFile(FilePath, "Node.js is awesome!", (error) => {
  if (error) {
    console.error("Failed to write to the file:", error.message);
  } else {
    console.log("Successfully wrote to the file");

    fs.readFile(FilePath, (error, data) => {
      if (error) {
        console.error("Failed to read the file:", error.message);
      } else {
        console.log("File read successfully:\n", data.toString());
      }
    });
  }
});
