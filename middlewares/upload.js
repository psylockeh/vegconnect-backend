const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../services/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "vegconnect_postagens",
    upload_preset: "vegconnect_perfil",
    resource_type: "auto",
  },
});

const upload = multer({ storage });

module.exports = upload;
