import Vue from 'vue'
Vue.config.productionTip = false

// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')

require("babel-polyfill")

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.

// require.context(directory, useSubdirectories = false, regExp = /^\.\//)
// const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
const srcContext = require.context('../../src', true, /(?!main)(.vue|.js)$/)
srcContext.keys().forEach(srcContext)