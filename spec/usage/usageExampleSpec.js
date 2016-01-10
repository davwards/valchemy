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

describe('Use Case #2: Validating a whole object according to a given schema', function() {
  it('invalidates', function() {
    var validation = new v.BasicValidation({
      firstName: new v.BasicValidation()
                      .pattern(/^[a-zA-Z]+$/)
                      .withMessage('First name must consist only of uppercase and lowercase letters.'),
      lastName: new v.BasicValidation()
                      .pattern(/^[a-zA-Z]+$/)
                      .withMessage('Last name must consist only of uppercase and lowercase letters.'),
      middleInitial: new v.BasicValidation()
                      .length(1)
                      .withMessage('Middle initial must be exactly 1 character long')
    });

    var result = validation.validate({
      firstName: 'Matt',
      lastName: 'Rothenberg',
      middleInitial: 'Foo'
    });

    expect(result.isValid()).toBeFalsy();
    expect(result.attributeErrors.middleInitial.errors).toContain('Middle initial must be exactly 1 character long');

  });

});

describe('Use Case #3: Validating nested objects', function() {
  it('invalidates', function() {
    var validation = new v.BasicValidation({
      name: new v.BasicValidation().length(4),
      address: new v.BasicValidation({
        street: new v.BasicValidation()
                    .pattern(/^[0-9a-zA-Z\s]+$/)
                    .withMessage('no special characters'),
        zip: new v.BasicValidation()
                    .pattern(/^\d+$/)
                    .withMessage('only digits')
      })
    });

    var result = validation.validate({
      name: 'Matt',
      address: {
        street: '1234 Main $treet',
        zip: '1234Z'
      }
    });

    expect(result.isValid()).toBeFalsy();
    var addressAttributeErrors = result.attributeErrors.address.attributeErrors;
    expect(addressAttributeErrors.street.errors).toContain('no special characters');
    expect(addressAttributeErrors.zip.errors).toContain('only digits');
  });
});
