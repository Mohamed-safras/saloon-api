const multer = require("multer");
const path = require("path");
const cloudinary = require("./cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);

  if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
    cb(new Error("File type is not supported"), false);
    return;
  }
  cb(null, true);
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // format: async (req, file) => "png",
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

module.exports = multer({ storage, fileFilter });
