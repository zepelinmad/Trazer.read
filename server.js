const express = require('express');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/uploadRoutes'); // Add this line

const app = express();
require('./passport-config')(passport);
require('./database'); // Database connection

app.use(express.json()); // For parsing application/json
app.use(session({
  secret: 'trazerReadSuperSecureKey12345',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Trazer.read API' });
});
app.use('/api', routes);
app.use('/auth', authRoutes);
app.use('/api/upload', uploadRoutes); // Use the new uploadRoutes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
