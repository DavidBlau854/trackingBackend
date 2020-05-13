const logic = require("./routingLogic");

const welcome = (req, res) => {
  res.send("hello woeffrls");
};

const getDocs = (req, res) => {
  const ans = logic.getDocs();
  res.send(ans);
};

const postDoc = (req, res) => {
  logic.postDoc(req.body);
  res.sendStatus(200);
};

const getDocId = (req, res) => {
  const ans = logic.getDocId(req.params.id);
  res.send(ans);
};
const putDoc = (req, res) => {
  const ans = logic.putDoc(req.params.id, req.body);
  res.sendStatus(200);
};
const deleteDoc = (req, res) => {
  const ans = logic.deleteDoc(req.params.id);
  res.sendStatus(200);
};

const postEvent = (req, res) => {
  const id = req.params.id;
  const event = req.body;
  logic.postEvent(id, event);
  const ans = logic.getDocId(req.params.id);
  res.send(ans);
};
module.exports = {
  welcome,
  getDocs,
  getDocId,
  postDoc,
  putDoc,
  deleteDoc,
  postEvent,
};
