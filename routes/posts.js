const express = require('express');
const passport = require('passport');
const postsRouter = express.Router();
const Post = require('../models/Post');

// CREATE
postsRouter.post('/', async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
  });

  try {
    const savedPost = await newPost.save()
    res.json(savedPost);
  } catch (err) {
    res.status(500).send(err)
  }
});

// PROTECTED ROUTE FOR TESTING
postsRouter.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send({ message: 'Hi, I\'m a protected route! At least I hope so Oo' })
});

// READ
postsRouter.get('/', async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.json(allPosts);
  } catch (err) {
    res.status(500).send(err)
  }
});

postsRouter.get('/:id', async (req, res) => {
  try {
    const postById = await Post.findById(req.params.id);
    res.json(postById);
  } catch (err) {
    res.status(500).send(err)
  }
});

// UPDATE
postsRouter.patch('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(500).send(err)
  }
});

// DELETE
postsRouter.delete('/:id', async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.id });
    res.json(removedPost);
  } catch (err) {
    res.status(500).send(err)
  }
});

module.exports = postsRouter;