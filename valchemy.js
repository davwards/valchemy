var _ = require('lodash');
var Result = require('./results/result');
var valid = require('./results/valid');
var usingValidation = require('./validators/using');
var forAttribute = require('./modifiers/forAttribute');
var combineResults = require('./combineResults');

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

function resultOfValidatorOn(value) {
  return function(validator) {
    return validator(value);
  }
}

BasicValidation.prototype.length      = buildStep(addValidator, require('./validators/length'));
BasicValidation.prototype.pattern     = buildStep(addValidator, require('./validators/pattern'));
BasicValidation.prototype.custom      = buildStep(addValidator, require('./validators/custom'));
BasicValidation.prototype.withMessage = buildStep(addModifier, require('./modifiers/withMessage'));
BasicValidation.prototype.ifPresent   = buildStep(addModifier, require('./modifiers/ifPresent'));
BasicValidation.prototype.forAttribute   = buildStep(addModifier, require('./modifiers/forAttribute'));

BasicValidation.prototype.validate = function(value) {
  return _.chain(this.validators)
    .map(resultOfValidatorOn(value))
    .reduce(combineResults, valid())
    .value();
};

module.exports = {
  BasicValidation: BasicValidation
};
