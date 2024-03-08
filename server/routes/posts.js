const express = require('express');
const router = express.Router();
const { Posts } = require('../models');



const validatePostTextLength = (req, res, next) => {
    const { postText } = req.body;
  
    // Set your desired maximum length
    const maxLength = 280;
  
    if (postText.length > maxLength) {
      return res.status(400).json({ error: 'postText exceeds the maximum length' });
    }
  
    // If validation passes, continue to the next middleware or route handler
    next();
  };

  
router.get("/", async (req, res) =>{
    const listOfPosts = 
    await Posts.findAll();

    res.json(listOfPosts);
});

router.get("/:id", async (req,res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
})

router.post("/", validatePostTextLength, async (req,res) => {
    try{
        const post = req.body;
        await Posts.create(post);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

module.exports = router;