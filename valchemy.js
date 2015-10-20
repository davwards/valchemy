var _ = require('lodash');

function BasicValidation() {
  this.validators = [];
  this.messages = [];
}

function lettuce(meat, factory) {
  return function() {
    var product = factory.apply(this, arguments);

    meat.call(this, product);

    return this;
  }
}

function addValidator(validator) {
  this.validators.push(validator);
}

function addModifier(modifier) {
  var targetValidator = this.validators.pop();
  var modifiedValidator = modifier(targetValidator);
  this.validators.push(modifiedValidator);
}

BasicValidation.prototype.length      = lettuce(addValidator, require('./validators/length'));
BasicValidation.prototype.pattern     = lettuce(addValidator, require('./validators/pattern'));
BasicValidation.prototype.custom      = lettuce(addValidator, require('./validators/custom'));
BasicValidation.prototype.withMessage = lettuce(addModifier, require('./modifiers/withMessage'));
BasicValidation.prototype.ifPresent   = lettuce(addModifier, require('./modifiers/ifPresent'));

BasicValidation.prototype.validate = function(value) {
  var results = _.map(this.validators, function(validator) {
    return validator(value);
  });

  return {
    valid: _.every(results, function(result) {
      return result.valid;
    }),
    messages: _.map(results, function(result) {
      return result.message;
    })
  };
};

module.exports = {
  BasicValidation: BasicValidation
};
