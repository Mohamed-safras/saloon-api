const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = async () => {
  if (!process.env.MONGOURI) {
    throw new Error("check your db connection");
  }
  return await mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
