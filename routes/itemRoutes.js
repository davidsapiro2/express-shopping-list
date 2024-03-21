"use strict";

const express = require("express");

const { items } = require("../fakeDb");
const { NotFoundError } = require("../expressError");
const router = new express.Router();

router.get("/", function(req, res) {
  return res.json({items});
});

router.post("/", function(req, res) {
  const newItem = req.body;
  items.push(newItem);
  return res.json({added: newItem})
});

router.get("/:name", function(req, res){
  for (let item of items){
    if (item.name === req.params.name){
      return res.json(item)
    }
  }
  throw new NotFoundError("Item does not exist.")
});

router.patch("/:name", function(req, res) {
  for (let item of items){
    if (item.name === req.params.name){
      item.name = req.body.name;
      item.price = req.body.price;
      return res.json({updated: item});
    }
  }
  throw new NotFoundError("Item does not exist.")
});

router.delete("/:name", function(req, res) {
  console.log("in delete", items);
  for (let i = 0; i < items.length; i++) {
    if (items[i].name === req.params.name) {
      items.splice(i, 1);
      return res.json({message: "Deleted"});
    }
  }
  throw new NotFoundError("Item does not exist.")
});


module.exports = router;