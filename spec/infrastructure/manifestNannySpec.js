var fs = require('fs');
var _ = require('lodash/fp');

describe('Manifests', function() {
  beforeEach(function() {
    jasmine.addMatchers({ toHaveNoConflicts: noConflictsMatcher });
  });

  it('do not contain any conflicting command names', function(done) {
    fs.readdir('./manifests/', noErrorAnd(expectNoConflicts, done));
  });

  function noErrorAnd(fn, done) {
    return function(err, value) {
      expect(err).toBeNull();
      fn(value);
      done();
    };
  }

  function expectNoConflicts(fileNames) {
    expect(conflictingManifestEntries(fileNames)).toHaveNoConflicts();
  }

  var conflictingManifestEntries = _.compose(
    _.pickBy(tooManyOccurrences),
    _.reduce(_.mergeWith(combineOccurrences), {}),
    _.map(setInitialOccurrence),
    _.map(factoriesInFile)
  );

  function factoriesInFile(filename) {
    return [ filename, require('../../manifests/' + filename).factories ];
  }

  function setInitialOccurrence(fileFactories) {
    var filename = fileFactories[0], factories = fileFactories[1];
    return _.mapValues(function() { return [filename]; }, factories);
  }

  function combineOccurrences(x,y) { return _.concat(x || [], y || []); }
  function tooManyOccurrences(occurrences) { return occurrences.length > 1; }


  function noConflictsMatcher(util, customEqualityTesters) {
    return {
      compare: function(conflicts) {
        var noConflicts = util.equals(conflicts, {}, customEqualityTesters);
        return { pass: noConflicts, message: conflictErrorMessage(conflicts) };
      }
    };
  }

  var conflictErrorMessage = _.compose(
    function(lines) {
      return 'The following commands are defined in multiple manifests:\n' + lines;
    },
    _.join('\n'),
    _.map(function(conflictingCommand) {
      return conflictingCommand[0] + ': ' + _.join(', ', conflictingCommand[1]);
    }),
    _.toPairs
  );

});
