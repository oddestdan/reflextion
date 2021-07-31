import { UserModel } from '../models';

const passport = require('passport');

const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');

const dbsecret = process.env.DB_SECRET;

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email, password });
        if (!user) {
          return done(null, false, {
            message: 'Invalid user email or password',
          });
        }

        return done(null, user, {
          message: 'Logged in successfully',
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: dbsecret,
    },
    async (jwtPayload, done) => {
      try {
        const user = await UserModel.findById(jwtPayload.id);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
