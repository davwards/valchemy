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

  describe('matchesPattern', function() {
    beforeEach(function() {
      this.doesValidate = function() {
        return new v.BasicValidation()
          .pattern(this.pattern)
          .validate(this.value)
          .valid;
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

  describe('a compound validation', function() {
    beforeEach(function() {
      this.doesValidate = function() {
        return new v.BasicValidation()
          .length(this.allowedLength)
          .pattern(this.pattern)
          .validate(this.value)
          .valid;
      }
    });

    describe('when both validations pass', function() {
      beforeEach(function() {
        this.allowedLength = 9;
        this.pattern = /^\d+$/;
        this.value = '123456789';
      });

      it('validates', function() {
        expect(this.doesValidate()).toBeTruthy();
      });
    });

    describe('when the second validation fails', function() {
      beforeEach(function() {
        this.allowedLength = 9;
        this.pattern = /^\d+$/;
        this.value = '1234a6789';
      });

      it('invalidates', function() {
        expect(this.doesValidate()).toBeFalsy();
      });
    });

    describe('when the first validation fails', function() {
      beforeEach(function() {
        this.allowedLength = 9;
        this.pattern = /^\d+$/;
        this.value = '12345678';
      });

      it('invalidates', function() {
        expect(this.doesValidate()).toBeFalsy();
      });
    });
  });
});
