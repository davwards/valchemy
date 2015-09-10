var v = require('../valchemy.js');

describe('basic validation', function() {
  describe('length validator', function() {
    beforeEach(function() {
      this.doesValidate = function() {
        return new v.BasicValidation()
          .length(this.allowedLength)
          .validate(this.value)
          .valid;
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
  });
});
