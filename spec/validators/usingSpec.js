var usingValidator = require('../../validators/using');
var invalid = require('../../results/invalid');

describe('using validator', function() {
  it('runs the given validation on the value', function() {
    var fakeValidation = {
      validate: function(val) {
        return invalid(val + ' is unacceptable!');
      }
    };

    var validator = usingValidator(fakeValidation);
    var value = 'foobar';

    var result = validator(value);

    expect(result.errors).toContain('foobar is unacceptable!');
  });

  it('preserves the validation\'s access to its own state', function() {
    var fakeValidation = {
      localProperty: 'unacceptable!',
      validate: function(val) {
        return invalid(val + ' is ' + this.localProperty);
      }
    };

    var validator = usingValidator(fakeValidation);
    var value = 'foobar';

    var result = validator(value);

    expect(result.errors).toContain('foobar is unacceptable!');
  });
});
