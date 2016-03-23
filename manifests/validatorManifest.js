module.exports = {
  addWith: function addValidator(validator) {
    this.validators.push(validator);
  },
  factories: {
    length: require('../validators/length'),
    maxLength: require('../validators/maxlength'),
    pattern: require('../validators/pattern'),
    inclusion: require('../validators/inclusion'),
    custom: require('../validators/custom'), 
    present: require('../validators/presence')
  }
};
