require('dotenv').config();

const express = require('express');
const sentencesRouter = require('./routes/api/sentences');

const mongoose = require('mongoose');

const NODE_ENV = process.env.NODE_ENV || 'dev';

const port = process.env.PORT || 8080;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoDbUri =
  NODE_ENV === 'production'
    ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.k98gg.mongodb.net/collabstory?retryWrites=true&w=majority`
    : 'mongodb://localhost/collab-story';
mongoose.connect(mongoDbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', err => console.log(err));

app.get('/', (req, res) => res.send('Welcome to CollabStory!'));

app.use('/api/sentences', sentencesRouter);

app.listen(port, () => console.log(`CollabStory backend running on port ${port}`));

module.exports = app;
