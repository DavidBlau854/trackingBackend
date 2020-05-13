const { expect } = require(`chai`);
const superagent = require(`superagent`);

const { boot, shutdown, port } = require(`../index`);
const URL = `http://localhost:5000`;
const exampleObj = { id: 1, value: 1 };

describe(`server`, () => {
  before(async () => {
    boot();
  });

  describe(`testing routes `, () => {
    it(`should get all docs when GET /docs is called `, async () => {
      const ans = await superagent.get(`${URL}/docs`);
      expect(ans.body).to.be.an(`array`);
    });
    it(`should get the required doc when GET /doc/:id is called `, async () => {
      await superagent.post(`${URL}/doc`).send(exampleObj);
      const ans = await superagent.get(`${URL}/doc/1`);
      expect(ans.body).to.be.deep.equal(exampleObj);
    });

    it(`should post doc when POST /doc is called `, async () => {
      //Arrange+Act
      const prevLen = await getNumOfDocs();
      await superagent.post(`${URL}/doc`).send({ id: 2 });
      const curLen = await getNumOfDocs();
      //Assert
      expect(curLen).to.equal(prevLen + 1);
    });

    it(`should update the required doc when PUT /doc/:id is called `, async () => {
      //Arrange + Act
      const newObj = { id: 1, value: 2 };
      await superagent.put(`${URL}/doc/1`).send(newObj);
      const ans = await superagent.get(`${URL}/doc/1`);
      //Assert
      expect(ans.body).to.be.deep.equal(newObj);
    });

    it("should delete the required doc when DELETE /doc/:id is called ", async () => {
      const prevLen = await getNumOfDocs();
      await superagent.delete(`${URL}/doc/1`);
      const curLen = await getNumOfDocs();
      expect(curLen).to.equal(prevLen - 1);
    });
    it("should add event to eventsArray when POST /doc/:id/event ", async () => {
      //Arrange
      const docId = 12;
      await superagent.post(`${URL}/doc`).send({ id: docId, eventsArray: [] });
      const postedDoc = await superagent.get(`${URL}/doc/${docId}`);
      const prevLen = postedDoc.body.eventsArray.length;
      //Act
      await superagent.post(`${URL}/doc/${docId}/event`).send(new Date());
      //Assert
      const postedDoc2 = await superagent.get(`${URL}/doc/${docId}`);
      const postLen = postedDoc2.body.eventsArray.length;
      expect(prevLen).to.equal(postLen - 1);
    });
  });
  after(() => shutdown());
});
const getNumOfDocs = async () => {
  const ans = await superagent.get(`${URL}/docs`);
  const body = ans.body;
  return body.length;
};
