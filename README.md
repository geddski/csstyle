# <think of cool name for this method>

## Groups

### Components
specificity: 0010

### Elements
specificity: 0010

### Modifiers
specificity: 0020

### Tweaks
specificity: 0021

### Locations
specificity: 0022 to 0031

## benefits

- can easily add/remove the modifiers since they're just classes.
- don't have to retype the component name multiple times in the markup
- can apply multiple modifiers to an element
- don't have to use @extend so less bloat in generated CSS
- order of classes doesn't matter
- the loading order of stylesheets no longer matters, so you can [glob load](https://github.com/chriseppstein/sass-globbing) your stylesheets if you want, or load them on demand w javascript.

## drawbacks

- if you have two components with the same modifiers and you're using both those components on a single element it won't know which modifier to use. If only CSS had full on regexp selectors. Better not to use more than one component per element anyway.


## Demo
gem install sass
gem install sass-globbing
sass -r sass-globbing --watch styles.scss --style expanded

## TODO
- make pretty and host on gh-pages
- think of cool name
- simple unit test for specificity