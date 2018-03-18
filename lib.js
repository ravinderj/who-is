const fs = require("fs");
const qs = require("querystring");

const createField = function (fieldName, fieldValue) {
  let fieldInfo = {};
  fieldInfo.title = fieldName;
  fieldInfo.value = fieldValue;
  fieldInfo.short = true;
  return fieldInfo;
};

const createInfoFields = function (userInfo) {
  let fields = [];
  for (const key in userInfo) {
    let value = userInfo[key];
    let fieldInfo = createField(key, value);
    fields.push(fieldInfo);
  }
  return fields;
};

const createAttachments = function (userInfo) {
  let name = userInfo.name || userInfo.Name || "Person";
  let attachments = {
    "attachments": [{
      "color": "#3C4D9C",
      "text": `Information about ${name}`,
      "fields": createInfoFields(userInfo)
    }]
  };
  return attachments;
};

const serveHome = function (req, res) {
  res.send("welcome to Home");
};

const serveInternInfo = function (req, res) {
  let reqBody = req.body;
  let username = reqBody["text"].slice(1);
  const dbStr = fs.readFileSync("./data/database.json");
  const database = JSON.parse(dbStr);
  let userInfo = database[username] || {};
  let attachments = createAttachments(userInfo);
  res.setHeader("Content-Type", "application/json");
  res.json(attachments);
};

module.exports = {
  serveHome,
  serveInternInfo
};
