var _ = require('lodash');
var Result = require('./result.js');

module.exports = function invalid(message, forAttribute) {
  return new Result(false, {errors: [message], forAttribute: forAttribute});
};

