/**
 * Created by hao.wang on 2017/4/25 0025.
 */
var chalk = require('chalk')
var express = require('express')
var app = express()
var compression = require('compression')
var path = require('path')
const PORT = 8081

// app.use(express.logger())
app.use(compression())
app.use(express.static(path.join(__dirname, '../dist/')))
// app.use(express.methodOverride())
// app.use(express.bodyParser())
app.listen(PORT, function () {
  console.log(chalk.bold.green('BuildServer listening on PORT ' + PORT + '!'))
})
