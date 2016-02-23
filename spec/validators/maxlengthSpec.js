var maxlengthValidator = require('../../validators/maxlength');

describe('maxlength validator', function() {
  beforeEach(function() {
    this.validationResult = function() {
      var validator = maxlengthValidator(this.maximumLength);
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

  describe('when the value is longer than allowed', function() {
    beforeEach(function() {
      this.value = '12345';
      this.maximumLength = 4;
    });

    it('invalidates', function() {
      expect(this.doesValidate()).toBeFalsy();
      expect(this.message()).toEqual('Must be less than or equal to 4 characters long.');
    });
  });

  describe('when the value is shorter than allowed', function() {
    beforeEach(function() {
      this.value = '123';
      this.maximumLength = 4;
    });

    it('validates', function() {
      expect(this.doesValidate()).toBeTruthy();
      expect(this.message()).toBeUndefined();
    });
  });

  describe('when the value is null', function() {
    beforeEach(function(){
      this.value = null;
      this.maximumLength = 10;
    });

    it('validates', function() {
      expect(this.doesValidate()).toBeTruthy();
    });
  });

  describe('when the value is undefined', function() {
    beforeEach(function(){
      this.value = undefined;
      this.maximumLength = 10;
    });

    it('validates', function() {
      expect(this.doesValidate()).toBeTruthy();
    });
  });
});
