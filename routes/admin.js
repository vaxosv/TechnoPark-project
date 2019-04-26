const express = require('express');
const router = express.Router();
const posts = require("../model/postebi");
const User = require('../model/user');
const Settings = require('../model/settings');


router.get('*', function (req, res, next) {

  if (req.isAuthenticated() && req.user.status === "admin") {
    
    next()
     
     
  } else {
      res.redirect("/users/login")
  }
})

router.get('/',(req,res)=>{
  User.find({}, function(err, user){
    if(err) throw err;
    
    res.render('admin', {user}) 
    
  })
})

router.post('/remove', (req, res)=>{
  let delUser = req.body.name
  
  User.remove({ username: delUser }, function(err) { 
        if (err)  throw err;
        res.redirect('/admin')
    });
});

router.post('/edit', (req, res)=>{

  let bool = req.body.settings;


Settings.findOneAndUpdate(
  { _id: "5cc2d6d59d9d85cffdfb5333" },
  {title: bool},
  
  (err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.redirect('/admin')
  }
);
})



module.exports = router;
