require('shelljs/global');
var specificity = require('specificity');

// compile sass fixtures
exec('sass --update spec/scss/fixtures --style expanded --sourcemap=none');

// compile stylus fixtures
exec('stylus spec/stylus/fixtures');

var customMatchers = {
  toBeMoreSpecificThan: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
        console.log("actual", actual);
        console.log("expected", expected);

        var result = {};
        result.pass = true;
        result.message = "woot";
        return result;
      }
    }
  }
};

describe("csstyle", function() {
  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });
});