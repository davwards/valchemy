var mergeWith = require('lodash/fp/mergeWith');

var valid = require('../results/valid');
var Result = require('../results/result');

function combineResults(result1, result2) {
  result1 = result1 || valid();
  result2 = result2 || valid();

  return new Result(
    result1.isValid() && result2.isValid(),
    {
      errors: result1.errors.concat(result2.errors),
      attributeErrors: mergeWith(
        combineResults,
        result1.attributeErrors,
        result2.attributeErrors
      )
    }
  );
};

module.exports = combineResults;
