module.exports = function(pattern) {
  return function(value) {
    if(value === null || value === undefined) { value = ''; }
    return !! value.match(pattern);
  }
};
