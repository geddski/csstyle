var Range = ace.require('ace/range').Range;
var mixins = "@mixin component($name){.#{$name}{@content } }";
// var mixins = "@mixin component($name){.#{$name}{@content } } @mixin part($name){& &__#{$name}{@content } } @mixin option($name){&.\--#{$name}{@content; } } @mixin whenComponentOption($option, $parent, $part){@at-root .#{$parent}.\--#{$option} .#{$parent}__#{$part} {@content; } } @mixin tweak($name){#csstyle .\[#{$name}\]{@content; } } @mixin location($name){#csstyle .\@#{$name}{@content; } }";

angular.module('csstyle').directive('example', function(){
  return {
    restrict: 'E',
    link: function(scope, elem, attrs){
      var scss = $(elem).find('.scss');
      var html = $(elem).find('.html');
      var result = $(elem).find('.section__result');

      html.html(escape(html.html())); // lol htmls

      var scssEditor = createEditor(scss[0], 'scss');
      var htmlEditor = createEditor(html[0], 'html');

      highlight(htmlEditor, html.attr('highlight'));
      highlight(scssEditor, scss.attr('highlight'));

      // will use this once editing is enabled 
      // function displayResult(css){
      //   result.find('.view').html(htmlEditor.getValue());
      //   // insert example id so the examples are isolated
      //   console.log('#' + attrs.id + ' ' + css);
      //   result.find('style').text('#' + attrs.id + ' ' + css);
      // }

      // get selection range from attribute
      function highlight(editor, rangeStr){
        if (!rangeStr) return;
        var ranges = rangeStr.split(' ');
        for (var i = 0; i < ranges.length; i++){
          var rangeArr = ranges[i].split(',');
          var range = new Range(rangeArr[0],rangeArr[1],rangeArr[2],rangeArr[3]);
          editor.session.addMarker(range, "ace_active-line", "letter");
        }
      }

    }
  }

  function createEditor(selector, lang){
    var editor = ace.edit(selector);
    editor.renderer.setPadding(10);
    editor.renderer.setScrollMargin(10, 10);
    editor.setTheme("ace/theme/monokai");
    editor.setReadOnly(true);
    editor.setHighlightActiveLine(false);
    editor.getSession().setMode("ace/mode/" + lang);
    editor.renderer.setShowGutter(false);
    editor.setShowPrintMargin(false);
    editor.setOptions({
      maxLines: 100,
      autoScrollEditorIntoView: true,
      fontFamily: "Source Code Pro"
    });
    editor.setBehavioursEnabled(false);
    editor.renderer.$cursorLayer.element.style.opacity=0;
    editor.resize(true);
    return editor;
  }

  /**
   * Escape html so it can be displayed in ace editor
   */
  function escape(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
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