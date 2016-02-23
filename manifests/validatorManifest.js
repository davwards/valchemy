module.exports = {
  addWith: function addValidator(validator) {
    this.validators.push(validator);
  },
  factories: {
    length: require('../validators/length'),
    pattern: require('../validators/pattern'),
    custom: require('../validators/custom')
  }
};
