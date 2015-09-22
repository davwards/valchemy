module.exports = function() {
  return function(targetValidator, value) {
    if (value === '' || value === undefined || value === null) {
      return {
        valid: true
      };
    } else {
      return targetValidator(value);
    }
  };
};
