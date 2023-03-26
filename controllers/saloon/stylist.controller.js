const stylistModel = require("../../models/saloon/stylists.model");
const validator = require("validator");
const { isValidMobilePhone } = require("../../validation/validation");
const asyncHandler = require("express-async-handler");
const addStylist = async (req, res) => {
  const saloon_id = req.user;
  const {
    name,
    about,
    experience,
    email,
    address,
    phone,
    avatar,
    feature_images,
    service_special,
    working_time,
  } = req.body;

  try {
    if (validator.isEmpty(name)) {
      return res.status(400).json({
        message: "Saloon name can not be empty",
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

    const stylist = await stylistModel.findOne({ email });

    if (stylist) {
      return res.status(200).json({
        message:
          "The email address of the stylist already blongs to another saloon",
        code: 200,
        status: "failure",
      });
    }

    const newStylist = await stylistModel.create({
      name,
      about,
      experience,
      email,
      address,
      avatar,
      feature_images,
      service_special,
      saloon_id,
      phone,
      working_time,
    });

    return res.status(201).json(newStylist);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllStylist = async (req, res) => {
  const saloon_id = req.user;

  try {
    const allStylists = await stylistModel.find({ saloon_id });
    if (!allStylists) {
      return res
        .status(200)
        .json({ message: "No users found", code: 200, status: "success" });
    }
    return res.status(200).json(allStylists);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { addStylist, getAllStylist };
