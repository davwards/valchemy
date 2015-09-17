var v = require('../../valchemy.js');

describe('Use Case #1: Validating a name for letters only pattern and length ', function() {
  it('invalidates', function() {
    var basicValidation = new v.BasicValidation()
      .length(10).withMessage("The name must be 10 characters long")
      .pattern(/[a-zA-Z]+/);

    expect(basicValidation.validate('Matt Rothenberg192').valid).toBeFalsy();
    expect(basicValidation.validate('Matt Rothenberg192').messages).toContain("The name must be 10 characters long");
  });
});
