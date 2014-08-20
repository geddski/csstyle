var mixins = "@mixin component($name){.#{$name}{@content } }";
// var mixins = "@mixin component($name){.#{$name}{@content } } @mixin part($name){& &__#{$name}{@content } } @mixin option($name){&.\--#{$name}{@content; } } @mixin whenComponentOption($option, $parent, $part){@at-root .#{$parent}.\--#{$option} .#{$parent}__#{$part} {@content; } } @mixin tweak($name){#csstyle .\[#{$name}\]{@content; } } @mixin location($name){#csstyle .\@#{$name}{@content; } }";

var componentCSS = createEditor("componentCSS", "scss");
var componentHTML = createEditor("componentHTML", "html");

var optionsCSS = createEditor("optionsCSS", "scss");
var optionsHTML = createEditor("optionsHTML", "html");

// show before styling
$('#componentR .visualization').html(componentHTML.getValue());

componentCSS.gotoLine(2);
componentCSS.selection.moveCursorLineEnd();

// type('\ncolor: green;\nborder: 2px solid purple;', componentCSS, function(){
//   var code = componentCSS.getValue();
//   convertToCSS(code, function(css){
//     console.log("css", css);
//     $('#componentR .visualization').html(componentHTML.getValue());
//     $('#componentR style').text(css);
//   });
// });

function createEditor(selector, lang){
  var editor = ace.edit(selector);
  editor.renderer.setPadding(15);
  editor.renderer.setScrollMargin(15, 15);
  editor.setTheme("ace/theme/monokai");
  editor.setFontSize(18);
  editor.getSession().setMode("ace/mode/" + lang);
  editor.renderer.setShowGutter(false);
  editor.setShowPrintMargin(false);
  editor.setOptions({
    maxLines: 30,
    fontFamily: "Source Code Pro"
  });
  return editor;
}

/**
 * simulate typing code
 */
function type(code, editor, callback){
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

  // recursively type characters
  setTimeout(function(){
    editor.insert(code.shift());
    type(code, editor, callback);
  }, 80);
}

function convertToCSS(source, callback){
  // console.log("source", source);
  // return;

  $.ajax({
    url: "http://alloy.divshot.com/compile/scss",
    type: "POST",
    data: {
      type: "scss",
      // source: ".button{ background: blue; }"
      source: mixins + " @include component(button) {background: orange; color: green; border: 2px solid purple; } "
    },
    success: function(css) {
      callback(css);
    },
    error: function(){
      console.log("error...invalid css maybe");
    }
  });
}