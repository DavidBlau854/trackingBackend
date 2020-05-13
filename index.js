const express = require("express");
const http = require("http");
const logger = require("morgan");
const bodyParser = require("body-parser");

const fn = require("./routingFunctions");

const app = express();
const port = 5000;

const server = http.createServer(app);

app.use(logger("dev"));
app.use(bodyParser.json());

app.get("/", fn.welcome);
app.get("/docs", fn.getDocs);
app.post("/doc", fn.postDoc);
app.get("/doc/:id", fn.getDocId);
app.put("/doc/:id", fn.putDoc);
app.delete("/doc/:id", fn.deleteDoc);
app.post("/doc/:id/event", fn.postEvent);

if (require.main == module) {
  boot();
} else {
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = port;
}

function boot() {
  server.listen(port, () => console.log(`listening on ${port}`));
}
function shutdown() {
  server.close();
}
