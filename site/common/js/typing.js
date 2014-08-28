angular.module('csstyle').directive('typing', function(){
  return {
    restrict: 'A',
    link: function(scope, elem){
      console.log("linked");
      scope.html = elem.html();
      elem.html('');
      console.log("scope.html", scope.html);
      var write = function(character){
        // elem[0].innerHTML += character;
        elem.html(elem.html() + character);
      }
      simulateTyping(scope.html, write);
    }
  }

  function simulateTyping(code, write, callback){
    // convert to array if passed a string (first time)
    if (typeof code === 'string'){
      code = code.split('');
    }

    // check if done
    if (code.length < 1) {
      if (callback instanceof Function){
        callback();
      } 
      return;
    }

    // add slight pause for returns to make it feel more natural
    var character = code.shift();
    var timing = 30;

    if (character === "\n"){
      timing = 100;
    }

    // recursively type characters
    setTimeout(function(){
      // handle html
      if (character === "<"){
        var index = code.indexOf('>');
        console.log("index", index);
        for (var i = 0; i < index + 1; i++) {
          // console.log(code[i]);
          character += code.shift();
        };
        // _.find(code, '>', function(ch, index){
        //   console.log("index", index);
        // });
      }
      // editor.insert(character);
      write(character);
      simulateTyping(code, write, callback);
    }, timing);
  }

  function htmlEscape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

})