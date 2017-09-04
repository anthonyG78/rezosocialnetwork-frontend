require('./check-versions')()

/**
 * Get the environment name for the 'build' context.
 * From command parameter or default config
 */
process.env.NODE_ENV = require('./check-argv-environment')('build')

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
// Webpack config from current environment
var webpackConfig = require('./' + config.environments[process.env.NODE_ENV].webpackConfig)

var spinner = ora('building for '+ process.env.NODE_ENV +'...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
