var valid = require('../results/valid');
var invalid = require('../results/invalid');

module.exports = function(requiredLength) {
  return function(value) {
    return (value != null && value.length === requiredLength) ?
      valid() : invalid('Must be exactly ' + requiredLength + ' characters.');
  }
};
