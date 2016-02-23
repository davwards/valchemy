var valid = require('../results/valid');
var invalid = require('../results/invalid');

module.exports = function(maxLength) {
  return function(value) {
    if(value === null || value === undefined) { value = ''; }

    return(value.length <= maxLength) ?
      valid() :
      invalid('Must be less than or equal to ' + (maxLength) + ' characters long.');
  };
};
