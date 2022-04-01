const router = require('express').Router();
const sequelize = require('../config/connection');
const path = require('path');
const {
    Post,
    User,
    Comment
} = require('../models');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/testUpload.html'));
})
module.exports = router;