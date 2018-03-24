const validator = require('validator');  //A library of string validators and sanitizers.

// checking the the sign up form data
function validateSignupForm(formData, callback) {
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
}

// checking the the login form data
function validateLoginForm(formData, callback) {
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
  };

  callback(result);
}

module.exports.validateLoginForm = validateLoginForm;
module.exports.validateSignupForm = validateSignupForm;