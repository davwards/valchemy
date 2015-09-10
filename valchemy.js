var _ = require('lodash');

function BasicValidation() {
  this.validators = [];
}

BasicValidation.prototype.length = function(requiredLength) {
  this.validators.push( 
    function(value) {
      return value != null && value.length === requiredLength;
    }
  );

  return this;
};

BasicValidation.prototype.pattern = function(pattern) {
  this.validators.push(
    function(value) {
      if(value === null || value === undefined) { value = ''; }
      return !! value.match(pattern);
    }
  );

  return this;
}

BasicValidation.prototype.validate = function(value) {
  return { valid: _.every(this.validators, function(validator) { return validator(value) }) };
};

module.exports = {
  BasicValidation: BasicValidation

};
