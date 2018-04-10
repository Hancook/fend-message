require('./check-versions')()
var argv = require('yargs').argv



process.env.NODE_ENV = 'production'
process.env.RENAME_ENTRY_ROUTE = !argv.no_rename_entry
process.env.API_BASE_URL = !argv.api_base_url

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')

var webpackConfig = require('./webpack.prod.conf')
webpackConfig.watch = !!argv.watch

// var spinner = ora('building for production...')
// spinner.start()

console.log(chalk.yellow('building for production...'))

console.log(chalk.green('build params:', JSON.stringify(argv, '', 2)))

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    // spinner.stop()
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
