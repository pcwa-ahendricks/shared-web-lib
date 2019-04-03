# Neu! Website

## Babel Configuration

### Plugin Order

It appears that placing plugin 'inline-react-svg' before 'transform-assets-import-to-string' plugin corrected a runtime error when navigating to a page that displays an svg. I have not found documentation on repository regarding ordering requirements. Which makes sense cause we don't want to inline an `<img src=""/>` using 'transform-assets-import-to-string' plugin, instead we want the `<svg/>` markup.

There is a note on [babel-plugin-flow-react-proptypes](https://www.npmjs.com/package/babel-plugin-flow-react-proptypes#suppression) regarding plugin order and usage. This is why 'transform-flow-strip-types' is placed in all environment plugin sections instead of above where intended order might not be respected.

    If you already have other plugins in plugins section. It is important to place flow-react-proptypes before the following plugins:

    transform-class-properties
    transform-flow-strip-types

## Todos

- [ ] Add some tests
- [ ] Add custom 404
- [ ] Fix vscode debugger

### GO-LIVE

Find **GO-LIVE** tagged comments and address them prior to _Go Live_ date.

Forms Now deployment will no longer be necessary.

## Package Dependencies

### Next.js

In order to suppress errors when deploying to Now. The following dependencies have been added explicitly. Future versions of Now/now-builder(s) may not require these to be added explicitly.

- styled-jsx
- webpack
- @babel/runtime-corejs2 **_(dev)_**

~~@babel/plugin-transform-runtime **_(dev)_**~~

~~Relating to `@babel/plugin-transform-runtime` the following code was added to `.babelrc`~~

    // DEPRECATED
    [
        "@babel/plugin-transform-runtime",
        {
            "corejs": 2
        }
    ]

## Now (Deployments)

### Routing

When routes are added to next.js app, relevant sub-routes will likely need added to the Now configuration rewrite rule if they don't have their own respective index page. Failure to rewrite to 404 will result in that sub-route showing a directory listing. See [https://zeit.co/docs/v2/routing/directory-listing#disabling-the-directory-listing](https://zeit.co/docs/v2/routing/directory-listing#disabling-the-directory-listing) for more info regarding Now directory listing.

## Miscellaneous

### Convert Images

Convert baseline jpeg images to progressive jpegs with the following.

    jpegtran -copy none -progressive -outfile inlet-progressive.jpg inlet.jpg

### Material Theme

Theme generated with [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/)

See [this link](https://material-ui.com/style/color/#official-color-tool) for more info on Palette.
