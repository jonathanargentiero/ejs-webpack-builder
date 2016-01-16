# EJS Webpack Builder

A Webpack Plugin to build EJS files directly.

## Install

```npm install ejs-webpack-builder --save-dev```

## Configuration

Define in your webpack configuration file the plugins with an array of file you want to compile

```
// webpack.config.js

var options = {
  files: ['.src/index.ejs','.src/admin.ejs']
};

module.exports = {
  plugins: [
    new ejsBuilder(options)
  ]
};
```

## Options

You can configure your compilation with additional parameters:

```
{
  root: __dirname,
  files: [{
    source: {
      name: 'index.ejs',
      dir: './src',
    },
    target: {
      name: 'index.html',
      dir: './public'
    },
    parameters: {
      title: 'my site title',
      randomValue: 0
    },
    encoding: 'utf8'
  }]
}
```

## EJS support

Go to the [Latest Release](https://github.com/mde/ejs/)

## License

MIT (http://www.opensource.org/licenses/mit-license.php)