const stylistModel = require("../../models/saloon/stylists.model");

const { isValidMobilePhone } = require("../../validation/validation");
const cloudinary = require("../../utils/cloudinary");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");
const addStylist = async (req, res) => {
  const { name, experience, email, about, working_time, service_special } =
    req.body;

  const saloon_id = req.user;
  const files = req.files;
  const feature_images = [];

  try {
    if (validator.isEmpty(name)) {
      return res.status(400).json({
        message: "stylist name is required",
        code: 400,
        status: "failure",
      });
    }

    if (validator.isEmpty(email)) {
      return res.status(400).json({
        message: "email is required",
        code: 400,
        status: "failure",
      });
    }
    const service = await stylistModel.findOne({ email, saloon_id });

    if (!service) {
      //   console.log(service)

      for (const file of files) {
        if (file?.path) {
          await cloudinary.uploader.upload(
            file?.path,
            {
              folder: "stylist",
              use_filename: false,
              resource_type: "image",
              unique_filename: false,
              public_id: uuidv4(),
              overwrite: true,
            },
            (error, result) => {
              if (error) {
                console.log(error);
              } else {
                feature_images.push({
                  src: result.secure_url,
                  image_ref: result.public_id,
                });
              }
            }
          );
        }
      }

      const newSerive = await stylistModel.create({
        ...req.body,
        // name,
        feature_images,
        // experience,
        // email,
        // service_special,
        saloon_id,
        // working_time,
        // about,
      });
      console.log(newSerive);
      return res.status(201).json(newSerive);
    }

    return res.status(400).json({
      message: "You already added staff with same Email",
      code: 400,
      status: "failure",
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { addStylist, getAllStylist };
