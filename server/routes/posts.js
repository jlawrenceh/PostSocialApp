const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');
const {validateToken} = require("../middlewares/AuthMiddleware");


const validatePostTextLength = (req, res, next) => {
    const { postText } = req.body;
  
    // Set your desired maximum length
    const maxLength = 600;
  
    if (postText.length > maxLength) {
      return res.status(400).json({ error: 'postText exceeds the maximum length' });
    }
  
    // If validation passes, continue to the next middleware or route handler
    next();
  };

  
router.get("/", validateToken, async (req, res) => {
    const listOfPosts = await Posts.findAll({ include: [Likes]})
    const likedPosts = await Likes.findAll({where: { UserId: req.user.id} });
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts});

});

router.get("/:id", async (req,res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id , { include: [Likes] });
    res.json(post);
})

router.post("/", validatePostTextLength, validateToken, async (req,res) => {
    try{
        
        const post = req.body;
        post.username = req.user.username;
        await Posts.create(post);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

router.delete("/:postId", validateToken, async (req,res) => {
    const postId = req.params.postId;

    await Posts.destroy({
        where: {
            id: postId
        }
    });

    res.json("Deleted Post"); 
});

module.exports = router;