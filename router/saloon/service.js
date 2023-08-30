const express = require("express");
const {
  addService,
  deleteService,
  getAllService,
  getSingleService,
} = require("../../controllers/saloon/service.controller");
const { SaloonAuthUser } = require("../../middleware/requireAuth");
const upload = require("../../utils/upload");
const saloonserviceRouter = express.Router();

saloonserviceRouter.post(
  "/addService",
  SaloonAuthUser,
  upload.array("files"),
  addService
);

saloonserviceRouter.get("/getServices", SaloonAuthUser, getAllService);
saloonserviceRouter.delete("/removeService/:id", SaloonAuthUser, deleteService);
saloonserviceRouter.get("/getService/:id", SaloonAuthUser, getSingleService);
module.exports = saloonserviceRouter;
