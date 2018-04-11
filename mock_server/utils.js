/**
 * Created by hao.wang on 2017-4-21.
 */
const diff = require('diff-json-structure')
const request = require('request')
const urlJoin = require('url-join')
const chalk = require('chalk')
const app = require('./server')
const {API_HOST_PROD, JSON_RESPONSE_LOG_ON, REQUEST_PROD, RESPONSE_DELAY, RESPONSE_PROD} = require('./constants')

// 打印json结构的不同
function printDiff(json1, json2) {
  let parts = diff(json1, json2)
  parts.forEach(function (part) {
    part.value
      .split('\n')
      .filter(function (line) {
        return !!line
      })
      .forEach(function (line) {
        if (part.added) {
          process.stdout.write(chalk.green('+  ' + line) + '\n')
        } else if (part.removed) {
          process.stdout.write(chalk.red('-  ' + line) + '\n')
        } else {
          process.stdout.write(chalk.dim('   ' + line) + '\n')
        }
      })
  })
  process.stdout.write('\n')
}

/**
 *
 * @param basePath
 * @param routes
 *   route[_].method 为空默认是 all
 */
module.exports.registerRoutes = function (basePath, routes) {
  if (Array.isArray(routes)) {
    // console.log({routes})
    routes.forEach(function (route) {


      // route {
      //   method:'get|post',
      //   path:'path',
      //   delay:0,//response 延时
      //   requestProd:false,//请求正式api的数据
      //   responseProd:false,//返回正式api的数据
      //   desc:'',
      //   jsonHandler:function (req,res) { //返回json数据
      //     return {status:200,json:{}}
      //   },
      //   handler:function (req,res) {//自定义handler
      //   }
      // }

      let method = (route.method || 'all').toLowerCase()

      let requestProd = route['requestProd'] || REQUEST_PROD
      let responseProd = route['responseProd'] || RESPONSE_PROD

      app[method](urlJoin(basePath, route.path), function (req, res) {

        // let trueMethod = req.method.toLowerCase()
        //
        // if (method != 'all' && method != trueMethod) {
        //   let errorMsg = `请求不支持 ${trueMethod} ，请使用 ${method}`
        //   res.status(404).send(errorMsg)
        //   return
        // }

        let args = Array.prototype.slice.call(arguments)
        console.log(chalk.bold.blue('\n#################'))
        console.log(chalk.green(`[${req.method.toLowerCase()}] ` + req.originalUrl))
        console.log(chalk.yellow(route.desc))

        res.header('mock-path', route.path)

        if (route.jsonHandler) {

          let handlerJsonRs = (jsonRs) => {//jsonRs {status,json}
            if (JSON_RESPONSE_LOG_ON) {
              console.log(chalk.white(JSON.stringify(jsonRs.json, ' ', 2)))
            }

            setTimeout(() => {
              res.status(jsonRs.status || 200).json(jsonRs.json)
            }, route.delay || RESPONSE_DELAY || 0)

          }

          let jsonRs = route.jsonHandler.apply(this, args)

          if (requestProd) { // 请求正式服务器
            var url = API_HOST_PROD + req.originalUrl
            req.pipe(request(url, function (p_req, p_res) {

              let json = JSON.parse(p_res.body)

              console.log(chalk.red('~  api json vs mock json:'))

              printDiff(jsonRs.json, json)

              if (responseProd) {
                handlerJsonRs({
                  status: p_res.statusCode,
                  json,
                })
              }
            }))
          }

          !responseProd && handlerJsonRs(jsonRs)

        } else {
          route.handler.apply(this, args)
        }

      })
    })
  } else {
    console.log(chalk.red('routes 不是数组，无法注册'))
  }
}
