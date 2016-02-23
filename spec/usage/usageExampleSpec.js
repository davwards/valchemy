var Validation = require('../../valchemy.js');

describe('Validating a name for letters only pattern and length ', function() {
  it('includes error messages for all the failing validators', function() {
    var basicValidation = Validation()
      .length(10)
      .pattern(/^[a-zA-Z]+$/)
        .withMessage('Name must consist only of uppercase and lowercase letters.');

    var result = basicValidation.validate('Matt Rothenberg192');
    expect(result.isValid()).toBeFalsy();
    expect(result.errors).toContain('Must be exactly 10 characters.');
    expect(result.errors).toContain('Name must consist only of uppercase and lowercase letters.');
  });
});

describe('Validating a whole object according to a given schema', function() {
  it('uses an object whose keys are attribute names and whose values are Validation objects', function() {
    var validation = Validation({
      firstName: Validation()
        .pattern(/^[a-zA-Z]+$/)
        .withMessage('First name must consist only of uppercase and lowercase letters.'),
      lastName: Validation()
        .pattern(/^[a-zA-Z]+$/)
        .withMessage('Last name must consist only of uppercase and lowercase letters.'),
      middleInitial: Validation()
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

describe('Validating nested objects', function() {
  it('gives results that can be traversed with chained calls to attributeErrors', function() {
    var nameValidation = Validation().length(4);

    var addressValidation = Validation({
      street: Validation()
        .pattern(/^[0-9a-zA-Z\s]+$/)
        .withMessage('no special characters'),
      zip: Validation()
        .pattern(/^\d+$/)
        .withMessage('only digits')
    });

    var profileValidation = Validation({
      name: nameValidation,
      address: addressValidation
    });

    var result = profileValidation.validate({
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
