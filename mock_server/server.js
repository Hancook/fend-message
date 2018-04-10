/**
 * Created by hao.wang on 2017/3/29.
 */
const config = require('../config/common')
const chalk = require('chalk')
let PORT = config.mockServerPort

const argv = require('yargs').argv
if (argv.port) {
  PORT = argv.port
}

const express = require('express')
const app = express()

// import restc
const restc = require('restc')
// use restc middleware
app.use(restc.express())

app.use(express.static('static'));

app.all('/api*', function (req, res, next) {
  // 允许跨域访问
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Authorization,Content-Type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.listen(PORT, function () {
  console.log(chalk.bold.green('MockServer listening on PORT ' + PORT + '!'))
})

app.set('json spaces', 2)

// app.use('**', function (req, res, next) {
//   console.log('Request Type:', req.method)
//   next()
// })

module.exports = app
