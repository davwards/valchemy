var set = require('lodash/set');
var merge = require('lodash/merge');

function keyValuePair(k,v) { return set({},k,v); }

function Result(validity, options) {
  options = options || {};

  this.valid = validity;
  this.errors = options.errors || [];
  this.attributeErrors = options.attributeErrors || {};
}

Result.asAttributeError = function(result, attribute) {
  return new Result(result.isValid(), {
    errors: [],
    attributeErrors: keyValuePair(attribute, result)
  });
};

Result.clone = function(result, overrides) {
  return new Result(
    result.isValid(),
    merge(optionsFor(result), overrides)
  );
};

function optionsFor(result) {
  return {
    errors: result.errors,
    attributeErrors: result.attributeErrors
  };
}

Result.prototype.isValid = function() {
  return this.valid;
};

module.exports = Result;
