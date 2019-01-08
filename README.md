# Neu! Website

## Babel Configuration

### Plugin Order

It appears that placing plugin 'inline-react-svg' before 'transform-assets-import-to-string' plugin corrected a runtime error when navigating to a page that displays an svg. I have not found documentation on repository regarding ordering requirements. Which makes sense cause we don't want to inline an `<img src=""/>` using 'transform-assets-import-to-string' plugin, instead we want the `<svg/>` markup.

There is a note on [babel-plugin-flow-react-proptypes](https://www.npmjs.com/package/babel-plugin-flow-react-proptypes#suppression) regarding plugin order and usage. This is why 'transform-flow-strip-types' is placed in all environment plugin sections instead of above where intended order might not be respected.

    If you already have other plugins in plugins section. It is important to place flow-react-proptypes before the following plugins:

    transform-class-properties
    transform-flow-strip-types

### Todos

- [ ] Add some tests
- [ ] Add custom 404
- [ ] Fix vscode debugger

### Convert Images

Convert baseline jpeg images to progressive jpegs with the following.

    jpegtran -copy none -progressive -outfile inlet-progressive.jpg inlet.jpg
