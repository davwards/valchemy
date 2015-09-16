var _ = require('lodash');

function BasicValidation() {
  this.validators = [];
  this.messages = [];
}

function addValidator(makeValidator) {
  return function() {
    var validator = makeValidator.apply(this, arguments);
    this.validators.push(validator);
    return this;
  }
}

function modifyValidator(makeModifier) {
  return function() {
    var modifier = makeModifier.apply(this, arguments).bind(this);

    var targetValidator = this.validators.pop();
    this.validators.push(function(value) {
      return modifier(targetValidator, value);
    });

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
