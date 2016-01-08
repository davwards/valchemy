var valid = require('../results/valid');
var invalid = require('../results/invalid');

module.exports = function(validation) {
  return validation.validate.bind(validation);
};
