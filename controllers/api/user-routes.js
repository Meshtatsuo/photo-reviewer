const router = require('express').Router();
const {
    Comment
} = require('../../models');

router.get('/:id', (req,res) => {
//Get route for single user excluding password
const singleUser = {
    id: req.body.id,
    username: req.body.username,
    email: req.body.email
}
res.send(`Id:  ${id} Username: ${username} Email: ${email} `);
})

router.get('/', (req,res) => {
//Get route for all users excluding password
const userData = {
    id: req.body.id,
    username: req.body.username,
    email: req.body.email
}
res.send(`Id:  ${id} Username: ${username} Email: ${email} `);
})

router.post('/:id/create', (req,res) => {
//Post route to create a user

})
module.exports = router;