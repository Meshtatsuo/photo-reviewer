const router = require('express').Router();
const sequelize = require('../../config/connection');
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
});

const {
    uploadFile,
    getFile
} = require('../../util/img_upload')
const {
    Post,
} = require('../../models');

router.get('/', (req, res) => {
    //get all images
})

router.get('/:filename', async (req, res) => {
    console.log("GET IMAGE");
    // get image from s3 bucket for displaying
    const filename = req.params.filename;
    if (filename) {
        try {
            console.log("Looking up S3 image: ", filename);

            const readStream = await getFile(filename);
            console.log(readStream);
            readStream.pipe(res);
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(400).json("Failed to load image");
    }

})

module.exports = router;