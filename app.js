const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./passport.config');
require('dotenv/config');

app.use(bodyParser.json());

app.use(passport.initialize());

const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Start Page');
})

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('connected ;)')
);

app.listen(3000);