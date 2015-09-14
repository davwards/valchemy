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

BasicValidation.prototype.length = addValidator(require('./validators/length'));
BasicValidation.prototype.pattern = addValidator(require('./validators/pattern'));

BasicValidation.prototype.withMessage = function(message) {
  var targetValidator = this.validators.pop();

  var transformedValidator = function(value) {
    var result = targetValidator(value);
    if ( ! result ) {
      this.messages.push(message);
    }

    return result;
  };

  this.validators.push(transformedValidator.bind(this));

  return this;
};

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
