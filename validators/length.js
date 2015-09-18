module.exports = function(requiredLength) {
  return function(value) {
    var valid = value != null && value.length === requiredLength;

    return {
      valid: valid,
      message: valid ? null : 'Must be exactly ' + requiredLength + ' characters.'
    }
  }
};
