const express = require('express');
const path = require('path');
require('dotenv').config();
const routes = require('./routes');
const api = require('./api');

const app = express();
const port = process.env.PORT || 2000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// set up json parsing for req.body
app.use(express.json());

// set up static directory
app.use(express.static(path.join(__dirname, 'static')));

// setting up the routes
app.use(routes());


// setup api endpoints
app.use('/api', api());

app.listen(port, () => console.log(`Fittrack app listening at http://localhost:${port}`));
