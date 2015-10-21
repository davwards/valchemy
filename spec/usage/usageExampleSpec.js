var v = require('../../valchemy.js');

describe('Use Case #1: Validating a name for letters only pattern and length ', function() {
  it('invalidates', function() {
    var basicValidation = new v.BasicValidation()
      .length(10)
      .pattern(/^[a-zA-Z]+$/)
        .withMessage('Name must consist only of uppercase and lowercase letters.');

    var result = basicValidation.validate('Matt Rothenberg192');
    expect(result.isValid()).toBeFalsy();
    expect(result.errors).toContain('Must be exactly 10 characters.');
    expect(result.errors).toContain('Name must consist only of uppercase and lowercase letters.');
  });
});
