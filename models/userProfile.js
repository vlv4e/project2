const mongoose = require('mongoose');

const userProfileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference to the User model
    unique: true // Each user should have one profile
  },
  phoneNumber: {
    type: String, // Changed to String to accommodate various formats
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true, // Removes whitespace
    lowercase: true, // Converts email to lowercase
    match: /.+\@.+\..+/ // Basic email 
  },
  skills: {
    type: String, // Array of skills
  },
  experience: {
        type: String,
        required: true,
        minlength: 10 
      },
  
    degree: {
      type: String,
      enum: ['Master degree', 'Bachelor degree', 'Highschool'], 
      required: true
    },
    education: {
        type: String,
        required: true,
        minlength: 10 
      },
  
  createdAt: {
    type: Date,
    default: Date.now // Sets the date when the profile was created
  },
  updatedAt: {
    type: Date,
    default: Date.now // Sets the date when the profile was last updated
  }
});

// Create the UserProfile model
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;