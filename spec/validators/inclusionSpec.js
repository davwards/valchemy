var inclusionValidator = require('../../validators/inclusion');

describe('inclusion validator', function() {
  beforeEach(function() {
    this.validationResult = function() {
      var validator = inclusionValidator(this.validCollection);
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

  describe('when the value is included in the given collection', function() {
    beforeEach(function() {
      this.value = 'willow';
      this.validCollection = ['buffy', 'xander', 'willow'];
    });

    it('validates', function() {
      expect(this.doesValidate()).toBeTruthy();
      expect(this.message()).toBeUndefined();
    });
  });

  describe('when the collection includes undefined', function() {
    beforeEach(function() {
      this.value = undefined;
      this.validCollection = ['sunnydale', undefined, 'the hellmouth'];
    });

    it('validates', function() {
      expect(this.doesValidate()).toBeTruthy();
      expect(this.message()).toBeUndefined();
    });
  });

  describe('when the collection includes null', function() {
    beforeEach(function() {
      this.value = null;
      this.validCollection = ['watcher', null, 'slayer', 'vamp'];
    });

    it('validates', function() {
      expect(this.doesValidate()).toBeTruthy();
      expect(this.message()).toBeUndefined();
    });
  });

  describe('when the value is not included in the given collection', function() {
    beforeEach(function() {
      this.value = 'spike';
      this.validCollection = ['buffy', 'xander', 'willow'];
    });

    it('invalidates', function() {
      expect(this.doesValidate()).toBeFalsy();
      expect(this.message()).toEqual('spike not in given collection');
    });
  });

  describe('when the value is a function', function() {
    beforeEach(function() {
      this.value = function() { return true; };
      this.validCollection = ['buffy', 'xander', 'willow'];
    });

    it('invalidates', function() {
      expect(this.doesValidate()).toBeFalsy();
      expect(this.message()).toEqual('function () { return true; } not in given collection');
    });
  });

  describe('when the value is an object', function() {
    beforeEach(function() {
      this.value = { revengeDemon: 'anya' };
      this.validCollection = ['buffy', 'xander', 'willow'];
    });

    it('invalidates', function() {
      expect(this.doesValidate()).toBeFalsy();
      expect(this.message()).toEqual('[object Object] not in given collection');
    });
  });
});