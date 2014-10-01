# [csstyle](http://csstyle.io)
[![csstyle](https://github.com/geddski/csstyle/blob/master/site/common/images/csstyle.png)](http://csstyle.io)  

Clean, simple, for styling the web.

Check out the docs and examples on [csstyle.io](http://csstyle.io)


## Getting Started
1. make sure you have the latest stable SASS (3.4).

2. Add `id="csstyle"` to your html or body element. This is necessary so that components with their
parts and options can nest indefinitely yet always be overridden by tweaks and locations.

3. Download the csstyle mixins and `@import` them into your sass file.

    You can download the mixins from npm
    ```
    npm install csstyle
    ```

    or from bower
    ```
    bower install csstyle
    ```

Now you can start creating components with options & parts, adding in tweaks and locations as needed.

## License
MIT

## TODO
- ship mixins as gem
- support stylus, rework, and less once API is solid
