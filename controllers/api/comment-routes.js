const router = require('express').Router();
const { json } = require('sequelize/types');
const {
    Comment
} = require('../../models');

router.get('/', (req,res) => {
  //route gets all the comments 
  Comment.findAll()
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});
router.get('/:id', (req,res) => {
    //route gets single comment found by id
    Comment.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  });

router.post('/', (req,res) => {
// route create and post comment
Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id
})
.then(dbCommentData => res.json(dbCommentData))
.catch(err => {
    console.log(err);
    res.status(400).json(err);
});
});

router.delete('/:id', (req,res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;