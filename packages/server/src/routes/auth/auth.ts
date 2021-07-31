import express = require('express');
import passport = require('passport');
import jwt = require('jsonwebtoken');
import { UserModel } from '../../models/user.model';

const router = express.Router();

// User registration flow is omitted to decrease the scope of the project ...
router.post('/signup', async (req, res, next) => {
  try {
    const user = new UserModel({
      email: req.body.email,
      password: req.body.password,
    });
    const savedUser = await user.save();

    if (!savedUser) {
      return next(new Error('Failed to save user'));
    }
    return res.json({ message: `Saved user ${user.email}` });
  } catch (error) {
    return next(error);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('login', async (error, user) => {
    try {
      if (error || !user) {
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.DB_SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// TODO: use `export default router` everywhere
module.exports = router;
