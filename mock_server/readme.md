# mock_server

> 前端 api 模拟数据服务器


## 结构

- route 

    > api mock路由
    
    - account
    
      > 账户相关
      
    - ila 
    
      > 学业评估
      
        - student
        
          > 教师端
          
        - teacher
        
          > 学生端
          
    - las 
    
      > 学习诊断
      
        - student
        
          > 教师端
          
        - teacher
        
          > 学生端
          

## 使用 

- 全局安装 nodemon (热启动)

    ` npm install -g nodemon `
    
- 执行批处理文件（更改代码，自动重启）

    ` start-server.bat `

## 相关文档

- [chalk](https://www.npmjs.com/package/chalk)
  > 多彩日志

- [express](http://expressjs.jser.us/3x_zh-cn/api.html#res.status)
  > express

- [mockjs](https://github.com/nuysoft/Mock/wiki/Syntax-Specification)
  > mockjs json 数值生成


## 一个mock路由

```javascript
  {
    method:'get|post|put|delete',//不区分大小写
    path:'aa/bb/:id',// express path路径配置，默认都有basePath，首字母无需/，路径参数
    delay:0,//response 延时
    desc:'',//路由描述
    jsonHandler:function (req) { //返回json数据 通过req可以获取请求参数
      const json = Mock.mock({
        'data|20':[11,22],
        'page':1,
      })
      return {status:200,json}
    },
    handler:function (req,res) {//自定义handler
    }
  }
```

## 全局请求延时

  - 修改 `utils.js` 中 `RESPONSE_DELAY` 常量，默认为0，不延时
