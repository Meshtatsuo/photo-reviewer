const router = require('express').Router();
const multer = require('multer');
const sequelize = require('../../config/connection');
const {
    uploadFile,
    getFile
} = require('../../util/img_upload');

const upload = multer({
    dest: 'uploads/'
});
const {
    Post,
    User,
    Comment
} = require('../../models');

router.get('/', (req, res) => {

})

router.get('/:id', (req, res) => {
    // find one post
})

router.post('/', upload.single('image'), async (req, res) => {

    if (req.session || true) {
        // only do things if user logged in
        const {
            filename,
            path
        } = req.file

        await uploadFile(req.file);

        const image_key = `/api/images/${filename}`;

        console.log("Saving post: ", image_key);
        Post.create({
                image_key: image_key,
                alt_text: req.body.alt_text,
                description: req.body.description,
                isApproved: false,
                client_id: req.body.client_id,
                user_id: req.body.id // CHANGE TO REQ.SESSION AFTER TESTING
            })
            .then((dbPostData) => {
                res.json(dbPostData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })


    } else {
        res.render('/login');
    }
})

module.exports = router;