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
      required: [true, "Name is required"],

      unique: [false, "name already exists in database!"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email already exists in database!"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["customer", "saloon", "admin"],
      required: [true, "Role is required"],
    },
    avatar: { type: String, required: [true, "Saloon avatar is required"] },
    cloudinary_id: {
      type: String,
    },
    address: {
      shopNo: String,
      street: String,
      city: String,
      district: String,
      zip: String,
      country: String,

      location: {
        type: Point,
        required: true,
      },
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
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
