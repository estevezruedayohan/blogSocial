const express = require("express");
const router = express.Router();

const Controller = require("./index");
const response = require("./../../../network/response");

router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.delete("/:id", deleteUser);

function list(req, res) {
  Controller.list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function get(req, res) {
  Controller.get(req.params.id)
    .then((user) => {
      console.log(user);
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function upsert(req, res) {
  Controller.upsert(req.body)
    .then(() => {
      response.success(req, res, null, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function deleteUser(req, res) {
  const id = req.params.id;
  Controller.deleteUser(id)
    .then(() => {
      response.success(
        req,
        res,
        `Eliminado con éxito el id ${id}`,
        200
      );
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

module.exports = router;
