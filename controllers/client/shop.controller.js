const { ObjectId } = require("mongodb");
const { saloonModel } = require("../../models/saloon/saloon.model");

const getShops = async (req, res) => {
  try {
    const response = await saloonModel.find();
    if (!response) {
      throw new Error("No Shops found");
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getSingleShopById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }
    const response = await saloonModel.findById(id);

    if (!response) {
      return res.status(400).json({ message: "No shop found" });
    }

    const { title, email, phone, avatar, _id } = response;
    return res.status(200).json({ title, email, phone, avatar, _id });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getShops, getSingleShopById };
