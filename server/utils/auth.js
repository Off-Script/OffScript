const validator = require('validator');  //A library of string validators and sanitizers.

module.exports = {
// checks if user is authenticated on routes
isAuthenticated: (req,res,next) => {
  if(req.user) {
    return next();
  } else
    return res.status(401).json({
      error: 'User not authenticated'
    });
  },

// checking the the sign up form data
validateSignupForm: (formData, callback) => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!formData || typeof formData.password !== 'string' || formData.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!formData || typeof formData.username !== 'string' || formData.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  let result = {
    success: isFormValid,
    message,
    errors
  };
  callback(result);
},

// checking the the login form data
validateLoginForm: (formData, callback) => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!formData || typeof formData.username !== 'string' || formData.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username.';
  }

  if (!formData || typeof formData.password !== 'string' || formData.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  let result = {
    success: isFormValid,
    message,
    errors
  }

  callback(result);
  }
}