const express = require("express");
const {
  addStylist,
  getAllStylist,
} = require("../../controllers/saloon/stylist.controller");

const requireAuth = require("../../middleware/requireAuth");

const saloonspecialistRouter = express.Router();

saloonspecialistRouter.post("/addStylist", requireAuth, addStylist);

saloonspecialistRouter.get("/getAllStylists", requireAuth, getAllStylist);

module.exports = saloonspecialistRouter;
