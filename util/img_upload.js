require("dotenv").config();

const accessKey = process.env.S3_ACCESSKEY;
const secretKey = process.env.S3_SECRETKEY;
const regioin = process.env.S3_REGION;
const bucket = process.env.S3_BUCKETNAME;

var S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const s3 = new S3({
  region,
  accessKey,
  secretKey,
});

function uploadFile(file) {
  let fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucket,
    Key: file.filename,
    Body: fileStream,
  };

  return s3.upload(uploadParams).promise();
}

function getFile(fileKey) {
  const downloadParams = {
    Bucket: bucket,
    Key: fileKey,
  };

  let fileStream = s3.getObject(downloadParams).createReadStream();
  return fileStream;
}

module.exports = {
  uploadFile: uploadFile(),
  getFile: getFile(),
};
