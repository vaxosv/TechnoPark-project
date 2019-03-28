const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const expressValidator = require('express-validator');

let User = require('../model/user');


router.get('/register', (req, res)=>{
    res.render('register')
})

router.post("/register", function (req, res) {
    const name = req.body.name
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const password2 = req.body.password2
    

    req.checkBody("name", "name is required").notEmpty()
    req.checkBody("email", "email is required").notEmpty()
    req.checkBody("email", "email is not waled").isEmail()
    req.checkBody("username", "username is required").notEmpty()
    req.checkBody("password", "password is required").notEmpty()
    req.checkBody("password2", "passwords do not match").equals(password)

    let errors = req.validationErrors()

    if (errors) {
        res.render("register", {
            errors: errors
        })
    } else {
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
           
        })
      bcrypt.gensalt(10,(err, salt)=>{
          bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) {
                console.log(err);
                
            }
            newUser.password = hash;
            newUser.save((err)=>{
               if(err){ 
                   throw err;
               }else{  
                req.flash('You are user');
               }
            });
            
          });
      })
    }
}) 

    

    



module.exports = router;
