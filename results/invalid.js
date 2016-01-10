var Result = require('./result.js');

module.exports = function invalid(message, forAttribute) {
  var result = new Result(false, {errors: [message]});

  if(forAttribute) {
    result = Result.asAttributeError(result, forAttribute);
  }

  return result;
};

