var customValidator = require('../../validators/custom');
var valid = require('../../results/valid');
var invalid = require('../../results/invalid');

describe('custom validator', function() {
  beforeEach(function() {
    this.validationResult = function() {
      var validator = customValidator(this.customValidator);
      var valueToValidate = this.value;
      var result = validator(valueToValidate);
      return result;
    };

    this.doesValidate = function() {
      return this.validationResult().isValid();
    };

    this.message = function() {
      return this.validationResult().errors[0];
    };
  });

  describe('when we pass a custom validator function that validates', function() {
    beforeEach(function(){
      this.value = 'question';
      this.customValidator = function(value) {
        return (value[0] === 'q') ?
          valid() :
          invalid('Unacceptable!');
      };
    });

    it('validates all words that start with q', function() {
      expect(this.doesValidate()).toBeTruthy();
    });

    it('invalidates all words that start with the letter a', function() {
      this.value = 'Apple';
      expect(this.doesValidate()).toBeFalsy();
      expect(this.message()).toEqual('Unacceptable!');
    });
  });
});
