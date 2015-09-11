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

BasicValidation.prototype.length = addValidator(require('./validators/length'));
BasicValidation.prototype.pattern = addValidator(require('./validators/pattern'));

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
