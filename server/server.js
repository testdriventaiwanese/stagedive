// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }
require('dotenv').config();
require('./database/config.js');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
// pass the passport middleware
app.use(passport.initialize());

// serve static files
app.use(express.static(path.join(__dirname, '/../client/')));
app.use(express.static(path.join(__dirname, '/../client/public/')));
app.use(express.static(path.join(__dirname, '/../node_modules')));

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// COMMENT OUT FOR AUTH CHECK MIDDLEWARE
// pass the authenticaion checker middleware
// const authCheckMiddleware = require('./passport/auth-check');
// app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    console.log('Error occurred : ', err);
  }
    // UNCOMMENT FOR WEEKLY REMINDER EMAILS
    // var reminded = false;
    // while(!reminded){
    //   console.log('Starting weekly reminder function');
    //   weeklyReminder(); // function lives in emailHelper.js
    //   reminded = true;
    // }
    console.log('Server is listening to port : ', port);
});
