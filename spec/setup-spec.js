require('shelljs/global');
var specificity = require('specificity');
var postcss = require('postcss');
var fs = require('fs-extra');
var glob = require("glob");

// delete previous css
exec('rm -rf spec/scss/fixtures/*.css');

// compile sass fixtures
exec('sass --update spec/scss/fixtures --style expanded --sourcemap=none');

// compile postcss fixtures
var processor = postcss([
  require('postcss-nested'),
  require('postcss-simple-vars'),
  require('../csstyle')
]);
var files = glob.sync(__dirname + "/postcss/fixtures/**/*.pcss");
files.forEach(function(file){
  var result = processor.process(fs.readFileSync(file));
  fs.writeFileSync(file.replace('.pcss', '.css'), result.css);
});

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
    };
  }
};

describe("csstyle", function() {
  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });
});
