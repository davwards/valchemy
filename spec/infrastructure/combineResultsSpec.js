var combineResults = require('../../infrastructure/combineResults');

var Result = require('../../results/result');
var invalid = require('../../results/invalid');
var valid = require('../../results/valid');

describe('combineResults', function() {
  describe('with two valid results', function() {
    it('returns valid', function() {
      var result1 = valid();
      var result2 = valid();

      var combinedResult = combineResults(result1, result2);

      expect(combinedResult.isValid()).toBeTruthy();
    });
  });

  describe('with one valid and one invalid result', function() {
    it('returns the invalid result', function() {
      var validResult = valid();
      var invalidResult = new Result(false, {
        errors: ['silly'],
        attributeErrors: {
          someProperty: invalid('completely wrong')
        }
      });

      var combinedResult = combineResults(validResult, invalidResult);
      expect(combinedResult.isValid()).toBeFalsy();
      expect(combinedResult.errors).toEqual(['silly']);
      expect(combinedResult.attributeErrors).toEqual({someProperty: invalid('completely wrong')});

      combinedResult = combineResults(invalidResult, validResult);
      expect(combinedResult.isValid()).toBeFalsy();
      expect(combinedResult.errors).toEqual(['silly']);
      expect(combinedResult.attributeErrors).toEqual({someProperty: invalid('completely wrong')});
    });
  });

  describe('with two simple base errors', function() {
    it('combines the base errors', function() {
      var result1 = invalid('silly');
      var result2 = invalid('ridiculous');

      var combinedResult = combineResults(result1, result2);

      expect(combinedResult.errors).toEqual(['silly', 'ridiculous']);
      expect(combinedResult.attributeErrors).toEqual({});
    });
  });

  describe('with two invalid results with attribute errors', function() {
    it('combines the base and attribute errors', function() {
      var result1 = new Result(false, {
        errors: ['silly'],
        attributeErrors: {
          thisProperty: invalid('broken'),
          someProperty: invalid('completely wrong')
        }
      });

      var result2 = new Result(false, {
        errors: ['ridiculous'],
        attributeErrors: {
          someProperty: invalid('patently absurd'),
          thatProperty: invalid('terrible')
        }
      });

      var combinedResult = combineResults(result1, result2);

      expect(combinedResult.errors).toEqual(['silly', 'ridiculous']);
      expect(combinedResult.attributeErrors).toEqual({
        thisProperty: invalid('broken'),
        someProperty: new Result(false, {
          errors: ['completely wrong', 'patently absurd']
        }),
        thatProperty: invalid('terrible')
      });
    });
  });

  describe('with two attribute errors', function() {
    it('returns a result with the given results as attribute errors', function() {
      var result1 = invalid('broken', 'thisProperty');
      var result2 = invalid('terrible', 'thatProperty');

      var combinedResult = combineResults(result1, result2);

      expect(combinedResult.errors).toEqual([]);
      expect(combinedResult.attributeErrors).toEqual({
        thisProperty: invalid('broken'),
        thatProperty: invalid('terrible')
      });
    });
  });
});
