var ifPresentFactory = require('../../modifiers/ifPresent');

describe('withMessage modifier', function() {
  var alwaysInvalidValidator = jasmine.createSpy('alwaysInvalidValidator')
    .and.callFake(function(value) {
      return {
        valid: false,
        message: "ABSOLUTELY NOT"
      };
    });

  var ifPresentModifier = ifPresentFactory();
  var optionalAlwaysInvalidValidator = ifPresentModifier(alwaysInvalidValidator);

  beforeEach(function() { alwaysInvalidValidator.calls.reset(); });

  describe('when the value is not blank', function() {
    it('returns the result of the original validation', function() {
      expect(optionalAlwaysInvalidValidator('notblank')).toEqual({
        valid: false,
        message: "ABSOLUTELY NOT"
      });
    });
  });

  describe('when the value is empty string', function() {
    it('returns valid', function() {
      expect(optionalAlwaysInvalidValidator('')).toEqual({
        valid: true,
        message: null
      });
    });

    it('does not execute the original validator at all', function() {
      optionalAlwaysInvalidValidator('');
      expect(alwaysInvalidValidator).not.toHaveBeenCalled();
    });
  });

  describe('when the value is null', function() {
    it('returns valid', function() {
      expect(optionalAlwaysInvalidValidator(null)).toEqual({
        valid: true,
        message: null
      });
    });

    it('does not execute the original validator at all', function() {
      optionalAlwaysInvalidValidator(null);
      expect(alwaysInvalidValidator).not.toHaveBeenCalled();
    });
  });

  describe('when the value is undefined', function() {
    it('returns valid', function() {
      expect(optionalAlwaysInvalidValidator(undefined)).toEqual({
        valid: true,
        message: null
      });
    });

    it('does not execute the original validator at all', function() {
      optionalAlwaysInvalidValidator(undefined);
      expect(alwaysInvalidValidator).not.toHaveBeenCalled();
    });
  });
});
