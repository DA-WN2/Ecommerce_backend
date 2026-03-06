import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// Define where to store images and what to name them
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Make sure to create an 'uploads' folder in your backend root
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

// Check file type to ensure only images are uploaded
function checkFileType(file, cb) {
  // Add webp to the list!
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only (JPG, PNG, WEBP)!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded",
    image: `/${req.file.path}`,
  });
});

export default router;
