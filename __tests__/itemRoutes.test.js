"use strict";

const request = require("supertest");

const app = require("../app");
let db = require("../fakeDb");

let pickles = { "name": "pickles", "price": 4.50 };

beforeEach(function () {
  db.items.push({...pickles});
  console.log("items", db.items);
});

afterEach(function () {
  db.items = [];
});

describe("item routes", function () {
  it("get list of items", async function () {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ items: [pickles] });
  });

  it("get list of items", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({ name: "oranges", price: 1.79 });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ added: { name: "oranges", price: 1.79 } });
  });

  it("get item", async function () {
    const resp = await request(app).get(`/items/pickles`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(pickles);
  });

  it("update item", async function () {
    const resp = await request(app)
      .patch(`/items/pickles`)
      .send({ name: "dill pickles", price: 2.00 });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ updated: { name: "dill pickles", price: 2.00 } });
  });

  it("delete item", async function () {
    const resp = await request(app).delete(`/items/pickles`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });

});
