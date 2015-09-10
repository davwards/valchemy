function BasicValidation() { }

BasicValidation.prototype.length = function(requiredLength) {
  this.validator = function(value) {
    return value.length === requiredLength;
  };

  return this;
};

BasicValidation.prototype.validate = function(value) {
  return {valid: this.validator(value)}
};

module.exports = {
  BasicValidation: BasicValidation

};
