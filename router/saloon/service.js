const express = require("express");
const {
  addService,
  deleteService,
  getAllService,
} = require("../../controllers/saloon/service.controller");
const requireAuth = require("../../middleware/requireAuth");
const upload = require("../../utils/upload");
const saloonserviceRouter = express.Router();

saloonserviceRouter.post(
  "/addService",
  requireAuth,
  upload.array("files"),
  addService
);

saloonserviceRouter.get("/getService", requireAuth, getAllService);
saloonserviceRouter.delete("/removeService/:id", requireAuth, deleteService);
module.exports = saloonserviceRouter;
