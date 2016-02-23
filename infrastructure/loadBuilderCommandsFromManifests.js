var curry = require('lodash/fp/curry');
var map = require('lodash/fp/map');
var mapValues = require('lodash/fp/mapValues');

var createBuilderMethod = curry(function(addWith, factory) {
  return function() {
    addWith.call(this, factory.apply(this, arguments));
    return this;
  };
});

function getFactoriesWithBuilderWrappingFromManifest(manifest) {
  return mapValues(
    createBuilderMethod(manifest.addWith),
    manifest.factories
  );
}

module.exports = map(getFactoriesWithBuilderWrappingFromManifest);
