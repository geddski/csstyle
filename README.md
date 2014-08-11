# csstyle
Simple, structured, computer science approach for styling the web like a genius.

CSS is an unwieldy beast that, without strict discipline, will eventually destroy your soul.
csstyle makes it fun and easy again by giving you five intuitive abstractions to work with, exercising that strict
discipline so you don't have to.

## Benefits
csstyle makes your project's CSS cleanly organized and refreshingly consistent. 
You and your teamies will know exactly where to find style declarations.
You'll know exactly which parts of your application would be affected by style changes, 
making refactoring CSS feasible again.

It also makes your CSS much more readable. Instead of having to decipher the intent of each style rule 
you can quickly grok its meaning by the abstraction and name used. Future you is going to love you.

With csstyle you don't have to worry about specificity anymore.
Each abstraction is automatically assigned a specificity range and overridden by the next abstraction. 
So you'll never have to add extra nesting or the dreaded `!important` again.

csstyle also makes CSS file loading order no longer important. This means you can easily load all your files
up front with something super convenient like [sass-globbing](https://github.com/chriseppstein/sass-globbing). 
Or for extra performance (both in pageload time and since the browser has to check the DOM for potential matches for every CSS rule) 
you can load the styles on demand just when you need them.

csstyle was also designed to be a perfect match for Web/Angular/Ember/React components.

## Abstractions
These are the five abstractions of csstyle. You should be able to define most style rules in your project using one.
The abstractions are provided as SCSS mixins. (Stylus and LESS will be supported soon as well). While you could
technically use this approach without a CSS preprocessor you'd lose much of the readability/simplicity it offers.

### Components
Components are the building blocks of your application. 
Examples include buttons, modals, lists, dropdowns, search bars, tabs, sliders, etc.
Pretty much everything the user sees and interacts with is a component. 
For this example we'll create a button component.

Components are defined using the `component` mixin:

```scss
@include component(button){
  background: #eee;
}
```

The HTML for components is simply a classname:

```html
<div class="button" />
```
**tip**: Make one component per file so it's easy to find.

### Options
Components often have many variations. Create semantic options for your components
using the `option` mixin. Let's add a "large" option to our button component:

```scss
@include component(button){
  background: #eee;
  padding: 5px;

  @include option(large){
    padding: 20px;
  }
}
```

To use a component option simply add it after the component name, prefixed by two dashes.
Much like specifiying arguments to a command line tool.

```html
<div class="button --large" />
```

You can define and use as many options as you like:

```html
<div class="gallery --fullscreen --controls"></div>
```

Since options are just classes they can also be added/removed easily with JavaScript.

**tip**: options are a great place to leverage your preprocessor's mixins. If your component has multiple options that vary 
slightly, you can pull that code out into its own mixin and call it from your options:


```scss
@mixin effect($background, $highlight, $reflection){
  ... 
}

@include component(button){

  @include option(glossy){
    @include effect(#333, #888, true);
  }

  @include option(flat){
    @include effect(#999, #111, false);
  }
}
``` 

### Parts
Components are made up of parts. These are any child elements of the component itself that need styling.
Let's add an icon part to our button component.

```scss
@include component(button){

  @include part(icon){
    width: 15px;
    background: url('sweet-icon.png');
  }
}
```

In HTML parts are used by adding a `<component>__<part>` class to the element:

```html
<div class="button">
  <span class="button__icon"></span>
</div>
```
We include the component name in the part name to make it easy to know which 
component the part belongs to, as well as avoid any conflicts when nesting components.

Parts can also have their own options:

```scss
@include component(button){

  @include part(icon){
    width: 15px;
    
    @include option(huge){
      width: 100px;
    }
  }
}
```
Specified as arguments to the part:

```html
<div class="button">
  <span class="button__icon --huge"></span>
</div>
```

### Tweaks
Tweaks are generic styles and effects that can be applied to 
any number of components and parts. Use the tweak mixin to define them:

```scss
@tweak(hidden){
  display: none;
}

@tweak(rounded){
  border-radius: 10px;
}

@tweak(glass-effect){
  border: 1px solid rgba(255, 255, 255, .05);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, .5);
  background: rgba(72, 78, 99, .4);
}
```

Tweaks are applied by their class name:

```HTML
<div class="button rounded glass-effect" />
```

TODO: maybe we should prefix tweak classes so they stand out.


### Locations
The final abstraction in csstyle is locations, meant for overriding any previous
styles in a specific location. For example say your
home page needs to have slightly different padding than the other pages. Use the 
location mixin:

```scss
@include location(home){
  background: #886879;

  // override the page component just in this location 
  @include component(page){
    padding: 28px;
  }
}
```

Locations correspond to a classname. For example it's common to put 
a location class name on the body tag:

```html
<body class="home">
```
Locations should be used sparingly. It's usually better to add new options or
tweaks, but sometimes it makes sense to make a location specific style.

## Getting Started
Add id="csstyle" to your html element.
Download the scss mixins

## Demo
gem install sass
gem install sass-globbing
cd demo
sass -r sass-globbing --watch styles.scss --style expanded

## License
MIT

## TODO
- make pretty demo and host on gh-pages
- simple unit test for specificity
- ship mixins as gem