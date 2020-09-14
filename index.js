require('dotenv').config();
const path = require('path');
const express = require('express');
const sentencesRouter = require('./routes/api/sentences');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const NODE_ENV = process.env.NODE_ENV || 'dev';

const port = process.env.PORT || 8080;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoDbUri =
  NODE_ENV === 'production'
    ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.k98gg.mongodb.net/collabstory?retryWrites=true&w=majority`
    : 'mongodb://localhost/collab-story';
mongoose.connect(mongoDbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,
});
const db = mongoose.connection;

db.on('error', err => console.log(err));

app.use(express.static(path.join(__dirname, 'client', 'collab-story', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'collab-story', 'build', 'index.html'));
});

app.use('/api/sentences', sentencesRouter);

if (NODE_ENV === 'dev') {
  app.listen(port, () => console.log(`CollabStory backend running on port ${port}`));

  module.exports.app = app;
}

module.exports.handler = serverless(app);
