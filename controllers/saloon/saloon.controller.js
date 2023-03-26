const { saloonModel } = require("../../models/saloon/saloon.model");
const validator = require("validator");
const {
  isValidMobilePhone,
  passwordOption,
  passwordError,
} = require("../../validation/validation");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JSONWEBTOKEN, { expiresIn: "30d" });
};

const createSaloon = async (req, res) => {
  const { title, email, password, avatar, phone, address, role } = req.body;

  try {
    if (validator.isEmpty(title)) {
      return res.status(400).json({
        message: "Saloon name can not be empty",
        code: 400,
        status: "failure",
      });
    }

    if (!validator.isStrongPassword(password, passwordOption)) {
      return res.status(400).json({
        message: passwordError,
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Email is not valid, check your email address",
        code: 400,
        status: "failure",
      });
    }

    if (!isValidMobilePhone(phone)) {
      return res.status(400).json({
        message: "phone number is not valid",
        code: 400,
        status: "failure",
      });
    }

    const saloon = await saloonModel.findOne({ email });

    if (!saloon) {
      const newSaloon = await saloonModel.create({
        title,
        email,
        password,
        role,
        avatar,
        phone,
        address,
      });

      const token = createToken(newSaloon._id);

      return res.status(201).json({
        token,
        title: newSaloon.title,
        email: newSaloon.email,
        phone: newSaloon.phone,
        address: newSaloon.address,
        role: newSaloon.role,
      });
    } else {
      return res.status(400).json({
        message: "user is already exist",
        code: 400,
        status: "failure",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const signInSaloon = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "all field must be filled",
        code: 400,
        status: "failure",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Email is not valid, check your email address",
        code: 400,
        status: "failure",
      });
    }

    const saloon = await saloonModel.findOne({ email });

    if (!saloon) {
      return res.status(400).json({
        message: "Invalid email or password",
        code: 400,
        status: "failure",
      });
    }

    const passwordMatch = await saloon.isPassWordMatch(password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
        code: 400,
        status: "failure",
      });
    }

    if (saloon && passwordMatch) {
      const { _id, title, email, address, phone, avatar } = saloon;
      const token = createToken(_id);

      return res.status(200).json({
        token,
        title,
        _id,
        email,
        address,
        phone,
        avatar,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createSaloon,
  signInSaloon,
};
