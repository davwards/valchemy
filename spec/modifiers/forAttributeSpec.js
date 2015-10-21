function baconValidator(value) {
  if(value === 'bacon')
    return { valid: true, message: null };
  else
    return { valid: false, message: 'Why is this not bacon' };
}

describe('forAttribute modifier', function() {

  it('is valid when the value of the given attribute passes the original validator', function() {
    var forAttributeFactory = require('../../modifiers/forAttribute');

    var breakfastModifier = forAttributeFactory('breakfast');
    var baconForBreakfastValidator = breakfastModifier(baconValidator);

    var menu = {
      breakfast: 'bacon',
      lunch: 'salad',
    };

    expect(baconForBreakfastValidator(menu).valid).toBeTruthy();
    expect(baconForBreakfastValidator(menu).message).toBeNull();
  });

  it('is invalid when the value of the given attribute fails the original validator', function() {
    var forAttributeFactory = require('../../modifiers/forAttribute');

    var lunchModifier = forAttributeFactory('lunch');
    var baconForLunchValidator = lunchModifier(baconValidator);

    var menu = {
      breakfast: 'bacon',
      lunch: 'salad',
    };

    expect(baconForLunchValidator(menu).valid).toBeFalsy();
    expect(baconForLunchValidator(menu).message).toEqual('Why is this not bacon');
  });

  it('includes the name of the attribute in the result when invalid', function() {
    var forAttributeFactory = require('../../modifiers/forAttribute');

    var lunchModifier = forAttributeFactory('lunch');
    var baconForLunchValidator = lunchModifier(baconValidator);

    var menu = {
      breakfast: 'bacon',
      lunch: 'salad',
    };

    expect(baconForLunchValidator(menu).forAttribute).toEqual('lunch');
  });

  it('does not include the name of the attribute in the result when valid', function() {
    var forAttributeFactory = require('../../modifiers/forAttribute');

    var breakfastModifier = forAttributeFactory('breakfast');
    var baconForBreakfastValidator = breakfastModifier(baconValidator);

    var menu = {
      breakfast: 'bacon',
      lunch: 'salad',
    };

    expect(baconForBreakfastValidator(menu).forAttribute).toBeUndefined();
  });
});
