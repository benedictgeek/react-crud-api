const sharp = require("sharp");
const s3bucket = require("./config/aws-config").config();
require("dotenv").config();

const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

module.exports.uploadFile = (res, file, cb) => {
  //change filename here
  const ext = "." + file.mimetype.split("/")[1];
  file.name = Date.now() + ext;
  sharp(file.data)
    .resize({ width: 345 })
    .toBuffer()
    .then(data => {
      const resizedImage = data;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.name,
        Body: resizedImage,
        ContentType: file.mimetype,
        ACL: "public-read"
      };
      s3bucket.upload(params, function(err, data) {
        if (err) {
          res.status(500).json({ error: true, Message: err });
        } else {
          const fileUrl = s3FileURL + file.name;
          cb(fileUrl);
        }
      });
    })
    .catch(err => {
      next(err);
    });
};
