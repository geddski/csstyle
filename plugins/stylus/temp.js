module.exports = function() {
  return function(stylus) {
    stylus.define('getPath', function() {
      console.log("RES --------------------------");
      console.log(this)
      // console.log(path);
      return "woot";
      // return new stylus.nodes.Unit("holo");
    });
  };
};