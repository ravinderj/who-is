const http = require("http");
const PORT = process.env.PORT || 8000;
const app = require("./app.js");

const server = http.createServer(app);
server.listen(PORT);
console.log('server running on port',PORT);
