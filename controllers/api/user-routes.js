const router = require('express').Router();
const {
    Comment, User, Post
} = require('../../models');

router.get('/', (req,res) => {
//Get route for all users
User.findAll ({
    attributes: { exclude: ['password'] }
})
.then(dbUserData => res.json(dbUserData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.get('/:id', (req,res) => {
//Get route for single user exluding password
User.findOne ({
    attributes: {exclude: ['password']},
    where: {
        id: req.params.id
    },
})
.then(dbUserData => {
    if (!dbUserData) {
        res.status(404).json({message: 'No user found with this id' });
        return;
    }
    res.json(dbUserData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});
router.post('/', (req,res) => {
//Post route to create a user
User.create({
    username: req.body.username,
    email: req.body.email,
    isCreator: req.body.isCreator,
    creatorId: req.body.creatorId,
    password: req.body.password
})
.then(dbUserData => {
    res.render(login);
    // req.session.save(() => {
    //     req.session.user_id = dbUserData.id;
    //     req.session.username = dbUserData.username;
    //     req.sesssion.loggedIn = true;

    //     res.json(dbUserData);
    // });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});
module.exports = router;