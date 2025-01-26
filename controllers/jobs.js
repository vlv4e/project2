const express = require("express")
const router = express.Router()

const User = require('../models/user')
const Applicant = require('../models/apllications')
const Job = require('../models/jobs')
const UserProfile = require('../models/userProfile')




// ALl routes for application

// controllers/applications.js

router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id)

      console.log(currentUser.Applicant)
      res.render('applications/jobs/index.ejs',{job:currentUser.job});
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  


router.get("/new", async(req,res)=>{
    res.render("applications/job/new")

})

router.post("/",async(req,res)=>{

    try{
        // const currentUser = await User.findByIdAndUpdate(req.session.user._id, {$push:{Applicant:req.body}})

        const currentUser = await User.findById(req.session.user._id);

        currentUser.Applicant.push(req.body)

        await currentUser.save()

        res.redirect(`/users/${currentUser._id}/Applicant`)
         

        console.log(currentUser)
    
    }catch(err){
        console.log(err);
        res.redirect('/');     
    }
})

router.get('/:applicationId',async(req,res)=>{
  try{

    const currentUser = await User.findById(req.session.user._id)

    console.log(currentUser)

    const application = currentUser.Applicant.id(req.params.applicationId)

    console.log(application)

    res.render("applications/job/show.ejs",{Applicant:Applicant})
  
  }catch(error){
    console.log(error)
    res.redirect("/")
  }
})

router.delete("/:applicationId",async (req,res)=>{
  try{
    const currentUser = await User.findById(req.session.user._id)

    currentUser.Applicant.id(req.params.applicationId).deleteOne()

    await currentUser.save()

    res.redirect(`/users/${currentUser._id}/Applicant`)

  }catch(error){
    console.log(error)
    res.redirect("/")
  }
})


router.get('/:applicationId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.Applicant.id(req.params.applicationId);
    res.render('Applicant/edit.ejs', {
      Applicant: Applicant,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put("/:applicationId",async(req,res)=>{
  const currentUser = await User.findById(req.session.user._id)

  const application = currentUser.Applicant.id(req.params.applicationId)

  application.set(req.body)

  await currentUser.save()

  res.redirect(`/users/${currentUser._id}/Applicant/${req.params.applicationId}`)

})


module.exports = router