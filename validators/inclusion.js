var valid = require('../results/valid');
var invalid = require('../results/invalid');

module.exports = function(validCollection) {
  return function(value) {
    return (validCollection.indexOf(value) !== -1) ?
      valid() : invalid(value + ' not in given collection');
  };
};