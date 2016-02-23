var valid = require('../results/valid');

module.exports = function(condition) {
  return function(validator) {
    return function(value) {
      if( typeof(condition) == 'function') condition = condition();
      return condition ? validator(value) : valid();
    };
  };
};
