const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const Cocktail = require("../models/Cocktail");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// router.post("/", upload.single("image"), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

router.post("/:id", upload.single("image"), async (req, res, next) => {
  const reqFiles = [];
  const url = req.protocol + "://" + req.get("host");

  console.log(req.files, req.params.id, "upload body");

  console.log(url, "url");
  reqFiles.push(url + "/uploads/" + req.files.filename);
  await Cocktail.updateOne(
    {
      _id: req.params.id,
    },
    { $set: { image: reqFiles } }
  )
    .then(() => {
      res.status(201).json({ message: "Image added" });
    })
    .catch((err) => {
      res.status(404);
      throw new Error("Product not found");
    });
});

module.exports = router;
