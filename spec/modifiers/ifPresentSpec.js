var ifPresentFactory = require('../../modifiers/ifPresent');
var invalid = require('../../results/invalid.js');
var valid = require('../../results/valid.js');

describe('withMessage modifier', function() {
  var alwaysInvalidValidator = jasmine.createSpy('alwaysInvalidValidator')
    .and.callFake(function() {
      return invalid('ABSOLUTELY NOT');
    });

  var ifPresentModifier = ifPresentFactory();
  var optionalAlwaysInvalidValidator = ifPresentModifier(alwaysInvalidValidator);

  beforeEach(function() { alwaysInvalidValidator.calls.reset(); });

  describe('when the value is not blank', function() {
    it('returns the result of the original validation', function() {
      expect(optionalAlwaysInvalidValidator('notblank')).toEqual(
        invalid('ABSOLUTELY NOT')
      );
    });
  });

  describe('when the value is empty string', function() {
    it('returns valid', function() {
      expect(optionalAlwaysInvalidValidator('')).toEqual(valid());
    });

    it('does not execute the original validator at all', function() {
      optionalAlwaysInvalidValidator('');
      expect(alwaysInvalidValidator).not.toHaveBeenCalled();
    });
  });

  describe('when the value is null', function() {
    it('returns valid', function() {
      expect(optionalAlwaysInvalidValidator(null)).toEqual(valid());
    });

    it('does not execute the original validator at all', function() {
      optionalAlwaysInvalidValidator(null);
      expect(alwaysInvalidValidator).not.toHaveBeenCalled();
    });
  });

  describe('when the value is undefined', function() {
    it('returns valid', function() {
      expect(optionalAlwaysInvalidValidator(undefined)).toEqual(valid());
    });

    it('does not execute the original validator at all', function() {
      optionalAlwaysInvalidValidator(undefined);
      expect(alwaysInvalidValidator).not.toHaveBeenCalled();
    });
  });
});
