const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');
const posts = require("../model/postebi");
const User = require('../model/user');



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

router.get('/add',(req,res)=>{
  res.render('add_post', {
    title: "Add Post"
  })
})

router.post('/add', (req, res)=>{
  const title = req.body.title
  let newPost = new posts({
  title:title
  })

  newPost.save((err)=>{
    if(err){ 
        throw err;
    }else{  
     res.redirect('/users/add')
    }
 });
})

router.get('/edit',(req,res)=>{
res.render('edit', {
  title: "Edit"
})
})

router.post('/edit', (req, res)=>{
let name = req.body.name;
let newdata = req.body.newName;
posts.findOneAndUpdate(
          { title: name },
          {title: newdata},
          { new: true },
          (err, task) => {
            if (err) {
              res.status(500).send(err);
            }
            res.status(200).json(task);
          }
        );
})


router.get('/remove',(req,res)=>{
res.render('remove', {
  title: "remove"
})
})

router.post('/remove', (req, res)=>{
  let delPost = req.body.title
  posts.deleteOne({ title: delPost }, function(err) { 
        if (err)  throw err;
        res.redirect('/users/remove')
    });
});



module.exports = router;
