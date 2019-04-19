const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');

let User = require('../model/user');



router.get('/register', (req, res)=>{
    res.render('register')
})
router.get('/login', (req, res)=>{
  res.render('login',{
      title: "Login"
  })
})

router.get('*', function (req, res, next) {

  if (req.isAuthenticated() && req.user.status === "user") {
    
      next()
  } else {
      res.redirect("/users/login")
  }


})

router.post('/register', [
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('email').not().isEmpty().custom((value, {req}) => {
        return new Promise((resolve, reject) => {
          User.findOne({email:req.body.email}, function(err, user){
            if(err) {
              reject(new Error('Server Error'))
            }
            if(Boolean(user)) {
              reject(new Error('E-mail already in use'))
            }
            resolve(true)
          });
        });
      }),
    check('username').not().isEmpty(),
    check('password').isLength({ min: 6 }),
    check('password2').custom((value, { req }) => value === req.body.password)
  ],
(req, res) => {

    const { name, email,username, password, password2 } = req.body;
    const status = "user"

    const validationErrors = validationResult(req);
          let errors = [];
          if(!validationErrors.isEmpty()) {
            Object.keys(validationErrors.mapped()).forEach(field => {
              errors.push(validationErrors.mapped()[field]['msg']);
            });
          }

          if(errors.length){
            res.render('register',{
              errors:errors
            });
          }  else {
            const newUser = new User({
              name,
              email,
              username,
              password,
              status: status

            });
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => {
                    res.redirect('/users/login');
                  })
                  .catch(err => console.log(err));
              });
            })  
}});
    
          



router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
       successRedirect: '/',
       failureRedirect: '/login' 
    })(req, res, next);
});





module.exports = router;
