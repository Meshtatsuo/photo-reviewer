require("dotenv").config();

const accessKey = process.env.S3_ACCESSKEY;
const secretKey = process.env.S3_SECRETKEY;
const region = process.env.S3_REGION;
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
  // setup upload paramters S3
  const uploadParams = {
    Bucket: bucket,
    Key: file.filename,
    Body: fileStream,
  };
  // upload file and return promise
  // This promise should resolve in the key we need to save
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
