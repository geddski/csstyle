module.exports = function() {
  return function(stylus) {
    stylus.define('indexOf', function(str, substr) {
      return new stylus.nodes.Unit(str.string.indexOf(substr.string));
    });
  };
};