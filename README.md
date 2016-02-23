# Valchemy

Valchemy is a lightweight, framework-agnostic library for constructing
validations. It's designed with the following goals:

- Make it easy to define both simple and complex validation rules

- Make it easy to add your own validation rules when the included ones aren't
  enough

- Make it easy to customize validations (use custom messages, preconditions,
  etc.)

- Make it easy to crack open the code and contribute your own additions

- Demonstrate functional programming concepts like higher-order functions
  through a real-world use case

## Installation

(TODO: Valchemy isn't released on npm yet.)

## Usage

Check out the `spec/usage` directory for detailed usage examples in
executable-test form.

### Simple validation

Validation objects are built via a fluent interface:

````javascript
var Validation = require('valchemy');

firstNameValidation = Validation().present().maxLength(10);

missingNameResult = firstNameValidation.validate('');
missingNameResult.isValid() // false
missingNameResult.errors // ['Must be present']

longNameResult = firstNameValidation.validate('Rumplestiltskin');
longNameResult.isValid() // false
longNameResult.errors // ['Must be no longer than 10 characters']
````

### Modifying validators

There are two families of methods you can call on a Validation object:
*validator* methods and *modifier* methods.

*Validator* methods like `present` and `maxLength` add the corresponding
validator to the list of validators that will be aggregated when you call the
validation's `validate` method.

*Modifier* methods like `withMessage` and `onlyIf` make a change to the last
added validator. For example:

````javascript
firstNameValidation = Validation().present().maxLength(10).withMessage('That name is too long!');

missingNameResult = firstNameValidation.validate('');
missingNameResult.isValid() // false
missingNameResult.errors // ['Must be present']

result = firstNameValidation.validate('Rumplestiltskin');
result.isValid() // false
result.errors // ['That name is too long!']
````

The call to `withMessage` modifies just the previous validator--in this case,
`maxLength`--so values which fail the `present` validator still get the default
presence message, but values that fail the `maxLength` validator get the
specified custom message.

### Validating objects

You can also create validations for objects whose attributes you want to
validate. The `Validation` method accepts an object schema:

````javascript
userValidation = Validation({
  firstName: Validation()
    .present()
    .maxLength(10),
  middleInitial: Validation()
    .length(1)
    .ifPresent(),
  lastName: Validation()
    .present()
    .maxLength(10),
  address: Validation({
    line1: Validation()
      .present()
      .maxLength(20),
    line2: Validation
      .maxLength(10),
    zipCode: Validation
      .present()
      .pattern(/\d{5}/).withMessage('Zip code must be 5 digits')
  })
});

user = {
  firstName: 'Hiro',
  middleInitial: undefined,
  lastName: 'Protagonist',
  address: {
    line1: 'Metaverse',
    zipCode: '0x00000539'
  }
}

result = userValidation.validate(user)

result.isValid() // false
result.attributeErrors['lastName'].errors // ['Must be no longer than 10 characters']
result.attributeErrors['address'].attributeErrors['zipCode'].errors // ['Zip code must be 5 digits']
````

### Custom validators

Often you'll need a validation for a specific business rule that doesn't fit
any of the provided validators in the library. In that case, you can provide a
*custom validator* by writing a function that takes a single argument (the
value to validate) and returns a *result object*. Result objects can be
constructed via `Validation.valid()` and `Validation.invalid('some message')`
(where `Validation` is the export of the valchemy.js module).

````javascript
function baconValidator(value) {
  return value === 'bacon' ?
    Validation.valid() :
    Validation.invalid('why is this not bacon');
}

var menuValidation = Validation({
  breakfast: Validation.custom(baconValidator),
  lunch: Validation.custom(baconValidator),
  dinner: Validation.custom(baconValidator)
});

var menu = {
  breakfast: 'bacon',
  lunch: 'bacon',
  dinner: 'salad'
};

menuValidation.validate(menu).attributeErrors['dinner'].errors // ['why is this not bacon']
````

## Contributing

We're looking for contributions! Once you've forked/cloned the repo, run the
following in the top level directory to install the project's dependencies:

````bash
$ npm install
````

Then, run the tests:

````bash
$ npm test
````

### Background

Before you start getting your hands dirty, there's a few ideas you'll want to
be aware of. First off, some domain terminology:

- A **value** is something that we want to validate, typically a string or
  object.

- A **result** is an object describing whether a value was valid or invalid, and
  if invalid, why. Results can be constructed with the `Validation.valid` and
  `Validation.invalid` functions.

- A **validator** is a function that takes one argument, a value, and returns a
  result.

- A **validator factory** is a function that returns a validator. Validator
  factories can take zero or more arguments, as needed for the specific
  validator the factory builds.

To add support for a new validator, you'll need to create a new file in the
`validators/` directory. Each file in `validators/` exports a **validator
factory**.

Your validator factory can take whatever arguments it needs to in order to
configure its validator. For example, the `length` validator takes one
argument: the number of characters the value needs to have. However, the
validator function that your validator factory returns **must** take exactly
one argument, which is the value to validate.

Finally, you'll need to add your new validator module to
`manifests/validatorManifest.js`. This will cause it to get included in the
Validation object's prototype.

To add support for a new modifier, the process is similar. Every file in the
`modifiers/` directory must export a **modifier factory.**

- A **modifier** is a function that takes one argument, a validator, and
  returns a new validator.

- A **modifier factory** is a function that can take any number of arguments,
  and returns a modifier.

If you aren't familiar with higher order functions, the modifier modules can
look a little spooky. They are typically shaped like this:

````javascript
module.exports = function(someArgument, anotherArgument) {
  return function(validator) {
    return function(value) { // IS IT FUNCTIONS ALL THE WAY DOWN???
      /* some code goes here */
      return newResult;
    }
  };
};
````

But when the functions start swimming together, just fall back on the
definitions of things.

````javascript
/* Any module in modifiers/ exports a modifier factory. */

module.exports = function(someArgument, anotherArgument) { // This is a modifier factory, which is a function that takes some arguments...
  return function(validator) {                             // and returns a modifier, which is a function that takes a validator...
    return function(value) {                               // and returns a new validator, which is a function that takes a value...
      /* some code goes here */
      return newResult;                                    // and returns a result.
    }
  };
};
````

As long as your module conforms to these rules, all the machinery that wires
things up and allows validators to be chained together and modifiers to act on
them ought to work.

Don't forget to add your new module to `manifests/modifierManifest.js`!


### Making your change

1. Create a branch:

````bash
$ git checkout -b your-feature-name
````

2. Make your changes, including appropriate unit tests and relevant updates to
a test in the `spec/usage` directory.  The usage specs serve in part as
integration tests to make sure everything is wired together properly, but just
as importantly they act as documentation; you should think carefully about the
best example for showing someone unfamiliar with your feature how to use it.

3. Update the README if necessary

4. Make sure the tests pass by running `npm test`.

5. Commit your changes; check out Chris Beam's great article on [writing good
commit messages](http://chris.beams.io/posts/git-commit/).

6. Push to your fork of the repo, and create a pull request through Github.
