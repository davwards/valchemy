module.exports = function(requiredLength) {
  return function(value) {
    return value != null && value.length === requiredLength;
  }
};
