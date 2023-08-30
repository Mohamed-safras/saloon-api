const express = require("express");
const {
  getServices,
  getSingleServiceById,
} = require("../../controllers/client/service.controller");
// const upload = require("../../utils/upload");
const { AuthUser } = require("../../middleware/requireAuth");

// console.log(upload.any());
const serviceRouter = express.Router();

serviceRouter.get("/services/:salonid", AuthUser, getServices);
serviceRouter.get("/service/:id", AuthUser, getSingleServiceById);
module.exports = serviceRouter;
