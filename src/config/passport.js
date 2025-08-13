import passport from 'passport';
import local from 'passport-local';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';

dotenv.config();
const LocalStrategy = local.Strategy;

// ---------- Estrategia de REGISTRO ----------
passport.use('register', new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true, session: false },
  async (req, email, password, done) => {
    try {
      const { first_name, last_name, age } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return done(null, false, { message: 'El usuario ya existe' });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword
      });
      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }
));

// ---------- Estrategia de LOGIN ----------
passport.use('login', new LocalStrategy(
  { usernameField: 'email', session: false },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// ---------- Estrategia JWT ----------
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (jwt_payload, done) => {
  try {
    //const user = await User.findById(jwt_payload.id);
    const user = await User.findById(jwt_payload.id).select('-password -__v');

    if (user) return done(null, user);
    else return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;


