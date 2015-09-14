var v = require('../valchemy.js');

describe('basic validation', function() {
  describe('with multiple validators', function() {
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

  describe('with a custom error message', function() {
    it('provides the given message on invalidation', function() {
      var basicValidation = new v.BasicValidation()
          .length(10).withMessage('The name must be 10 characters long');

      expect(basicValidation.validate('Matt Rothenberg192').messages).toContain("The name must be 10 characters long");
    })

    it('does not provide the given message on validaton', function() {
      var basicValidation = new v.BasicValidation()
        .length(10).withMessage("The name must be 10 characters long");
      expect(basicValidation.validate('Elizabethe').valid).toBeTruthy();
      expect(basicValidation.messages).not.toContain("The name must be 10 characters long");
    });

  });
});
