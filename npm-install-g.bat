::npm安装依赖
@echo off
call npm install --registry=https://registry.npm.taobao.org  --disturl=https://npm.taobao.org/dist --sass-binary-site=http://npm.taobao.org/mirrors/node-sass nodemon -g
pause
