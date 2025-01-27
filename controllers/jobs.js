const express = require('express');
const jobsRouter = express.Router();
const Job = require('../models/jobs');


//get all jobs
jobsRouter.get("/", async(req,res)=>{
    const allJobs = await Job.find()
    console.log(allJobs)
    res.render("applications/jobs/index.ejs",{allJobs: allJobs})

})


//Create jobs
jobsRouter.get("/create",(req,res)=>{
    res.render("applications/jobs/new.ejs")
})



// Create a new job
jobsRouter.post('/', async (req, res) => {
    try {
        req.body.owner = req.session.user._id; // Set the owner to the logged-in user
        const newJob = await Job.create(req.body); // Create the job
        res.redirect(`/jobs/${newJob._id}`); // Redirect to the newly created job's show page
    } catch (error) {
        console.log(error);
        res.redirect('/'); // Redirect to home on error
    }
});
// Show a specific job
jobsRouter.get('/:jobId', async (req, res) => {
    try {
        console.log("in create")
        const currentJob = await Job.findById(req.params.jobId);
        if (!currentJob) {
            return res.status(404).send('Job not found');
        }
        res.render('applications/jobs/show.ejs', { job: currentJob }); // Pass the job to the view
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
// Edit an existing job
jobsRouter.get('/:jobId/edit', async (req, res) => {
    try {
        const currentJob = await Job.findById(req.params.jobId);
        if (!currentJob) {
            return res.status(404).send('Job not found');
        }
        res.render('applications/jobs/edit.ejs', {
            job: currentJob, // Pass the current job to the view
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
// Update an existing job
jobsRouter.put('/:jobId', async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.jobId, req.body, { new: true }); // Update the job
        if (!updatedJob) {
            return res.status(404).send('Job not found');
        }
        res.redirect(`/jobs/${updatedJob._id}`); // Redirect to the updated job page
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
module.exports = jobsRouter;