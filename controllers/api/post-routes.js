const router = require('express').Router();
const multer = require('multer');
const sequelize = require('../../config/connection');
const {
    uploadFile
} = require('../../util/img_upload');

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
                            attributes: ["username"],
                        },
                    },
                    {
                        model: User,
                        attributes: ["username"],
                    },
                ],
            }, )
            .then((dbPostData) => {
                const post = dbPostData.get({
                    plain: true
                });
                //display post page
                res.render('post-view', {
                    post,
                    loggedIn: req.session.loggedIn,
                    username: req.session.username
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

router.post('/', async (req, res) => {

    if (req.session) {
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