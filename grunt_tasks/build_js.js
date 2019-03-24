'use strict';

const rollup = require('rollup');
const path = require("path");
const babel = require("rollup-plugin-babel");
const uglify = require("rollup-plugin-uglify");

module.exports = grunt => {

  var self = this;

  grunt.task.registerTask('build_js', 'Build js files', function(configName = 'build_js'){

    // grabbing config
    let config = grunt.config(configName);

    //console.log(config);

    var done = this.async();

    rollup.rollup({
      input: config.entry,
      plugins: [
        babel({
          exclude: 'node_modules/**'
        }),
        uglify.uglify()
      ]
    }).then(function (bundle) {
      bundle.generate({
        output: {
          file:  config.dest,
          format: config.format
        }
      }).then(function (output){

        grunt.file.write(config.dest, output.code);

        //console.log('hue!');
        done();

      });
      //console.log('hue!');
      /*bundle.write({
        output: {
          file:  config.dest,
          format: config.format
        }
      });*/

    },
  function(err){
    console.log('hue2!');
    console.log(err);
    done();
  });

  });

};
/*
var done = this.async();

    var options = this.options({
      cache: null,
      external: [],
      format: 'es',
      exports: 'auto',
      moduleId: null,
      moduleName: null,
      globals: {},
      indent: true,
      useStrict: true,
      banner: null,
      footer: null,
      intro: null,
      preferConst: false,
      outro: null,
      onwarn: null,
      paths: null,
      plugins:[],
      pureExternalModules: false,
      sourceMap: false,
      sourceMapFile: null,
      sourceMapRelativePaths: false,
      treeshake: true,
      interop: true
    });

    var promises = this.files.map(function(f) {

      if (f.src.length === 0) {
        grunt.fail.warn('No entry point specified.');
      }

      var entry;
      if (f.src.length > 1) {
        entry = f.src;
        grunt.log.writeln('Multiple entry points detected. Be sure to include rollup-plugin-multi-entry in plugins.');
      } else {
        entry = f.src[0];

        if (!grunt.file.exists(entry)) {
          grunt.fail.warn('Entry point "' + entry + '" not found.');
        }
      }

      var plugins = options.plugins;

      if (typeof plugins === 'function') {
        plugins = plugins();
      }

      return rollup.rollup({
        cache: options.cache,
        input: entry,
        external: options.external,
        plugins: plugins,
        context: options.context,
        moduleContext: options.moduleContext,
        onwarn: options.onwarn,
        preferConst: options.preferConst,
        pureExternalModules: options.pureExternalModules,
        treeshake: options.treeshake,
        interop: options.interop
      }).then(function(bundle) {

        var sourceMapFile = options.sourceMapFile;
        if (!sourceMapFile && options.sourceMapRelativePaths) {
          sourceMapFile = path.resolve(f.dest);
        }

        return bundle.generate({
          format: options.format,
          exports: options.exports,
          paths: options.paths,
          moduleId: options.moduleId,
          name: options.moduleName,
          globals: options.globals,
          indent: options.indent,
          strict: options.useStrict,
          banner: options.banner,
          footer: options.footer,
          intro: options.intro,
          outro: options.outro,
          sourcemap: options.sourceMap,
          sourcemapFile: sourceMapFile
        });
      }).then(function(result) {
        var code = result.code;

        if (options.sourceMap === true) {
          var sourceMapOutPath = f.dest + '.map';
          grunt.file.write(sourceMapOutPath, result.map.toString());
          code += "\n//# sourceMappingURL=" + path.basename(sourceMapOutPath);
        } else if (options.sourceMap === "inline") {
          code += "\n//# sourceMappingURL=" + result.map.toUrl();
        }

        grunt.file.write(f.dest, code);
      });
    });

    Promise.all(promises)
      .then(function() {
        done();
      })
      .catch(function(error) {
        grunt.fail.warn(error);
      });
  });
*/
