const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');

let User = require('../model/user');


router.get('/register', (req, res)=>{
    res.render('register')
})

router.post("/register", function (req, res) {
    // const name = req.body.name
    // const email = req.body.email
    // const username = req.body.username
    // const password = req.body.password
    // const password2 = req.body.password2
    

    // req.checkBody("name", "name is required").notEmpty()
    // req.checkBody("email", "email is required").notEmpty()
    // req.checkBody("email", "email is not waled").isEmail()
    // req.checkBody("username", "username is required").notEmpty()
    // req.checkBody("password", "password is required").notEmpty()
    // req.checkBody("password2", "passwords do not match").equals(password)

    // let errors = req.validationErrors()

    // if (errors) {
    //     res.render("register", {
    //         errors: errors
    //     })
    // } else {

        // let newUser = new User({
        //     name: name,
        //     email: email,
        //     username: username,
        //     password: password,
           
        // })
    //   bcrypt.gensalt(10,(err, salt)=>{
    //       bcrypt.hash(newUser.password, salt, (err, hash)=>{
    //         if(err) {
    //             console.log(err);
                
    //         }
    //         newUser.password = hash;
            newUser.save((err)=>{
               if(err){ 
                   throw err;
               }else{  
                res.redirect('/')
               }
            });
            
    //       });
    //   })
    // }
}) 

    

router.post('/userr', [
    // username must be an email
    check('username').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
],
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.username,
        email: req.body.password,
        username: "dasdsa",
        password: "11111"
    }).then(user => res.json(user));
});
    



module.exports = router;
