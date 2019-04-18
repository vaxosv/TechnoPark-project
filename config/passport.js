const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');
const config = require('../config/database');

module.exports = function (passport){
    passport.use(
      new LocalStrategy(function(username,  done) {         
          User.findOne({username: username})
          .then(user=>{
            if(!user){
              return done(null, false,{message: 'username not reg'});
            }

          })
          .catch(err=>{console.log(err);
          })

        }
      ));
}
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });