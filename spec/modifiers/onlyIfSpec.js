var onlyIfModifierFactory = require('../../modifiers/onlyIf');

describe('ifOnly modifier', function() {
  it("is always valid when the condition is false", function() {

    var ourModifier = onlyIfModifierFactory(false);

    var customValidator = function(value) {
      return {
        valid: false,
        message: null
      }
    };

    var modifiedValidator = ourModifier(customValidator);

    expect(modifiedValidator('banana')).toEqual({
      valid: true,
      message: null
    });
  });

  it("returns the result of the original validator when the condition is true", function() {

    var ourModifier = onlyIfModifierFactory(true);

    var customValidator = function(value) {
      return {
        valid: false,
        message: "NICE TRY"
      }
    };

    var modifiedValidator = ourModifier(customValidator);

    expect(modifiedValidator('banana')).toEqual({
      valid: false,
      message: "NICE TRY"
    });
  });

  it("is always valid when the function evalutes to false", function() {
    var ourModifier = onlyIfModifierFactory(function() { return false });

    var customValidator = function(value) {
      return {
        valid: false,
        message: null
      }
    };

    var modifiedValidator = ourModifier(customValidator);

    expect(modifiedValidator('banana')).toEqual({
      valid: true,
      message: null
    });
  });

  it("returns the result of the original validator when the function evalutes to true", function() {

    var ourModifier = onlyIfModifierFactory(function() { return true; });

    var customValidator = function(value) {
      return {
        valid: false,
        message: "NICE TRY"
      }
    };

    var modifiedValidator = ourModifier(customValidator);

    expect(modifiedValidator('banana')).toEqual({
      valid: false,
      message: "NICE TRY"
    });
  });

});
