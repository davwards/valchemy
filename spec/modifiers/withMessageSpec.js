var withMessage = require('../../modifiers/withMessage');
var valid = require('../../results/valid.js');
var invalid = require('../../results/invalid.js');

describe('withMessage modifier', function() {

  var niceModifier = withMessage('This has room for improvement!');

  function meanValidator(value) {
    return (value === 'perfect') ?
      valid() :
      invalid('THIS IS TERRIBLE AND YOU SHOULD FEEL TERRIBLE');
  }

  var niceValidator = niceModifier(meanValidator);

  it('preserves the validity of the original validation but overrides the message', function() {
    expect(meanValidator('decent')).toEqual(invalid('THIS IS TERRIBLE AND YOU SHOULD FEEL TERRIBLE'));
    expect(niceValidator('decent')).toEqual(invalid('This has room for improvement!'));

    expect(meanValidator('perfect')).toEqual(valid());
    expect(niceValidator('perfect')).toEqual(valid());
  });
});
