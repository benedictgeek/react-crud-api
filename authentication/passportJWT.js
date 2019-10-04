const userModel = require("../models/index").user;
const passport = require("passport");
const JWT = require("passport-jwt");
const JWTStrategy = JWT.Strategy;
const ExtractJWT = JWT.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "some soft password in place";

passport.use(
  "jwt",
  new JWTStrategy(opts, (jwt_payload, done) => {
    console.log('Working');
    return userModel
      .findOne({ id: jwt_payload.id })
      .then(user => {
        if (!user) {
          done(null, false, { message: "invalid payload Id" });
        }
        done(null, user);
      })
      .catch(err => {
        done(null, false, { message: "Some error occured..." });
      });
  })
);

// passport.serializeUser(function(user, done) {
// //   console.log(user);
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
// //   console.log(user);
//   done(null, user);
// });
