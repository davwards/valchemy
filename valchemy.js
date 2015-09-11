var _ = require('lodash');

function BasicValidation() {
  this.validators = [];
}

function addValidator(validatorBuilder) {
  return function() {
    this.validators.push(validatorBuilder.apply(this, arguments));
    return this;
  }
}

BasicValidation.prototype.length = addValidator(
  function(requiredLength) {
    return function(value) {
      return value != null && value.length === requiredLength;
    }
  }
);

BasicValidation.prototype.pattern = addValidator(
  function(pattern) {
    return function(value) {
      if(value === null || value === undefined) { value = ''; }
      return !! value.match(pattern);
    }
  }
);

BasicValidation.prototype.validate = function(value) {
  return {
    valid: _.every(this.validators, function(validator) {
      return validator(value)
    })
  };
};

module.exports = {
  BasicValidation: BasicValidation
};
