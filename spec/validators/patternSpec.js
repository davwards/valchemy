var patternValidator = require('../../validators/pattern');

describe('pattern validator', function() {
  beforeEach(function() {
    this.validationResult = function() {
      var validator = patternValidator(this.pattern);
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

  describe('when the value doesn\'t match the pattern', function() {
    beforeEach(function(){
      this.value = '12';
      this.pattern = /^\d{3}$/;
    });

    it('invalidates', function() {
      expect(this.doesValidate()).toBeFalsy();
      expect(this.message()).toEqual('Must match pattern /^\\d{3}$/.');
    });
  });

  describe('when the value matches the pattern', function() {
    beforeEach(function(){
      this.value = '123';
      this.pattern = /^\d{3}$/;
    });

    it('validates', function() {
      expect(this.doesValidate()).toBeTruthy();
      expect(this.message()).toBeUndefined();
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
