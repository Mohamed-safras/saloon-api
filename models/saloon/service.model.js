const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceTitle: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "male kids", "female kids"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  saloon_id: {
    type: String,
    required: true,
  },
  style: {
    type: Object,
    required: true,
  },
  specialists: Array,
});

module.exports = mongoose.model("service", serviceSchema);
