import multer from "multer";

export const uploader = multer({
  limits: {
    fileSize: 4000000,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return callback(new Error("Please upload an image"));

    callback(undefined, true);
  },
});
