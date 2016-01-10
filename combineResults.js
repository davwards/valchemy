var _ = require('lodash');
var valid = require('./results/valid');
var Result = require('./results/result');

function combineResults(result1, result2) {
  result1 = normalizeAttributeError(result1);
  result2 = normalizeAttributeError(result2);

  return new Result(
    result1.isValid() && result2.isValid(),
    {
      errors: result1.errors.concat(result2.errors),
      attributeErrors: combineAttributeErrors(
        result1.attributeErrors,
        result2.attributeErrors
      )
    }
  );
};

function combineAttributeErrors(attributeErrors1, attributeErrors2) {
  var allAttributesWithErrors = _.union(
    _.keys(attributeErrors1),
    _.keys(attributeErrors2)
  );

  return _.chain(allAttributesWithErrors)
    .map(function(nextAttribute) {
      return _.set({}, nextAttribute, combineResults(
        attributeErrors1[nextAttribute] || valid(),
        attributeErrors2[nextAttribute] || valid()
      ));
    })
    .reduce(_.merge, {})
    .value();
}

function normalizeAttributeError(result) {
  if(result.isAttributeError()) {
    var attributeErrors = {};
    attributeErrors[result.forAttribute] = result;
    result.forAttribute = undefined;

    return new Result(result.isValid(), {
      attributeErrors: attributeErrors
    });
  } else {
    return result;
  }
}

module.exports = combineResults;
