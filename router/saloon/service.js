const express = require("express");
const {
  addService,
  deleteService,
} = require("../../controllers/saloon/service.controller");
const requireAuth = require("../../middleware/requireAuth");
const saloonserviceRouter = express.Router();

saloonserviceRouter.post("/addService", requireAuth, addService);
saloonserviceRouter.delete("/removeService/:id", requireAuth, deleteService);
module.exports = saloonserviceRouter;
