const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Routes & Models
const userRoutes = require('./routes/user');
const portfolioRoutes = require('./routes/portfolio');//*to be changed
const User = require('./models/user');

// Load environment variables
dotenv.config();

// EJS setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // allow JSON body
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'thisshouldbeabettersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // secure: true, // enable when HTTPS
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};

app.use(session(sessionOptions));
app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global variables for all views
app.use((req, res, next) => {
  res.locals.currUser = req.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.get('/', (req, res) => {
  res.render('home');
});


app.use('/users', userRoutes);
app.use('/users/:id/portfolio', portfolioRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  req.flash('error', 'Something went wrong!');
  res.redirect('/');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
