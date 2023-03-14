const { saloonModel } = require("../../models/saloon/saloon.model");
const validator = require("validator");
const {
  isValidMobilePhone,
  passwordOption,
  passwordError,
} = require("../../validation/validation");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JSONWEBTOKEN, { expiresIn: "3d" });
};

const createSaloon = async (req, res) => {
  const { title, email, password, avatar, phone, address, role } = req.body;

  try {
    if (validator.isEmpty(title)) {
      return res.status(400).json({ error: "Saloon name can not be empty" });
    }

    if (!validator.isStrongPassword(password, passwordOption)) {
      return res.status(400).json({
        error: passwordError,
      });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "Email is not valid, check your email address" });
    }

    if (!isValidMobilePhone(phone)) {
      return res.status(400).json({ error: "phone number is not valid" });
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

      return res.status(200).json({
        token,
        title: newSaloon.title,
        email: newSaloon.email,
        phone: newSaloon.phone,
        address: newSaloon.address,
        role: newSaloon.role,
      });
    } else {
      return res.status(400).json({ error: "user is already exist" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const signInSaloon = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "all field must be filled" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "Email is not valid, check your email address" });
    }

    const saloon = await saloonModel.findOne({ email });

    if (!saloon) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await saloon.isPassWordMatch(password);
    console.log(passwordMatch);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    if (saloon && passwordMatch) {
      const { _id, title, email, address, phone, avatar } = saloon;
      const token = createToken(_id);

      return res.status(200).json({
        success: "You are successfully logged in",
        data: { token, title, _id, email, address, phone, avatar },
      });
    }
  } catch (error) {}
};

module.exports = {
  createSaloon,
  signInSaloon,
};
