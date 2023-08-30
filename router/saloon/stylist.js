const express = require("express");
const {
  addStylist,
  getAllStylist,
} = require("../../controllers/saloon/stylist.controller");

const { SaloonAuthUser } = require("../../middleware/requireAuth");
const upload = require("../../utils/upload");
const saloonspecialistRouter = express.Router();

saloonspecialistRouter.post(
  "/addStylist",
  SaloonAuthUser,
  upload.array("files"),
  addStylist
);

saloonspecialistRouter.get("/getAllStylists", SaloonAuthUser, getAllStylist);

module.exports = saloonspecialistRouter;
