/* global require */
/* global process */
const fs = require("fs");
const path = require("path");

// Check if 'chrome' folder exists, if not, create it
if (!fs.existsSync("chrome")) {
  fs.mkdirSync("chrome");
}

// Read all the firefox files and replace the chrome files
const files = ["js.js", "background.js"];
// all regex replacements
const replaces = [[/browser([^-])/g, "chrome$1"]];
console.log("Copy Files from Firefox to Chrome:");
for (let file of files) {
  fs.readFile(path.join("firefox", file), "utf8", function (err, data) {
    console.log(path.join("chrome", file));
    if (err) return console.log(err);
    for (let replace of replaces) {
      data = data.replaceAll(replace[0], replace[1]);
    }

    // Write the updated content to a new file in the 'chrome' folder
    fs.writeFile(path.join("chrome", file), data, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
}
console.log("\n");
