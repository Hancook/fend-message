#!/usr/bin/env bash
# npm install
export PHANTOMJS_CDNURL=http://cnpmjs.org/downloads
npm install --registry=https://registry.npm.taobao.org  --disturl=https://npm.taobao.org/dist --sass-binary-site=http://npm.taobao.org/mirrors/node-sass
# 全局设置npm源为taobao
# npm config set registry=https://registry.npm.taobao.org
