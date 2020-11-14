require('dotenv').config();

const constants = require('./constants');
const jwt = require('jsonwebtoken');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var routes = require('./routes');

var app = express();

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: "GET,POST,PUT,DELETE",
  credentials: true, //allows session cookies to be sent back and forth
  optionsSuccessStatus: 200 //legacy browsers
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if(token){
      token = token.substring(constants.BEARER_START_INDEX) //remove string Bearer from the token
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
      if(err || !decodedUser){
          return res.status(constants.UNAUTHORIZED).send(`ERROR: ${err}`);
      }

      req.user = decodedUser;//set the decoded payload to req object as the user information(username, id)

      next();// for control to go to the next line of code
  })
}

// app.use('/users', routes.users)
app.use('/auth/verify', verifyToken, routes.auth);
app.use('/auth', routes.auth)
app.use('/cards', routes.cards)
app.use('/decks', verifyToken, routes.decks)








// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


module.exports = app;
