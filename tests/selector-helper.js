var specificity = require('specificity');
var fs = require('fs');
var path = require('path');

var Selector = function() {
  var getFile = function(file) {
    return fs.readFileSync(path.resolve(file)).toString();
  }
  
  /**
   * grab a selector from a file and calculate its specificity
   */
  this.get = function(file, number) {
    number = number || 0;
    var contents = getFile(file);
    var selector = contents.match(/.*\{/g)[number].split('{')[0].trim();
    var score = specificity.calculate(selector)[0].specificity;
    
    return {
      value: selector,
      score: score
    };
  };
  
  this.getAll = function(file) {
    var contents = getFile(file);
    var selectors = contents.match(/.*\{/g).map(function(selector) {
      selector = selector.split('{')[0].trim();
      var score = specificity.calculate(selector)[0].specificity;
      
      return {
        value: selector,
        score: score
      };
    });
    
    return selectors;
  };
};

module.exports = new Selector;
