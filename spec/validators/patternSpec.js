var patternValidator = require('../../validators/pattern');

describe('pattern validator', function() {
  beforeEach(function() {
    this.doesValidate = function() {
      var validator = patternValidator(this.pattern);
      var valueToValidate = this.value;
      var result = validator(valueToValidate);
      return result.valid;
    }
  });

  describe('when the value doesn\'t match the pattern', function() {
    beforeEach(function(){
      this.value = '12';
      this.pattern = /^\d{3}$/;
    });

    it('invalidates', function() {
      expect(this.doesValidate()).toBeFalsy();
    });
  });

  describe('when the value matches the pattern', function() {
    beforeEach(function(){
      this.value = '123';
      this.pattern = /^\d{3}$/;
    });

    it('validates', function() {
      expect(this.doesValidate()).toBeTruthy();
    });
  });

  describe('when the value is null', function() {
    beforeEach(function() {
      this.value = null;
    });

    describe('and the pattern does not allow empty strings', function() {
      beforeEach(function(){
        this.pattern = /^a+$/;
      });

      it('invalidates', function() {
        expect(this.doesValidate()).toBeFalsy();
      });
    });

    describe('and the pattern does allow empty strings', function() {
      beforeEach(function(){
        this.pattern = /^a*$/;
      });

      it('invalidates', function() {
        expect(this.doesValidate()).toBeTruthy();
      });
    });
  });

  describe('when the value is undefined', function() {
    beforeEach(function() {
      this.value = undefined;
    });

    describe('and the pattern does not allow empty strings', function() {
      beforeEach(function(){
        this.pattern = /^a+$/;
      });

      it('invalidates', function() {
        expect(this.doesValidate()).toBeFalsy();
      });
    });

    describe('and the pattern does allow empty strings', function() {
      beforeEach(function(){
        this.pattern = /^a*$/;
      });

      it('invalidates', function() {
        expect(this.doesValidate()).toBeTruthy();
      });
    });
  });
});
