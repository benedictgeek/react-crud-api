const userModel = require("../models/index").user;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      return userModel
        .findOne({ where: { email, password } })
        .then(user => {
          if (!user) {
            done(null, false, { message: "Incorrect credentials" });
          }
          done(null, user, { message: "Logged in successfully" });
        })
        .catch(err => {
          done(err);
        });
    }
  )
);

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
