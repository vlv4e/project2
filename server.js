// =======================
// 1. IMPORTS
// =======================
const express = require('express');
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
require('dotenv').config();
const mongoose = require("mongoose");
const session = require('express-session');
const path = require("path");

// Import the Job model
const Job = require('./models/jobs'); 

// Controllers
const userProfileController = require('./controllers/user-profile-router.js');
const applicationsController = require('./controllers/applications.js');
const jobsController = require('./controllers/jobs.js');
const authController = require('./controllers/auth.js');

// Middleware
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require('./middleware/pass-user-to-view.js');

// =======================
// 2. MIDDLEWARE
// =======================
app.use(express.urlencoded({ extended: false })); // Parses the request body
app.use(methodOverride("_method")); // Changes the methods for forms
app.use(morgan("dev")); // Logs the requests in the terminal

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passUserToView); // Middleware to pass user to views
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// =======================
// 3. CONNECTION TO DATABASE
// =======================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => { console.log("Connected to DATABASE") })
  .catch(() => { console.log("ERROR CONNECTING TO DB jobs") });

// =======================
// 4. ROUTES
// =======================
app.get("/", async (req, res) => {
  try {
    console.log(req.session.user);

    // Fetch all jobs from the database
    const allJobs = await Job.find();  

    res.render("applications/jobs/index.ejs", {
      user: req.session.user, 
      allJobs: allJobs  // Pass jobs to the EJS template
    });

  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Error retrieving jobs");
  }
});

// Route handlers
app.use('/auth', authController);
app.use('/jobs', jobsController)

app.use(isSignedIn)

app.use('/user-profile-router', isSignedIn, userProfileController);
app.use("/users/:userId/applications/", applicationsController);

// =======================
// 5. LISTENING ON PORT 3001
// =======================
app.listen(3001, () => {
  console.log('Listening on port 3001');
});
