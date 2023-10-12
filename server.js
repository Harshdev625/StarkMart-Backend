const dotenv = require("dotenv");
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const productsRouter = require("./routes/productroutes");
const brandsRouter = require("./routes/brandroutes");
const categoriesRouter = require("./routes/categoryroutes");
const userRouter = require("./routes/userroutes");
const authRouter = require("./routes/authroutes");
const cartRouter = require("./routes/cartroutes");
const orderRouter = require("./routes/orderroutes");
const User = require('./models/User');
const { isAuth, sanitizeUser } = require('./services/common');
dotenv.config();
server.use(express.json()); // to parse req.body

const SECRET_KEY = 'SECRET_KEY';
// JWT options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

server.use(cors());
server.use(
  session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate('session'));
server.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
);

server.use("/products", isAuth(), productsRouter.router);
server.use("/categories", isAuth(), categoriesRouter.router);
server.use("/brands", isAuth(), brandsRouter.router);
server.use("/user", isAuth(), userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/order", isAuth(), orderRouter.router);

// Passport Strategies
passport.use(
  'local',
  new LocalStrategy( {usernameField:'email'},
  async function (email, password, done) {
    // by default passport uses username
    console.log('LocalStrategy is called');
    try {
      const user = await User.findOne({ email: email });
      console.log(email, password, user);
      if (!user) {
        return done(null, false, { message: 'invalid credentials' }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        'sha256',
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: 'invalid credentials' });
          }
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          done(null, token); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  'jwt',
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log('JwtStrategy is called');
    console.log({ jwt_payload });
    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  console.log('serialize', user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  console.log('de-serialize', user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
