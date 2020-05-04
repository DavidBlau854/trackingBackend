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

app.get("/", (req, res) => {
  res.send("hello woeffrls");
});

app.get("/docs", (req, res) => {
  const ans = fn.getDocs();
  res.send(ans);
});

app.post("/doc", (req, res) => {
  fn.postDoc(req.body);
  res.sendStatus(200);
});

app.get("/doc/:id", (req, res) => {
  const ans = fn.getDocId(req.params.id);
  res.send(ans);
});
app.put("/doc/:id", (req, res) => {
  const ans = fn.putDoc(req.params.id, req.body);
  res.sendStatus(200);
});
app.delete("/doc/:id", (req, res) => {
  const ans = fn.deleteDoc(req.params.id);
  res.sendStatus(200);
});

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
