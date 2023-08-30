const express = require("express");
const { getStylists } = require("../../controllers/client/stylist.controller");
// const upload = require("../../utils/upload");
const { AuthUser } = require("../../middleware/requireAuth");

// console.log(upload.any());
const stylistRouter = express.Router();

stylistRouter.get("/stylists", AuthUser, getStylists);

module.exports = stylistRouter;
