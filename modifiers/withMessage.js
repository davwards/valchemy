var Result = require('../results/result');

module.exports = function(message) {
  return function(validator) {
    return function(value) {
      var result = validator(value);
      return result.isValid() ?
        result :
        Result.clone(result, {errors: [message]});
    };
  };
};
