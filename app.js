const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/router');
const path=require('path')

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the router
app.use('/', router);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
