const express = require('express');
const path = require('path');
require('dotenv').config();
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 2000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));

// setting up the routes
app.use(routes());

app.listen(port, () => console.log(`Fittrack app listening at http://localhost:${port}`));
