const db = [];

function getDocs() {
  return db;
}

function getDocId(id) {
  return db.find((doc) => doc.id == id);
}

function postDoc(doc) {
  db.push(doc);
}
function putDoc(id, newDoc) {
  const i = db.findIndex((doc) => doc.id == id);
  db[i] = newDoc;
}
function deleteDoc(id) {
  const i = db.findIndex((doc) => doc.id == id);
  db.splice(i,1)
}
module.exports = {
  getDocs,
  getDocId,
  postDoc,
  putDoc,
  deleteDoc,
};
