var _ = require('lodash');

function Result(validity, options) {
  this.valid = validity;
  this.forAttribute = options.forAttribute;
  this.errors = options.errors || [];
  this.attributeErrors = options.attributeErrors || null;
}

Result.clone = function(result, overrides) {
  return new Result(
    result.isValid(),
    _.assign(optionsFor(result), overrides)
  );
}

function optionsFor(result) {
  return {
    forAttribute: result.forAttribute,
    errors: result.errors,
    attributeErrors: result.attributeErrors
  };
}

Result.prototype.isValid = function() {
  return this.valid;
};

Result.prototype.isBaseError = function() {
  return !this.isAttributeError();
};

Result.prototype.isAttributeError = function() {
  return !!this.forAttribute;
};

module.exports = Result;
