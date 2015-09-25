module.exports = function() {
  return function(validator) {
    return function(value) {
      if (value === '' || value === undefined || value === null) {
        return {
          valid: true
        };
      } else {
        return validator(value);
      }
    }
  };
};
