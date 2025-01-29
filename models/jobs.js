const mongoose = require('mongoose');

const jobsSchema = mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
             },
             company: {
        type: String,
        required: true
             },
      jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], // Possible job types
        required: true
      },
      company: {
        type: String,
        required: true
      },
      department: {
        type: String,
        required: true
      },
      period: {
        type: String,
        enum: ['Immediate', '1 month', '2 months', '3 months'], // Possible periods
        required: true
      },
      expectedSalary: {
        type: Number,
        required: true,
        min: 0 // Salary should be a positive number
      },
      experience: {
        type: String,
        required: true,
        enum: ['Fresher', '1-2 years', '3-5 years', '5+ years'] // Possible experience levels
      },
      location: {
        type: String,
        required: true
      },
      jobDescription: {
        type: String,
        required: true,
        minlength: 10 // Minimum length for job description
      },
   
      createdAt: {
        type: Date,
        default: Date.now // Sets the date when the job was created
      },

      jobDeadline: {
        type: Date,
        required: true

      }
    });

    

const Job = mongoose.model('Job', jobsSchema);

module.exports = Job;