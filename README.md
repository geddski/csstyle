
## benefits

- can easily add/remove the modifiers since they're just classes.
- don't have to retype the component name multiple times in the markup
- can apply multiple modifiers to an element
- don't have to use @extend so less bloat in generated CSS
- order of classes doesn't matter
- only the order of groups matters, so you can glob load your stylesheets if you want. See https://github.com/chriseppstein/sass-globbing

## drawbacks

- you have to include the CSS groups in the right order so that pages override tweaks which override components.
- if you have two components with the same modifiers and you're using both those components on a single element it won't know which modifier to use. If only CSS had full on regexp selectors. Better not to use more than one component per element anyway.


## Demo
gem install sass
gem install sass-globbing
sass -r sass-globbing --watch styles.scss
TODO: make pretty and host on gh-pages