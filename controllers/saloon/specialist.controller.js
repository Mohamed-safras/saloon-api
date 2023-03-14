const specialistsModel = require("../../models/saloon/specialists.model");
const validator = require("validator");
const { isValidMobilePhone } = require("../../validation/validation");
const addSpecialist = async (req, res) => {
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
  } = req.body;

  try {
    if (validator.isEmpty(name)) {
      return res.status(400).json({ error: "Saloon name can not be empty" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "Email is not valid, check your email address" });
    }

    if (!isValidMobilePhone(phone)) {
      return res.status(400).json({ error: "phone number is not valid" });
    }

    const specialist = await specialistsModel.findOne({ email });

    if (specialist) {
      return res.status(200).json({
        error:
          "The email address of the specialist already blongs to another saloon",
      });
    }

    const newSpecialist = await specialistsModel.create({
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
    });

    return res.status(200).json(newSpecialist);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { addSpecialist };
