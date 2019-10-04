const s3bucket = require('./config/aws-config').config();

module.exports.deleteFile = (res, imageUrl, cb) => {
    const filename = imageUrl.split('.com/')[1];
    console.log(filename);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename
  };
  s3bucket.deleteObject(params, function(err, data) {
    if (err) {
       res.status(500).json({ error: true, Message: err });
    } else {
      cb(true);
    }
  });
};
