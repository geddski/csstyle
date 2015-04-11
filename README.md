# [csstyle](http://csstyle.io)
[![csstyle](https://github.com/geddski/csstyle/blob/master/site/common/images/csstyle.png)](http://csstyle.io)

Clean, simple, for styling the web.

Check out the docs and examples on [csstyle.io](http://csstyle.io)

You can use csstyle with either [Sass](http://sass-lang.com/) or [postcss](https://github.com/postcss/postcss).

## Getting Started
1. Setup your project with either Sass or Postcss. If you're using Sass make sure you have the latest stable SASS (3.4).

2. Add `id="csstyle"` to your html or body element. This is necessary so that components with their
parts and options can nest indefinitely yet always be overridden by tweaks and locations.

3. Download csstyle from npm:

    ```
    npm install csstyle --save
    ```

    or from bower:
    ```
    bower install csstyle --save
    ```
    
4. If you're using Sass, import into your stylesheets:
```scss
@import 'csstyle';
```

If you're using postcss, add csstyle as a plugin:
```js
postcss([require('postcss-nested'), require('csstyle')]);
```
Be sure to include postcss-nested and csstyle in that order.

Now you're set and can start creating components with options & parts, adding in tweaks and locations as needed. Enjoy!

## Customizing Styling Conventions
csstyle lets you change the style conventions to whatever suits your style.

### Default Symbols
- `options`: `\--`
- `parts`: `__`
- `tweaks`: `\+`
- `locations`: `\@`
- `rootId`: `csstyle`

### With SASS
Override the defaults using SASS variables.
- `options`: `$csstyle-option-symbol`
- `parts`: `$csstyle-part-symbol`
- `tweaks`: `$csstyle-tweak-symbol`
- `locations`: `$csstyle-location-symbol`
- `rootId`: `$csstyle-root-id`

Example: 
```scss
  $csstyle-part-symbol: '\\/';
  $csstyle-root-id: 'app';
```

### With Postcss
Override the defaults by calling the cssytle function with an options object.
- `options`: `optionSymbol`
- `parts`: `partSymbol`
- `tweaks`: `tweakSymbol`
- `locations`: `locationSymbol`
- `rootId`: `rootId`

Example: 

```js
  require('../csstyle')({optionSymbol: '\\-', partSymbol: '\\/', rootId: 'app'})
```

**IMPORTANT NOTE** All characters besides `_` need to be escaped! However, if you are using dashes, only _the first one_ needs to be escaped. Use two backslashes to properly escape in SASS. For example to use a forward slash to separate parts, set $csstyle-part-symbol to `\\/`.


## FAQ

### Can I use this with Libsass?
People using webpack or similar often want to load Sass via libsass.
Unfortunately libsass is quite behind the ruby Sass and some things are [still missing](https://sass-compatibility.github.io/)
before it will work with csstyle. As a workaround while we wait for libsass you
can load your Sass files with the [ruby Sass loader](https://github.com/ddelbondio/ruby-sass-loader) and it will work just fine, it just
won't be as fast as libsass.

### How do parts react to component states like hover?
In Sass you can append a `&` to a selector or pseudo-selector to have it applied to the parent context. So for example to have a `part` react when the `component` gets hovered:

```scss
@include component(capacitor){
  background: red;
  
  @include part(flux){
    background: orange;
  }
  
  &:hover & {
    @include part(flux){
      background: blue;
    }
  }
}
```

## License
MIT

## TODO
- make postcss version configurable too
