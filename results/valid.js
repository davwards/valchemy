var Result = require('./result.js');

module.exports = function valid(options) {
  return new Result(true, options || {});
};
