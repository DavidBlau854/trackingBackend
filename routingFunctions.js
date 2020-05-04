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

module.exports = {
  welcome,
  getDocs,
  getDocId,
  postDoc,
  putDoc,
  deleteDoc,
};
