const express = require("express");
const {
  createSaloon,
  signInSaloon,
} = require("../../controllers/saloon/saloon.controller");
const upload = require("../../utils/upload");

const saloonRouter = express.Router();

saloonRouter.post("/register", upload.single("avatar"), createSaloon);

saloonRouter.post("/signin", signInSaloon);

module.exports = saloonRouter;
