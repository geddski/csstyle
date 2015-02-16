// csstyle v1.3.1 for postcss
// Clean, Simple Styling for the Web
// http://www.csstyle.io
// This is the postcss version (https://github.com/postcss/postcss)
// Copyright (c) 2014 Dave Geddes
// https://twitter.com/geddski
// https://github.com/geddski

var _ = require('lodash');

module.exports = function csstyle(css){
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
}

/**
* Find the matching csstyle abstractions if any.
* Return non-csstyle selectors untouched as type 'other'.
*/
function getAbstraction(selector){
  var types = { 
    component: '.',
    part: '__', 
    option: '.\\--',
    tweak: '#csstyle .\\+',
    location: '#csstyle .\\@'
  };
  
  var res = Object.keys(types).map(function(type){
    var regexp = new RegExp('('+type+'\\(([^)]*)\\))');
    // var match = selector.match(/(component\(([^)]*)\))/);
    return {
      type: type,
      match: selector.match(regexp)
    }
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
  }
}