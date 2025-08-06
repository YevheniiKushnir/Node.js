const fs = require("fs");

const myFolderPath = `${__dirname}/MyFolder`;

fs.mkdir(myFolderPath, (error) => {
  if (error) {
    console.error("Failed to create directory:", error.message);
  } else {
    console.log("Directory created successfully");

    fs.rmdir(myFolderPath, (error) => {
      if (error) {
        console.error("Failed to remove directory:", error.message);
      } else {
        console.log("Directory removed successfully");
      }
    });
  }
});
