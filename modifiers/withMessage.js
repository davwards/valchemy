module.exports = function(message) {
  return function(validator) {
    return function(value) {
      var result = validator(value);
      if ( ! result.valid ) { result.message = message };
      return result;
    }
  };
};
