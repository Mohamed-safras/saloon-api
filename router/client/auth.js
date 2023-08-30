const express = require("express");
const {
  createUser,
  getUser,
  signIn,
  getShops,
} = require("../../controllers/client/user.controller");
const upload = require("../../utils/upload");
const { AuthUser } = require("../../middleware/requireAuth");

// console.log(upload.any());
const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/signin", signIn);
userRouter.get("/getUser", AuthUser, getUser);

module.exports = userRouter;
