const serviceModel = require("../../models/saloon/service.model");
const mongoose = require("mongoose");
const cloudinary = require("../../utils/cloudinary");
const validator = require("validator");

const addService = async (req, res) => {
  const { serviceTitle, gender, price, style, specialists, serviceType } =
    req.body;
  const saloon_id = req.user;
  const files = req.files;
  const serviceImages = [];

  try {
    const service = await serviceModel.findOne({ saloon_id, serviceTitle });

    if (!service) {
      if (validator.isEmpty(serviceTitle)) {
        return res.status(400).json({
          message: "service name is required",
          code: 400,
          status: "failure",
        });
      }

      if (validator.isEmpty(serviceType)) {
        return res.status(400).json({
          message: "service type is required",
          code: 400,
          status: "failure",
        });
      }

      for (const file of files) {
        if (file.path) {
          await cloudinary.uploader.upload(
            file.path,
            {
              folder: "service",
              use_filename: false,
            },
            (error, result) => {
              if (error) {
                console.log(error);
              } else {
                serviceImages.push(result.url);
              }
            }
          );
        }
      }

      const newSerive = await serviceModel.create({
        serviceTitle,
        serviceImages,
        gender,
        price,
        style,
        specialists,
        saloon_id,
        serviceType,
      });
      return res.status(201).json(newSerive);
    }

    return res.status(400).json({
      message: "You already added like this service",
      code: 400,
      status: "failure",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllService = async (req, res) => {
  const saloon_id = req.user;

  try {
    const response = await serviceModel.find({ saloon_id });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteService = async (req, res) => {
  const saloon_id = req.user;
  const _id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res
        .status(400)
        .json({ message: "invalid service id", code: 400, status: "failure" });
    }

    if (!mongoose.Types.ObjectId.isValid(saloon_id)) {
      return res.status(400).json({
        message: "saloon id is not valid",
        code: 400,
        status: "failure",
      });
    }

    const response = await serviceModel.findOneAndDelete({ _id, saloon_id });
    if (!response) {
      return res.status(400).json({
        message: "service does not exists",
        code: 400,
        status: "failure",
      });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addService,
  deleteService,
  getAllService,
};
