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
postcss([require('postcss-nested'), require('../csstyle')]);
```
Be sure to include postcss-nested and csstyle in that order. 

Now you're set and can start creating components with options & parts, adding in tweaks and locations as needed. Enjoy!

## FAQ

### Can I use this with Libsass?
People using webpack or similar often want to load Sass via libsass. 
Unfortunately libsass is quite behind the ruby Sass and some things are [still missingl](https://sass-compatibility.github.io/)
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
    :hover & {
      background: blue;
    }
  }
}
```

### Can I configure the styling convention?
You can configure which symbol is used to denote `parts` by changing the `$csstyle-part-symbol` variable. The default is `__` but you can set it to `-` or whatever suits your style.

## License
MIT

## TODO
- make postcss version configurable too
