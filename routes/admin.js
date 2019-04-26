const express = require('express');
const router = express.Router();
const posts = require("../model/postebi");
const User = require('../model/user');



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


// router.get('/add',(req,res)=>{
//   res.render('add_post', {
//     title: "Add Post"
//   })
// })

router.post('/remove', (req, res)=>{
  let delUser = req.body.name
  
  User.remove({ username: delUser }, function(err) { 
        if (err)  throw err;
        res.redirect('/admin')
    });
});



module.exports = router;
