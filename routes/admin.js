const express = require('express');
const router = express.Router();
const posts = require("../model/postebi");
const User = require('../model/user');



router.get('*', function (req, res, next) {

  if (req.isAuthenticated() && req.user.status === "admin") {
    User.find({}, function(err, user){
      if(err) throw err;
      console.log(user);
      res.render('admin', {user}) 
      next()
    
    })
     
     
  } else {
      res.redirect("/users/login")
  }
})

router.get('/add',(req,res)=>{
  res.render('add_post', {
    title: "Add Post"
  })
})
 



module.exports = router;
