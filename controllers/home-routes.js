const router = require('express').Router();
const sequelize = require('../config/connection');
const path = require('path');
const {
    Post,
    User,
    Comment
} = require('../models');

router.get('/', (req, res) => {
    if (!req.session.loggedIn) {
        res.render('login');
    } else {
        res.redirect('/dashboard');
    }
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/loggedout', (req, res) => {
    res.render('loggedout');
})

// DASHBOARD IS THE ROUTE FOR THE MAIN PAGE AFTER LOGGING IN
router.get('/dashboard', (req, res) => {
    if (req.session.isCreator) {
        Post.findAll({
                where: {
                    user_id: req.session.id
                },
                attributes: ['id', 'image_key', 'alt_text', 'description', 'isApproved', 'client_id', 'user_id']
            })
            .then((dbPostData => {
                const posts = dbPostData.map(post => post.get({
                    plain: true
                }))
                res.render('dashboard', {
                    posts,
                    loggeddIn: req.session.loggedIn,
                    username: req.session.username,
                    isCreator: req.session.isCreator
                })
            }));

    } else if (!req.session.isCreator) {
        Post.findAll({
                where: {
                    client_id: req.session.id
                },
                attributes: ['id', 'image_key', 'alt_text', 'description', 'isApproved', 'client_id', 'user_id']
            })
            .then((dbPostData => {
                const posts = dbPostData.map(post => post.get({
                    plain: true
                }))
                res.render('dashboard', {
                    posts,
                    loggeddIn: req.session.loggedIn,
                    username: req.session.username,
                    isCreator: req.session.isCreator
                })
            }));
    } else {
        res.render('login');
    }
})

router.get('/upload', (req, res) => {
    // get all users belonging to the client
    // pass users along to handlebars to create dropdown
    // render login page
    if (req.session) {
        User.findAll({
                where: {
                    creator_id: req.session.user_id
                },
                attributes: {
                    exclude: ['password']
                }
            })
            .then((dbClientData => {
                const clients = dbClientData.map(user => user.get({
                    plain: true
                }))
                res.render('upload', {
                    clients,
                    loggedIn: req.session.loggedIn,
                    isCreator: req.session.isCreator
                })
            }))
    } else {
        res.render('/login');
    }
})



module.exports = router;