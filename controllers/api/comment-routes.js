const router = require('express').Router();
const {
    Comment
} = require('../../models');

router.get('/', (req,res) => {
  //route gets all the comments  
})
router.get('/:id', (req,res) => {
//routes gets single comment found by id
})
router.post('/', (req,res) => {
// route create and post comment
})
module.exports = router;