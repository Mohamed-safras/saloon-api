const jwt = require("jsonwebtoken");
const { saloonModel } = require("../models/saloon/saloon.model");
const { userModel } = require("../models/client/user.model");

const SaloonAuthUser = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(401).json({
        status: "failure",
        code: 401,
        message: "Authorization token is required",
      });
    }

    if (authorization.includes("Bearer")) {
      const token = authorization.split(" ")[1];
      const { _id } = jwt.verify(token, process.env.JSONWEBTOKEN);
      const saloon = await saloonModel.findOne({
        _id,
        // role: "saloon",
      });

      if (!saloon) {
        return res.status(401).json({
          status: "failure",
          code: 401,
          message: "You are not authorized.",
        });
      }

      req.user = saloon._id;

      next();
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const AuthUser = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(401).json({
        status: "failure",
        code: 401,
        message: "Authorization token is required",
      });
    }

    if (authorization.includes("Bearer")) {
      const token = authorization.split(" ")[1];
      const { _id } = jwt.verify(token, process.env.JSONWEBTOKEN);
      const user = await userModel.findOne({
        _id,
      });

      if (!user) {
        return res.status(401).json({
          status: "failure",
          code: 401,
          message: "You are not authorized.",
        });
      }

      req.user = user._id;

      next();
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { SaloonAuthUser, AuthUser };
