require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

require("./app_api/models/db");
var s3Router = require('./routes/s3.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var config = require('./config/index.js');
var apiRouter = require('./app_api/routes/index');

const passport = require('passport');
require('./app_api/config/passport');

var app = express();

app.use(passport.initialize());

const corsOptions = {
  origin: 'https://netflix-clone-backend-alihappy.vercel.app/api',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/s3', s3Router);

app.listen(config.PORT, () => console.log(`Server is running... ${config.PORT}`))

module.exports = app;
