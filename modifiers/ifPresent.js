var valid = require('../results/valid');

module.exports = function() {
  return function(validator) {
    return function(value) {
      return (value === '' || value === undefined || value === null) ?
        valid() : validator(value);
    }
  };
};
