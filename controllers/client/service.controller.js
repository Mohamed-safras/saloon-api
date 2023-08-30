const { ObjectId } = require("mongodb");
const serviceModel = require("../../models/saloon/service.model");

const getServices = async (req, res) => {
  const { salonid } = req.params;

  try {
    if (!ObjectId.isValid(salonid)) {
      return res.status(400).json({ message: "Id is not valid" });
    }
    const response = await serviceModel.find({ saloon_id: salonid });
    if (!response) {
      throw new Error("No service found");
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getSingleServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }
    const response = await serviceModel.findById(id);

    if (!response) {
      return res.status(400).json({ message: "No shop found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getServices, getSingleServiceById };
