module.exports = function(condition) {
  return function(validator) {
    return function(value) {
      if( typeof(condition) == 'function') condition = condition();
      if(condition) {
        return validator(value);
      } else {
        return {
          valid: true,
          message: null
        }
      }
    }
  }
}
