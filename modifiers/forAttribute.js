module.exports = function(attribute) {
  return function(validator) {
    return function(obj) {
      var res = validator(obj[attribute]);
      if (!res.valid) {
        res.forAttribute = attribute;
      }
      return res;
    }
  }
};
