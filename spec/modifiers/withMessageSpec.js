var withMessage = require('../../modifiers/withMessage');

describe('withMessage modifier', function() {

  var niceModifier = withMessage('This has room for improvement!');

  function meanValidator(value) {
    var valid = (value === 'perfect');
    return {
      valid: valid,
      message: valid ? null : 'THIS IS TERRIBLE AND YOU SHOULD FEEL TERRIBLE'
    };
  }

  var niceValidator = niceModifier(meanValidator);

  it('preserves the validity of the original validation but overrides the message', function() {

    expect(meanValidator('decent')).toEqual({
      valid: false,
      message: 'THIS IS TERRIBLE AND YOU SHOULD FEEL TERRIBLE'
    });

    expect(niceValidator('decent')).toEqual({
      valid: false,
      message: 'This has room for improvement!'
    });


    expect(meanValidator('perfect')).toEqual({
      valid: true,
      message: null
    });

    expect(niceValidator('perfect')).toEqual({
      valid: true,
      message: null
    });

  });
});
