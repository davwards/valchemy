var Result = require('../results/result');

module.exports = function(attribute) {
  return function(validator) {
    return function(obj) {
      var result = validator(obj[attribute]);
      return result.isValid() ?
        result :
        Result.clone(result, {forAttribute: attribute});
    }
  }
};
