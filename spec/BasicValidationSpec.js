var v = require('../valchemy.js');
var valid = require('../results/valid');
var invalid = require('../results/invalid');

describe('basic validation', function() {
  describe('with multiple validators', function() {
    beforeEach(function() {
      this.doesValidate = function() {
        return new v.BasicValidation()
          .length(this.allowedLength)
          .pattern(this.pattern)
          .validate(this.value)
          .isValid();
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

      expect(basicValidation.validate('Matt Rothenberg192').errors).toContain("The name must be 10 characters long");
    })

    it('does not provide the given message on validaton', function() {
      var basicValidation = new v.BasicValidation()
        .length(10).withMessage("The name must be 10 characters long");
      expect(basicValidation.validate('Elizabethe').valid).toBeTruthy();
      expect(basicValidation.validate('Elizabethe').errors).not.toContain("The name must be 10 characters long");
    });
  });

  describe('when some of the results have a forAttribute key', function() {
    it('includes only the messages of the results without forAttribute keys in "messages"', function() {
      var baconValidator = function(value) {
        return (value === 'bacon') ?
          valid() : invalid('Why is this not bacon');
      };

      var threeSquareMealsValidator = function(value) {
        return (Object.keys(value).length >= 3) ?
          valid() : invalid('I need three square meals a day!');
      }

      var menu = { breakfast: 'bacon', lunch: 'salad' };

      var validation = new v.BasicValidation()
                              .custom(baconValidator).forAttribute('breakfast')
                              .custom(baconValidator).forAttribute('lunch')
                              .custom(baconValidator).forAttribute('dinner')
                              .custom(threeSquareMealsValidator);

      expect(validation.validate(menu).errors).toEqual(['I need three square meals a day!']);
    });

    it('includes the messages of the results with forAttribute keys in an "attributeMessages" object', function() {
      var baconValidator = function(value) {
        return (value === 'bacon') ?
          valid() : invalid('Why is this not bacon');
      };

      var threeSquareMealsValidator = function(value) {
        return (Object.keys(value).length >= 3) ?
          valid() : invalid('I need three square meals a day!');
      }

      var menu = { breakfast: 'bacon', lunch: 'salad' };

      var validation = new v.BasicValidation()
                              .custom(baconValidator).forAttribute('breakfast')
                              .custom(baconValidator).forAttribute('lunch')
                              .custom(baconValidator).forAttribute('dinner')
                              .custom(threeSquareMealsValidator);

      expect(validation.validate(menu).attributeErrors).toEqual({
        lunch: invalid('Why is this not bacon'),
        dinner: invalid('Why is this not bacon')
      });
    });

    it('returns an empty attributeMessages object when none of the results have a forAttribute key', function() {
      var baconValidator = function(value) {
        return (value === 'bacon') ?
          valid() : invalid('Why is this not bacon');
      };

      var threeSquareMealsValidator = function(value) {
        return (Object.keys(value).length >= 3) ?
          valid() : invalid('I need three square meals a day!');
      }

      var menu = { breakfast: 'bacon', lunch: 'salad' };

      var validation = new v.BasicValidation()
                              .custom(baconValidator)
                              .custom(threeSquareMealsValidator);

      expect(validation.validate(menu).attributeErrors).toEqual({});
    });

  });
});
