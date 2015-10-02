// var babel = require('babel');
var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({});

module.exports = function () {

  return {
    files: [
      { pattern: 'lib/*.ts', load: false }
    ],

    tests: [
      { pattern: 'test/*Spec.ts', load: false }
    ],

    postprocessor: webpackPostprocessor,

    bootstrap: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
