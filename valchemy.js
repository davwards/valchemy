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
BasicValidation.prototype.forAttribute   = lettuce(addModifier, require('./modifiers/forAttribute'));

BasicValidation.prototype.validate = function(value) {
  var results = _.map(this.validators, function(validator) {
    return validator(value);
  });

  return {
    valid: _.every(results, function(result) {
      return result.valid;
    }),
    attributeMessages: _.chain(results)
      .select(function(result) {
        return result.forAttribute; })
      .reduce(function(soFar, nextResult) {
        soFar = (soFar === null ? {} : soFar);
        soFar[nextResult.forAttribute] = nextResult.message;
        return soFar; }, null)
      .value()
    ,
    messages: _.chain(results)
      .reject(function(result) {
        return result.valid; })
      .reject(function(result) {
        return result.forAttribute; })
      .map(function(result) {
        return result.message; })
      .value()
  };
};

module.exports = {
  BasicValidation: BasicValidation
};
