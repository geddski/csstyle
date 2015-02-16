var specificity = require('specificity');
var fs = require('fs');
var path = require('path');

module.exports = { 
  /**
   * grab a selector from a file and calculate its specificity
   */
  getSelector: function(file, number){
    number = number || 0;
    var contents = fs.readFileSync(path.resolve(file)).toString();
    var selector = contents.match(/.*\{/g)[number].split('{')[0].trim();
    var score = specificity.calculate(selector)[0].specificity;

    return {
      value: selector,
      score: score
    }
  }
}