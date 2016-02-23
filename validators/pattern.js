var valid = require('../results/valid');
var invalid = require('../results/invalid');

module.exports = function(pattern) {
  return function(value) {
    if (value === null || value === undefined) { value = ''; }

    return (value.match(pattern)) ?
      valid() : invalid('Must match pattern ' + pattern + '.');
  };
};
