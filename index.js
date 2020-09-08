const express = require('express');
const sentencesRouter = require('./routes/api/sentences');

const mongoose = require('mongoose');

const port = process.env.PORT || 8080;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/collab-story', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', err => console.log(err));

app.get('/', (req, res) => res.send('Welcome to CollabStory!'));

app.use('/api/sentences', sentencesRouter);

app.listen(port, () => console.log(`CollabStory backend running on port ${port}`));
