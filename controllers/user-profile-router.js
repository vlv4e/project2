// controllers/user-profile-router.js

const express = require('express');
const userProfileRouter = express.Router();
const UserProfile = require('../models/userProfile'); // Ensure this model is correctly set up

// Define a route for getting user profiles
userProfileRouter.get('/', async (req, res) => {
    try {
        // Fetch user profile data from the database
        const userProfile = await UserProfile.findById(req.session.user._id); // Assuming user ID is stored in session
        if (!userProfile) {
            return res.status(404).send('User profile not found');
        }
        // Render the user profile view
        res.render('user-profile.ejs', { userProfile }); // Adjust the view name and context as needed
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = userProfileRouter;