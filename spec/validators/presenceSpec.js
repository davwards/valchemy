var presenceValidatorFactory = require('../../validators/presence');

describe('presence validator', function() {
  beforeEach(function() {
    this.validationResult = function() {
      var validator = presenceValidatorFactory();
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

  describe('when the value is present', function() {
    describe('when the value is a string', function() {
      beforeEach(function() {
        this.value = 'hello';
      });

      it('validates', function() {
        expect(this.doesValidate()).toBeTruthy();
        expect(this.message()).toBeUndefined();
      });
    });

    describe('when the value is an object', function() {
      beforeEach(function() {
        this.value = {hello: 'world'};
      });

      it('validates', function() {
        expect(this.doesValidate()).toBeTruthy();
        expect(this.message()).toBeUndefined();
      });
    });
  });

  describe('when the value is not present', function() {
    describe('when the value is an object with no keys', function() {
      beforeEach(function() {
        this.value = {};
      });

      it('validates', function() {
        expect(this.doesValidate()).toBeFalsy();
        expect(this.message()).toEqual('Must be present.');
      });
    });

    describe('when the value is null', function() {
      beforeEach(function() {
        this.value = null;
      });

      it('invalidates', function() {
        expect(this.doesValidate()).toBeFalsy();
        expect(this.message()).toEqual('Must be present.');
      });
    });

    describe('when the value is an empty string', function() {
      beforeEach(function() {
        this.value = '';
      });

      it('invalidates', function() {
        expect(this.doesValidate()).toBeFalsy();
        expect(this.message()).toEqual('Must be present.');
      });
    });

    describe('when the value is undefined', function() {
      beforeEach(function() {
        this.value = undefined;
      });

      it('invalidates', function() {
        expect(this.doesValidate()).toBeFalsy();
        expect(this.message()).toEqual('Must be present.');
      });
    });
  });
});
