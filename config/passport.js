const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs')

module.exports = function (passport){
    passport.use(
      new LocalStrategy(function(username, password,  done) {         
          User.findOne({username: username})
          .then(user=>{
            if (!user) { return done(null, false); }

            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {              
                return done(null, user);
              } else {
                return done(null, false);
                
              }
            });

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