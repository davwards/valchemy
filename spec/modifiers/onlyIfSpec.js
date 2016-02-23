var onlyIfModifierFactory = require('../../modifiers/onlyIf');
var invalid = require('../../results/invalid');
var valid = require('../../results/valid');

describe('ifOnly modifier', function() {
  it('is always valid when the condition is false', function() {

    var ourModifier = onlyIfModifierFactory(false);

    var customValidator = function() {
      return invalid('nope');
    };

    var modifiedValidator = ourModifier(customValidator);

    expect(modifiedValidator('banana')).toEqual(valid());
  });

  it('returns the result of the original validator when the condition is true', function() {

    var ourModifier = onlyIfModifierFactory(true);

    var customValidator = function() {
      return invalid('NICE TRY');
    };

    var modifiedValidator = ourModifier(customValidator);

    expect(modifiedValidator('banana')).toEqual(invalid('NICE TRY'));
  });

  it('is always valid when the function evalutes to false', function() {
    var ourModifier = onlyIfModifierFactory(function() { return false; });

    var customValidator = function() {
      return invalid('nope');
    };

    var modifiedValidator = ourModifier(customValidator);

    expect(modifiedValidator('banana')).toEqual(valid());
  });

  it('returns the result of the original validator when the function evalutes to true', function() {

    var ourModifier = onlyIfModifierFactory(function() { return true; });

    var customValidator = function() {
      return invalid('NICE TRY');
    };

    var modifiedValidator = ourModifier(customValidator);

    expect(modifiedValidator('banana')).toEqual(invalid('NICE TRY'));
  });

});
