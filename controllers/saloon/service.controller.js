const serviceModel = require("../../models/saloon/service.model");
const mongoose = require("mongoose");
const addService = async (req, res) => {
  const { serviceTitle, serviceType, gender, price, style, specialists } =
    req.body;

  const saloon_id = req.user;

  try {
    const service = await serviceModel.findOne({ saloon_id, serviceTitle });

    if (service) {
      return res
        .status(400)
        .json({ error: "You already added like this service" });
    }

    const newSerive = await serviceModel.create({
      serviceTitle,
      serviceType,
      gender,
      price,
      style,
      specialists,
      saloon_id,
    });
    return res.status(200).json(newSerive);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const deleteService = async (req, res) => {
  const saloon_id = req.user;
  const _id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "invalid service id" });
    }

    if (!mongoose.Types.ObjectId.isValid(saloon_id)) {
      return res.status(400).json({ error: "saloon id is not valid" });
    }

    const response = await serviceModel.findOneAndDelete({ _id, saloon_id });
    if (!response) {
      return res.status(400).json({ error: "service does not exists" });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addService,
  deleteService,
};
