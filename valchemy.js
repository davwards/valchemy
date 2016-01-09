var _ = require('lodash');
var Result = require('./results/result');
var usingValidation = require('./validators/using');
var forAttribute = require('./modifiers/forAttribute');

function BasicValidation(schema) {
  if(schema) {
    this.validators = _.map(schema, function(validation, attribute) {
      var attributeModifier = forAttribute(attribute);
      var validator = usingValidation(validation)
      return attributeModifier(validator);
    });
  } else {
    this.validators = [];
  }
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

  var validity = _.every(results, function(result) {
    return result.valid;
  });

  return new Result(
    validity,
    {
      errors: _.chain(results)
        .reject(function(result) {
          return result.valid; })
        .reject(function(result) {
          return result.forAttribute; })
        .map(function(result) {
          return result.errors; })
        .flatten()
        .value(),

      attributeErrors: _.chain(results)
        .select(function(result) {
          return result.forAttribute; })
        .reduce(function(soFar, nextResult) {
          soFar = (soFar === null ? {} : soFar);
          soFar[nextResult.forAttribute] = nextResult.errors;
          return soFar; }, null)
        .value()
    }
  );
};

module.exports = {
  BasicValidation: BasicValidation
};
