// controllers/authController.js
const User = require('../models/user');

module.exports.register = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Validate email and password (add your validation logic here)
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        req.flash('error', 'Email already registered.');
        return res.redirect('/register');
      }
  
      // Create a new user
      const newUser = new User({ email, password });
  
      // Save the new user to the database
      await newUser.save();
  
      // Set a success flash message
      req.flash('success', 'Registration successful. You can now log in.');
  
      // Redirect the user to the login page
      res.redirect('/login');
    } catch (e) {
      // Handle other errors (e.g., database errors)
      console.error(e);
      req.flash('error', 'An error occurred during registration.');
      res.redirect('/register');
    }
  };
  