const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Point = new mongoose.Schema({
  coordinates: {
    type: [Number],
    required: true,
  },
});

const TimeRange = new mongoose.Schema({
  open: {
    type: String,
    required: true,
  },
  close: {
    type: String,
    required: true,
  },
});

const SaloonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "saloon", "admin"],
      required: true,
    },
    avatar: { type: String, required: true },
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
    phone: {
      type: Number,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: false,
    },
    opening_hours: {
      type: TimeRange,
      required: false,
    },
  },

  { timestamps: true }
);

SaloonSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

SaloonSchema.methods.isPassWordMatch = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

const saloonModel = mongoose.model("saloon", SaloonSchema);

module.exports = {
  saloonModel,
  Point,
};
