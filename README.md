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

### Can I configure the styling convention (SASS)?
There are a few settings you can change. You can set these to whatever suits your style.

 - The style to denote `options` by changing the `$csstyle-option-symbol` variable. The default is `\--`.
 - The style to denote `parts` by changing the `$csstyle-part-symbol` variable. The default is `__`.
 - The style to denote `tweaks` by changing the `$csstyle-tweak-symbol` variable. The default is `\+`.
 - The style to denote `locations` by changing the `$csstyle-location-symbol` variable. The default is `\@`.

**All characters besides `_` need to be escaped!** However, if you are using dashes, only _the first one_ needs to be escaped. Use two backslashes to properly escape in SASS. For example to use a forward slash to separate parts, set $csstyle-part-symbol to `\\/`.

In adition to that, you can also change your app's root `id` on the html or body element by changing the `$csstyle-root-id` variable. The default is `csstyle`.

## License
MIT

## TODO
- make postcss version configurable too
