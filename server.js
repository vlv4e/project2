// =======================
// 1. IMPORTS
// =======================
const express = require('express');
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
require('dotenv').config()
const mongoose = require("mongoose")
const session = require('express-session');




// =======================
// 2. MIDDLEWARE
// =======================
app.use(express.urlencoded({ extended: false })); // parses the request body. Needed for the req.body
app.use(methodOverride("_method")); // Will change the methods for
app.use(morgan("dev")); // Logs the requests in the terminal

const isSignedIn = require("./middleware/is-signed-in.js")
const passUserToView = require('./middleware/pass-user-to-view.js')
const applicationsController = require('./controllers/applications.js');
const authController = require('./controllers/auth.js');
const port = process.env.PORT ? process.env.PORT : '3000';

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView); // use new passUserToView middleware here
const path=require("path")
app.use(express.static(path.join(__dirname, "public")));



// middleware/is-signed-in.js

// =======================
// 3. CONNECTION TO DATABASE
// =======================
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("Connected to DATABSE")})
.catch(()=>{console.log("ERROR CONNECTING TO DB jobs")})




// =======================
// 4. ROUTES
// =======================

app.get('/', (req, res) => {
  // Check if the user is signed in
  if (req.session.user) {
    // Redirect signed-in users to their applications index
    res.redirect(`/users/${req.session.user._id}/applications`);
  } else {
    // Show the homepage for users who are not signed in
    res.render('index.ejs');
  }
});


app.use('/auth', authController);

app.use(isSignedIn)

app.use("/users/:userId/applications",applicationsController)










// =======================
// 5. LISTENING ON PORT 3000
// =======================
app.listen(3000, () => {
  console.log('Listening on port 3000');
});