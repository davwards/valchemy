var valid = require('../../results/valid');
var invalid = require('../../results/invalid');

function baconValidator(value) {
  return (value === 'bacon') ?
    valid() :
    invalid('Why is this not bacon');
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

    expect(baconForBreakfastValidator(menu).isValid()).toBeTruthy();
    expect(baconForBreakfastValidator(menu).errors).toEqual([]);
  });

  it('is invalid when the value of the given attribute fails the original validator', function() {
    var forAttributeFactory = require('../../modifiers/forAttribute');

    var lunchModifier = forAttributeFactory('lunch');
    var baconForLunchValidator = lunchModifier(baconValidator);

    var menu = {
      breakfast: 'bacon',
      lunch: 'salad',
    };

    expect(baconForLunchValidator(menu).isValid()).toBeFalsy();
    expect(
      baconForLunchValidator(menu).attributeErrors.lunch.errors
    ).toEqual(['Why is this not bacon']);
  });
});
