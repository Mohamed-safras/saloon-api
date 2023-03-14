const jwt = require("jsonwebtoken");
const { saloonModel } = require("../models/saloon/saloon.model");

const SaloonAuthUser = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(400).json({ error: "Authorization token is required" });
    }

    if (authorization.includes("Bearer")) {
      const token = authorization.split(" ")[1];
      const { _id } = jwt.verify(token, process.env.JSONWEBTOKEN);
      const saloon = await saloonModel.findOne({
        _id,
        role: "saloon",
      });

      if (!saloon) {
        return res
          .status(400)
          .json({ error: "You are not allowed to do this operation" });
      }

      req.user = saloon._id;

      next();
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = SaloonAuthUser;
