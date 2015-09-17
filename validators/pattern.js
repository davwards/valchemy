module.exports = function(pattern) {
  return function(value) {
    if (value === null || value === undefined) { value = ''; }
    return {
      valid: !! value.match(pattern)
    };
  };
};
