var v = require('../../valchemy.js');

describe('Use Case #1: Validating a name for letters only pattern and length ', function() {
  it('invalidates', function() {
    var basicValidation = new v.BasicValidation()
      .length(10)
      .pattern(/^[a-zA-Z]+$/)
        .withMessage('Name must consist only of uppercase and lowercase letters.');

    var result = basicValidation.validate('Matt Rothenberg192');
    expect(result.valid).toBeFalsy();
    expect(result.messages).toContain('Must be exactly 10 characters.');
    expect(result.messages).toContain('Name must consist only of uppercase and lowercase letters.');
  });
});

describe('Use Case #2: Middle initial validator', function() {
  it('validates when the value follows the rules, or is empty', function() {
    var optionalValidation = new v.BasicValidation()
      .length(1).ifPresent();
    var requiredValidation = new v.BasicValidation()
      .length(1);

    expect(optionalValidation.validate("M").valid).toBeTruthy();
    expect(requiredValidation.validate("M").valid).toBeTruthy();

    expect(optionalValidation.validate("MM").valid).toBeFalsy();
    expect(requiredValidation.validate("MM").valid).toBeFalsy();

    expect(optionalValidation.validate("").valid).toBeTruthy();
    expect(requiredValidation.validate("").valid).toBeFalsy();

    expect(optionalValidation.validate(undefined).valid).toBeTruthy();
    expect(requiredValidation.validate(undefined).valid).toBeFalsy();

    expect(optionalValidation.validate(null).valid).toBeTruthy();
    expect(requiredValidation.validate(null).valid).toBeFalsy();

    var explosiveValidation = new v.BasicValidation()
      .custom(function(value) {
        throw "YOU LOSE!!!";
      }).ifPresent();

    expect(explosiveValidation.validate("").valid).toBeTruthy();
  })
});
