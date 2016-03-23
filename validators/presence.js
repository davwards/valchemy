var present = function(value) {
  var valid = function() {
    return value != null && Object.keys(value).length != 0;
  };

  var errors = valid() ? [] : ['Must be present.'];

  return {
    isValid: valid,
    errors: errors
  };
};

module.exports = function() {
  return present;
};