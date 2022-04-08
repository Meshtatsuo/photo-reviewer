const router = require('express').Router();
const multer = require('multer');
const sequelize = require('../../config/connection');
const {
    uploadFile
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
    if (req.session) {
        Post.findAll({
                attributes: ['id', 'title', 'image_key', 'alt_text', 'description', 'isApproved', 'client_id', 'user_id', 'created_at'],
                include: [{
                        model: Comment,
                        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                        include: {
                            model: User,
                            attributes: ['username'],
                        },
                    },
                    {
                        model: User,
                        attributes: ['username'],
                    }
                ]
            })
            .then((dbPostData) => res.json(dbPostData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    } else {
        res.render('login');
    }
})

router.get('/:id', (req, res) => {
    // find one post if user is logged in
    if (req.session) {
        Post.findOne({
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'title', 'image_key', 'alt_text', 'description', 'isApproved', 'client_id', 'user_id', 'created_at'],
                include: [{
                        model: Comment,
                        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                        include: {
                            model: User,
                            attributes: ["username", "isCreator"],
                        },
                    },
                    {
                        model: User,
                        attributes: ["username", "isCreator"],
                    },
                ],
            }, )
            .then((dbPostData) => {
                const post = dbPostData.get({
                    plain: true
                });
                //display post page
                res.render('viewPhoto', {
                    post,
                    loggedIn: req.session.loggedIn,
                    username: req.session.username,
                    isCreator: req.session.isCreator
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    } else {
        res.render('login');
    };


})

router.post('/', upload.single('image'), async (req, res) => {


    // only do things if user logged in
    const {
        filename,
        path
    } = req.file

    await uploadFile(req.file);

    const image_key = `/api/images/${filename}`;

    console.log("Saving post: ", image_key);
    Post.create({
            title: req.body.title,
            image_key: image_key,
            alt_text: req.body.alt_text,
            description: req.body.description,
            isApproved: false,
            client_id: req.body.client_id,
            user_id: req.session.user_id // CHANGE TO REQ.SESSION AFTER TESTING
        })
        .then((dbPostData) => {
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })

})

router.put('/', (req, res) => {
    if (req.session.isCreator) {
        res.status(400);
    } else {
        Post.update({
                isApproved: true
            }, {
                where: {
                    id: req.body.post_id
                }
            })
            .then((dbPostData) => {
                if (!dbPostData) {
                    res.status(404).json({
                        message: "No post found with this id",
                    });
                    return;
                }
                res.json(dbPostData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    }

})

module.exports = router;