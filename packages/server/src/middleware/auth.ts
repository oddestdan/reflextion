import * as passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models';

export default (): void => {
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email: string, password: string, done): Promise<void> => {
        try {
          const user = await UserModel.findOne({ email });

          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          const isValidPassword = await user.comparePassword(password);

          if (!isValidPassword) {
            return done(null, false, { message: 'Invalid passsword' });
          }

          return done(null, user, { message: 'User login successful' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: process.env.DB_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      (token, done) => {
        try {
          console.log();
          return done(null, token.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
