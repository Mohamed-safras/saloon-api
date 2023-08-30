const { ObjectId } = require("mongodb");
const stylistModel = require("../../models/saloon/stylists.model");

const getStylists = async (req, res) => {
  console.log(req.query);
  const arrayOfIds = req.query.ids;

  console.log(arrayOfIds);
  try {
    const excludeEmpty = req.query.excludeEmpty === "true";
    // if (!ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Id is not valid" });
    // }

    let dbQuery = {};

    if (!excludeEmpty) {
      dbQuery = { _id: { $in: arrayOfIds }, name: { $ne: "" } };
    } else {
      dbQuery = { _id: { $in: arrayOfIds } };
    }

    console.log(dbQuery);
    const response = await stylistModel.find(dbQuery);

    if (!response) {
      return res.status(400).json({ message: "No stylist found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { getStylists };
