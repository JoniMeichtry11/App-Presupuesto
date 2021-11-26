const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const bodyparser = require('body-parser')
const salarioRouters = require('../app/routes/routes');
const app = express();

// middleware

app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true 
}));
app.use(salarioRouters);

// environment variables
app.set('port', process.env.PORT || 3000);

module.exports = app;