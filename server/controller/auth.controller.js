const {auth_service} = require("../services");
// server/controllers/authController.ts
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
// import { findOrCreateUser } from '../services/authService';
const { findOrCreateUser } = require('../services/auth.service');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRETE,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateUser(profile);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

exports.googleAuth = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] });

exports.googleAuthCallback = passport.authenticate('google', { failureRedirect: '/' });

exports.googleAuthRedirect = (req, res) => {
  res.redirect('/');
};
