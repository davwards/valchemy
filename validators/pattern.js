module.exports = function(pattern) {
  return function(value) {
    if (value === null || value === undefined) { value = ''; }
    var valid = !! value.match(pattern);

    return {
      valid: valid,
      message: valid ? null : 'Must match pattern ' + pattern + '.'
    };
  };
};
