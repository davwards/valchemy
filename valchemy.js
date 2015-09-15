var _ = require('lodash');

function BasicValidation() {
  this.validators = [];
  this.messages = [];
}

function addValidator(validatorBuilder) {
  return function() {
    this.validators.push(validatorBuilder.apply(this, arguments));
    return this;
  }
}

function modifyValidator(validatorTransform) {
  return function() {
    var normalizedTransform = validatorTransform.apply(this, arguments);
    if(normalizedTransform.length != 2)
      throw "Invalid validator modifier! Must have 2 arguments (validator, value).";

    var targetValidator = this.validators.pop();
    var transformedValidator = function(value) {
      return normalizedTransform.apply(this, [targetValidator, value]);
    }.bind(this);

    this.validators.push(transformedValidator);
    return this;
  }
}

BasicValidation.prototype.length = addValidator(require('./validators/length'));
BasicValidation.prototype.pattern = addValidator(require('./validators/pattern'));

BasicValidation.prototype.withMessage = modifyValidator(function(message) {
  return function(targetValidator, value) {
    var result = targetValidator(value);
    if ( ! result ) {
      this.messages.push(message);
    }
    return result;
  };
});

BasicValidation.prototype.validate = function(value) {
  return {
    valid: _.every(this.validators, function(validator) {
      return validator(value)
    }),
    messages: this.messages
  };
};

module.exports = {
  BasicValidation: BasicValidation
};
