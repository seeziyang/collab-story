const express = require('express');

const port = process.env.PORT || 8080;

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`CollabStory backend running on port ${port}`));
