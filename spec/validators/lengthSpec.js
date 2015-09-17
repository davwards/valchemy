var lengthValidator = require('../../validators/length');

describe('length validator', function() {
  beforeEach(function() {
    this.doesValidate = function() {
      var validator = lengthValidator(this.allowedLength);
      var valueToValidate = this.value;
      var result = validator(valueToValidate);
      return result.valid;
    }
  });

  describe('when the value is longer than allowed', function() {
    beforeEach(function(){
      this.value = '1234567890';
      this.allowedLength = 9;
    });

    it('invalidates', function() {
      expect(this.doesValidate()).toBeFalsy();
    });
  });

  describe('when the value is shorter than allowed', function() {
    beforeEach(function(){
      this.value = '123456789';
      this.allowedLength = 10;
    });

    it('invalidates', function() {
      expect(this.doesValidate()).toBeFalsy();
    });
  });

  describe('when the value is exactly as long as allowed', function() {
    beforeEach(function(){
      this.value = '1234567890';
      this.allowedLength = 10;
    });

    it('validates', function() {
      expect(this.doesValidate()).toBeTruthy();
    });
  });

  describe('when the value is null', function() {
    beforeEach(function(){
      this.value = null;
      this.allowedLength = 10;
    });

    it('invalidates', function() {
      expect(this.doesValidate()).toBeFalsy();
    });
  });

  describe('when the value is undefined', function() {
    beforeEach(function(){
      this.value = undefined;
      this.allowedLength = 10;
    });

    it('invalidates', function() {
      expect(this.doesValidate()).toBeFalsy();
    });
  });

  describe('when the value is numerical 0', function() {
    beforeEach(function(){
      this.value = 0;
      this.allowedLength = 10;
    });

    it('invalidates', function() {
      expect(this.doesValidate()).toBeFalsy();
    });
  });
});
