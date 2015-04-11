// csstyle for postcss
// Clean, Simple Styling for the Web
// http://www.csstyle.io
// This is the postcss version (https://github.com/postcss/postcss)
// Copyright (c) 2014 Dave Geddes
// https://twitter.com/geddski
// https://github.com/geddski

var _ = require('lodash');

module.exports = function (opts){
  // symbols are configurable
  opts = opts || {};
  opts.optionSymbol = opts.optionSymbol || '\\--';
  opts.partSymbol = opts.partSymbol || '__';
  opts.tweakSymbol = opts.tweakSymbol || '\\+';
  opts.locationSymbol = opts.locationSymbol || '\\@';
  opts.rootId = opts.rootId || 'csstyle';
  
  return function csstyle(css){
    css.eachRule(function(node){
      var output = '';
      var selectors = node.selector.split(' ').map(getAbstraction);
      selectors.forEach(function(selector, index){
        var previous = selectors[index - 1] || {};
        var spacing = '';
        // regular spacing before and after non-csstyle selectors
        if(selector.type === 'other' || previous.type === 'other'){
          spacing = ' ';
        }
        // special case for parts children of option
        if(selector.type === 'part' && previous.type === 'option'){
          var component = _.findLast(selectors, {type: 'component'});
          spacing = ' ';
          output += spacing + component.prefix + component.name + selector.prefix + selector.name;  
          return;
        }
        
        output += spacing + selector.prefix + selector.name;
      });
      
      node.selector = output;
    });
    
    return css;
  };
  
  /**
  * Find the matching csstyle abstractions if any.
  * Return non-csstyle selectors untouched as type 'other'.
  */
  function getAbstraction(selector){
    var types = { 
      component: '.',
      part: opts.partSymbol, 
      option: '.' + opts.optionSymbol,
      tweak: '#' + opts.rootId + ' .' + opts.tweakSymbol,
      location: '#' + opts.rootId + ' .' + opts.locationSymbol
    };
    
    var res = Object.keys(types).map(function(type){
      var regexp = new RegExp('('+type+'\\(([^)]*)\\))');
      // var match = selector.match(/(component\(([^)]*)\))/);
      return {
        type: type,
        match: selector.match(regexp)
      };
    })
    // get first match
    .filter(function(potential){
      return potential.match;
    })[0]; 
    
    if (!res){ 
      return { type: 'other', name: selector, prefix: '' };
    }
    
    return {
      type: res.type,
      name: res.match[2],
      prefix: types[res.type]
    };
  }
  
};

/**
 * support calling with no options
 */
 module.exports.postcss = function (css) {
     module.exports()(css);
 };