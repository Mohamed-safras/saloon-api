const serviceModel = require("../../models/saloon/service.model");
const mongoose = require("mongoose");
const cloudinary = require("../../utils/cloudinary");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

const addService = async (req, res) => {
  const {
    serviceTitle,
    gender,
    price,
    style,
    specialists,
    serviceType,
    description,
  } = req.body;
  const saloon_id = req.user;
  const files = req.files;
  const serviceImages = [];

  try {
    const service = await serviceModel.findOne({ saloon_id, serviceTitle });

    if (!service) {
      if (validator.isEmpty(serviceTitle)) {
        return res.status(400).json({
          message: "Service title is required",
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
        if (file?.path) {
          await cloudinary.uploader.upload(
            file?.path,
            {
              folder: "service",
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
                serviceImages.push({
                  src: result.secure_url,
                  image_ref: result.public_id,
                });
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
        description,
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

const getSingleService = async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res
        .status(400)
        .json({ message: "invalid service id", code: 400, status: "failure" });
    }
    const response = await serviceModel.findOne({ _id });

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
    const media = await serviceModel.findById(_id);

    if (media) {
      for (const { image_ref } of media?.serviceImages) {
        await cloudinary.uploader.destroy(image_ref);
      }
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

const updateService = async (req, res) => {
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
    const media = await serviceModel.findById(_id);

    if (media) {
      for (const { image_ref } of media?.serviceImages) {
        await cloudinary.uploader.destroy(image_ref);
      }
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
  getSingleService,
};
