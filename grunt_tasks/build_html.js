'use strict';

const { minify } = require('html-minifier');
const path = require("path");

module.exports = grunt => {

  grunt.task.registerTask('build_html', 'Build html files', (configName = 'build_html') => {

    // grabbing config
    let config = grunt.config(configName);

    if (grunt.util.kindOf(config) !== "object"){

      grunt.fail.fatal('build_html: Config should be object.');
      return false;

    }

    // dest
    if (!config.hasOwnProperty('dest')){

      grunt.fail.fatal('build_html: Missing \'dest\' param.');
      return false;

    }
    else{

      if (grunt.util.kindOf(config.dest) !== "string"){

        grunt.fail.fatal('build_html: \'dest\' param should be a string.');
        return false;

      }

    }

    // filename
    let targetFileName = (() => {

      let isStringInObj = () => (config.hasOwnProperty('filename') && (grunt.util.kindOf(config.filename) === "string"));

      let isValidFileName = (str) => (new RegExp('/^[a-z0-9_.@()-]+\.html$/i')).test(str);

      return (isStringInObj() && isValidFileName(config.html)) ? config.html : 'index.html'
    })();


    // link & script
    let checkBlock = (prop) => {

      if (config.hasOwnProperty(prop)){

          let isString = (str) => (grunt.util.kindOf(str) === "string");

          let isArray = (obj) => (grunt.util.kindOf(obj) === "array");

          let isObject = (obj) => (grunt.util.kindOf(obj) === "object");

          let areStrings = (obj) => {

            for (let prop in obj) {

              if(!isString(prop)){

                grunt.fail.fatal(`build_html: Wrong option format in '${prop}' of '${JSON.stringify(obj, null, 4)}'.`);
                return false;

              }

            }

            return true;

          };

          if (!(isArray(config[prop]) && config[prop].every(el => (isObject(el) && areStrings(el))))){

            grunt.fail.fatal(`build_html: Options '${prop}' should be array of obj.`);
            return [];

          }

          return config[prop];
      }

      return []

    };

    let linkBlock = checkBlock('link');
    let scriptBlock = checkBlock('script');

    let htmlTemplate = (() => {

      let tmpl = `<!DOCTYPE html><html><head><meta charset="utf-8">`;

      linkBlock.forEach(el => { tmpl = tmpl + `<link rel="${el.rel}" type="${el.type}" href="${el.href}">`; });

      tmpl += `<body><div id="app"></div>`;

      scriptBlock.forEach(el => { tmpl += `<script type="${el.type}" src="${el.src}"></script>`; });

      tmpl += `</body></html>`;

      return tmpl;

    })();

    htmlTemplate = minify(
      htmlTemplate,
      {
        ...(config.hasOwnProperty('minify')) && config.minify
      }
    );

    // Write html
    grunt.file.write(config.dest + path.sep +  targetFileName, htmlTemplate);

  });

};
