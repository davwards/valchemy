module.exports = {
  addWith: function addModifier(modifier) {
    var targetValidator = this.validators.pop();
    var modifiedValidator = modifier(targetValidator);
    this.validators.push(modifiedValidator);
  },
  factories: {
    withMessage: require('../modifiers/withMessage'),
    ifPresent: require('../modifiers/ifPresent'),
    forAttribute: require('../modifiers/forAttribute')
  }
};

