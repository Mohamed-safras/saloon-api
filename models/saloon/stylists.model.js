const mongoose = require("mongoose");
const { Point } = require("./saloon.model");

const stylistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: false,
    },
    experience: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      shopNo: String,
      street: String,
      city: String,
      district: String,
      province: String,
      zip: String,
      country: String,

      location: {
        type: Point,
        required: true,
      },
    },
    avatar: {
      type: String,
      required: true,
    },
    feature_images: {
      type: Array,
      required: false,
    },
    service_special: {
      type: Array,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    saloon_id: {
      type: String,
      required: true,
    },
    working_time: {
      type: String,
      required: false,
      enum: ["Part Time", "Full Time"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stylist", stylistSchema);
