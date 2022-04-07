const router = require('express').Router();
const {
    Comment,
    User,
    Post
} = require('../../models');

router.get('/', (req, res) => {
    //Get route for all users
    User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    //Get route for single user exluding password
    User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id
            },
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/client', (req, res) => {
    //Post route to create a user
    User.create({
            username: req.body.username,
            email: req.body.email,
            isCreator: false,
            creator_id: req.session.user_id,
            password: req.body.password
        })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    //Post route to create a user
    User.create({
            username: req.body.username,
            email: req.body.email,
            isCreator: req.body.isCreator,
            creatorId: req.body.creatorId,
            password: req.body.password
        })
        .then(dbUserData => {
            res.render('/login');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



router.post('/login', (req, res) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((dbUserData) => {
        if (!dbUserData) {
            res.status(400).json({
                message: 'No user with that email '
            });
            return;
        } else {
            const validPassword = dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({
                    message: 'Incorrect password'
                });
                return;
            } else {
                console.log(dbUserData.isCreator);
                console.log(dbUserData.id);
                req.session.save(() => {
                    req.session.user_id = dbUserData.id;
                    req.session.username = dbUserData.username;
                    req.session.loggedIn = true;
                    req.session.isCreator = dbUserData.isCreator;

                    res.json({
                        user: dbUserData,
                        message: 'You are now logged in!'
                    })
                })
            }
        }
    })
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;