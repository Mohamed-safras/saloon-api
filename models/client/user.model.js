const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User Name is required"],
      unique: [false, "User Name already exists in database!"],
    },
    email: {
      type: String,
      required: [true, "User Name is required"],
      unique: [true, "Email already exists in database!"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    avatar: { type: String, required: false },
    cloudinary_id: {
      type: String,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
    },
  },

  { timestamps: true }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPassWordMatch = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
