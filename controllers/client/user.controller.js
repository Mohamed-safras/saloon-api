const { userModel } = require("../../models/client/user.model");
const validator = require("validator");
const {
  isValidMobilePhone,
  passwordOption,
  passwordError,
} = require("../../validation/validation");
const cloudinary = require("../../utils/cloudinary");
const jwt = require("jsonwebtoken");
const { saloonModel } = require("../../models/saloon/saloon.model");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JSONWEBTOKEN, { expiresIn: "3d" });
};

const createUser = async (req, res) => {
  const { username, email, password, phone, address } = req.body;

  console.log(req.body);

  try {
    if (validator.isEmpty(username)) {
      return res.status(400).json({
        message: "User Name can not be empty",
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

    if (!isValidMobilePhone(phone)) {
      return res.status(400).json({
        message: "phone number is not valid",
        code: 400,
        status: "failure",
      });
    }

    if (!validator.isStrongPassword(password, passwordOption)) {
      console.log(password);
      return res.status(400).json({
        message: passwordError,
      });
    }

    const saloon = await userModel.findOne({ email, username });

    if (!saloon) {
      // const result = await cloudinary.uploader.upload(file?.path, {
      //   folder: "client",
      //   use_filename: false,
      // });

      // if (!result) {
      //   res.status(400).send({ error: "Error uploading file to Cloudinary" });
      //   return;
      // }

      const newSaloon = await userModel.create({
        username,
        email,
        password,
        phone,
        address,
        // avatar: result.secure_url,
        // cloudinary_id: result.cloudinary_id,
      });

      const token = createToken(newSaloon._id);

      return res.status(201).json({
        token,
      });
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email === 1) {
      return res.status(400).json({
        message: "Email address is already in use",
        code: 400,
        status: "failure",
      });
    }

    return res.status(500).json(error);
  }
};

const signIn = async (req, res) => {
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

    const saloon = await userModel.findOne({ email });

    if (!saloon) {
      return res.status(400).json({
        message: "User does not exists",
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
      const { _id } = saloon;
      const token = createToken(_id);

      return res.status(200).json({
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  const user_id = req.user;
  try {
    const response = await userModel.findOne(user_id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  signIn,
  getUser,
};
