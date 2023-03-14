const express = require("express");
const {
  addSpecialist,
} = require("../../controllers/saloon/specialist.controller");

const requireAuth = require("../../middleware/requireAuth");

const saloonspecialistRouter = express.Router();

saloonspecialistRouter.post("/addSpecialist", requireAuth, addSpecialist);

module.exports = saloonspecialistRouter;
