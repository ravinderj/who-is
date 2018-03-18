const fs = require("fs");
const Dropbox = require("dropbox");
const accessToken = process.env.ACCESS_TOKEN;
const dropbox = new Dropbox({
  accessToken: accessToken
});

exports.updateDataFile = function (req,res,next) {
  dropbox.filesDownload({path: "/userdata.json"})
    .then(function (response) {
      let dataFilePath = "./data/database.json";
      fs.writeFile(dataFilePath, response.fileBinary, "utf8",next);
    })
    .catch(error => console.error(error));
};
