const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const cookieSession = require("cookie-session");

const app = express();

var corsOptions = {
    origin: "http://localhost:4242"
};

app.use(cors(corsOptions));

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(
    cookieSession({
        name: "MERN-session",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true
    })
);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

const port = process.env.port || 4242;
app.listen(port, () => console.log('Listening localhost:4242'));