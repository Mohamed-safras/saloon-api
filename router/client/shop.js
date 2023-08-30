const express = require("express");
const {
  getShops,
  getSingleShopById,
} = require("../../controllers/client/shop.controller");
// const upload = require("../../utils/upload");
const { AuthUser } = require("../../middleware/requireAuth");

// console.log(upload.any());
const shopRouter = express.Router();

shopRouter.get("/getShops", AuthUser, getShops);
shopRouter.get("/getShop/:id", AuthUser, getSingleShopById);
module.exports = shopRouter;
