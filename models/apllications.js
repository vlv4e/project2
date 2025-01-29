const mongoose = require('mongoose');

const ApplicationSchema = mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference to the User model
    unique: true // Each user should have one profile
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
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
    match: /.+\@.+\..+/ // Basic email validation
  },
  skills: {
    type: [String], // Array of skills
    default: [] // Default to an empty array
  },
  experience: [
    {
      jobTitle: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      },
      description: {
        type: String,
        trim: true,
        maxlength: 500 // Maximum length for experience description
      }
    }
  ],
  education: [
    {
      degree: {
        type: String,
        required: true
      },
      institution: {
        type: String,
        required: true
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      },
      description: {
        type: String,
        trim: true,
        maxlength: 500 // Maximum length for education description
      }
    }
  ],
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
const Applicant = mongoose.model('Applicant', ApplicationSchema);

module.exports = Applicant;