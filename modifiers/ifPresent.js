module.exports = function() {
  return function(validator) {
    return function(value) {
      if (value === '' || value === undefined || value === null) {
        return {
          valid: true,
          message: null
        };
      } else {
        return validator(value);
      }
    }
  };
};
