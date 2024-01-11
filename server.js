const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const path = require('path');

// Require route modules
const routes = require('./routes');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/uploadRoutes');

// Initialize express app
const app = express();

// Configure CORS
app.use(cors());

// Passport configuration
require('./passport-config')(passport);
require('./database'); // Database connection

// Express session
app.use(session({
  secret: 'trazerReadSuperSecureKey12345',
  resave: false,
  saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Body parser middleware
app.use(express.json()); // For parsing application/json

// Define static file serving
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/uploads', express.static('uploads'));

// Define routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Trazer.read API' });
});
app.use('/api', routes);
app.use('/auth', authRoutes);
app.use('/api', uploadRoutes); // Use the new uploadRoutes

// Catchall handler for React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
