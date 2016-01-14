var valid = require('../results/valid');
var invalid = require('../results/invalid');

module.exports = function(maxLength) {
  return function(value) {
    return(value != null && value.length <= maxLength) ?
      valid() : (
        value === null || value === undefined ? 
          invalid('Must be at least one character long.') :
          invalid('Must be less than or equal to ' + (maxLength) + ' characters long.')
      );
  };
};
