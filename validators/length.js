module.exports = function(requiredLength) {
  return function(value) {
    return {
      valid: value != null && value.length === requiredLength
    }
  }
};
