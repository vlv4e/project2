// controllers/jobs.js

const express = require('express');
const jobsRouter = express.Router();

const Job = require('../models/jobs');


jobsRouter.post('/', async (req, res) => {
    req.body.owner = req.session.user._id;
    await Job.create(req.body);
    res.redirect("/");
  });

jobsRouter.get("/",(req,res)=>{
    res.render("applications/jobs/new.ejs")
})

jobsRouter.get('/:jobId/edit', async (req, res) => {
    try {
      const currentJob = await Job.findById(req.params.jobId);
      res.render('applications/jobs/edit.ejs', {
        jobs: currentJob,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  jobsRouter.put('/:jobId', async (req, res) => {
    try {
      console.log('jobId:', req.params.jobId);
      console.log('user:', req.session.user);
      res.send(`A PUT request was issued for ${req.params.jobId}`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


module.exports = jobsRouter;
