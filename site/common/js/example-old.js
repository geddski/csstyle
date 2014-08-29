var mixins = "@mixin component($name){.#{$name}{@content } }";
// var mixins = "@mixin component($name){.#{$name}{@content } } @mixin part($name){& &__#{$name}{@content } } @mixin option($name){&.\--#{$name}{@content; } } @mixin whenComponentOption($option, $parent, $part){@at-root .#{$parent}.\--#{$option} .#{$parent}__#{$part} {@content; } } @mixin tweak($name){#csstyle .\[#{$name}\]{@content; } } @mixin location($name){#csstyle .\@#{$name}{@content; } }";

angular.module('csstyle').directive('example', function(){
  return {
    restrict: 'E',
    link: function(scope, elem, attrs){
      var scss = $(elem).find('.scss');
      var startingcss = $(elem).find('.starting-css').text();
      var endingcss = $(elem).find('.ending-css').text();
      var html = $(elem).find('.html');
      var typescss = $(elem).find('.type-scss');
      var typehtml = $(elem).find('.type-html');
      var typescssRow = parseInt(attrs.typeScssAtRow, 10) || 0;
      var typescssCol = parseInt(attrs.typeScssAtCol, 10) || 0;
      var typehtmlRow = parseInt(attrs.typeHtmlAtRow, 10) || 0;
      var typehtmlCol = parseInt(attrs.typeHtmlAtCol, 10) || 0;

      html.html(htmlEscape(html.html()));

      var scssEditor = createEditor(scss[0], 'scss');
      var htmlEditor = createEditor(html[0], 'html');

      var result = $('<div class="result"><style></style><div class="view"></div></div>');
      elem.append(result);

      // show initial styles before typing
      displayResult(startingcss);

      // scssEditor.gotoLine(typescssRow);
      // scssEditor.selection.moveCursorLineEnd();
      scssEditor.selection.moveCursorTo(typescssRow, typescssCol);
      htmlEditor.selection.moveCursorTo(typehtmlRow, typehtmlCol);

      run();

      function run(){
        simulateTyping(formatType(typescss.text()), scssEditor, function(){
          // var code = scssEditor.getValue();
          simulateTyping(formatType(typehtml.text()), htmlEditor, function(){
              displayResult(endingcss);
            // var code = scssEditor.getValue();
            
            // console.log("code", code);
            // convertToCSS(code, function(css){
              // displayResult(css);
            // });
          });

          // console.log("code", code);
          // convertToCSS(code, function(css){
          //   displayResult(css);
          // });
        });  
      }
      
      function displayResult(css){
        result.find('.view').html(htmlEditor.getValue());
        // insert example id so the examples are isolated
        console.log('#' + attrs.id + ' ' + css);
        result.find('style').text('#' + attrs.id + ' ' + css);
      }

    }
  }

  /**
   * cleanup type before simulating it
   */
  function formatType(text){
    return text.replace(/\n$/, '');
  }

  function createEditor(selector, lang){
    var editor = ace.edit(selector);
    editor.renderer.setPadding(10);
    editor.renderer.setScrollMargin(10, 10);
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/" + lang);
    editor.renderer.setShowGutter(false);
    editor.setShowPrintMargin(false);
    editor.setOptions({
      maxLines: 30,
      fontFamily: "Source Code Pro"
    });
    editor.setBehavioursEnabled(false);
    return editor;
  }

  /**
   * Escape html so it can be displayed in ace editor
   */
  function htmlEscape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   * simulate typing code
   */
  function simulateTyping(code, editor, callback){
    $('.screen').addClass('--active');

    // convert to array if passed a string (first time)
    if (typeof code === 'string'){
      code = code.split('');
    }

    // check if done
    if (code.length < 1) {
      $('.screen').removeClass('--active');
      if (callback instanceof Function){
        callback();
      } 
      return;
    }

    // add slight pause for returns to make it feel more natural
    var character = code.shift();
    var timing = 60;

    if (character === "\n"){
      timing = 100;
    }

    // recursively type characters
    setTimeout(function(){
      editor.insert(character);
      simulateTyping(code, editor, callback);
    }, timing);
  }

  /**
   * Use Alloy service to convert scss to CSS
   */
  function convertToCSS(source, callback){
    $.ajax({
      url: "http://alloy.divshot.com/compile/scss",
      type: "POST",
      data: {
        type: "scss",
        // source: ".button{ background: blue; }"
        source: mixins + " " + source
      },
      success: function(css) {
        callback(css);
      },
      error: function(){
        console.log("error...invalid css maybe");
      }
    });
  }

});