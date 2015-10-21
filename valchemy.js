var _ = require('lodash');

function BasicValidation() {
  this.validators = [];
  this.messages = [];
}

function buildStep(attach, factory) {
  return function() {
    var operation = factory.apply(this, arguments);

    attach.call(this, operation);

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

BasicValidation.prototype.length      = buildStep(addValidator, require('./validators/length'));
BasicValidation.prototype.pattern     = buildStep(addValidator, require('./validators/pattern'));
BasicValidation.prototype.custom      = buildStep(addValidator, require('./validators/custom'));
BasicValidation.prototype.withMessage = buildStep(addModifier, require('./modifiers/withMessage'));
BasicValidation.prototype.ifPresent   = buildStep(addModifier, require('./modifiers/ifPresent'));
BasicValidation.prototype.forAttribute   = buildStep(addModifier, require('./modifiers/forAttribute'));

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
