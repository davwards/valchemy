module.exports = function(message) {
  return function(targetValidator, value) {
    var result = targetValidator(value);
    if ( ! result.valid ) { result.message = message; }

    return result;
  };
};
