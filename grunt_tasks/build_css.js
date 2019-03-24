'use strict';

const sass = require('node-sass');
const path = require('path');
const pixrem = require('pixrem');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss  = require('postcss');
const purgecss  = require('purgecss');
const precss  = require('precss');

module.exports = grunt => {

  var self = this;

  grunt.task.registerTask('build_css', 'Build css files', function(configName = 'build_css'){

    // grabbing config
    let config = grunt.config(configName);

    let content = [];

    //console.log(config.files[0].src[0]);

    // grab sass
    let d1 = grunt.file.read(config.files[0].src[0]);
    //console.log(d1);

    content[0] = sass.renderSync({

      data: d1

    });

    //console.log(content[0]);

    grunt.file.write('tmp/scss.css', content[0].css);

    // grab postcss
    content[1] = grunt.file.read(config.files[0].src[1]);

    content[2] = grunt.file.read('tmp/scss.css');

    content[3] = content[1] + content[0].css;

    console.log(content[3]);

    var done = this.async();

    postcss([
      precss,
      autoprefixer
    ])
    .process(
      content[3],
      {
        from: config.files[0].src[1],
        to: config.files[0].dest
      }
    )
    .then(result => {

      grunt.file.write(config.files[0].dest, result.css);

      done();

      //fs.writeFile('dest/app.css', result.css, () => true)
      //if ( result.map ) {
      //  fs.writeFile('dest/app.css.map', result.map, () => true)
      //}
    });


/*    config.files.forEach(function(fileObj) {

      var contents = [];

      fileObj.src.forEach(function(filePath) {

        let ext  = /(?:\.([^.]+))?$/.exec(filePath)[1];

        if (ext == 'scss'){

          contents[0] = sass.renderSync({

            data: grunt.file.read(filePath)

          });

        }
        else if (ext == 'postcss'){



        }

        src = src.concat(glob.sync(pathPattern));

      });



   });

    this.config.src.forEach(function(pathPattern) {

      console.log("Source Files: ", files);
      src = src.concat(files);
    });

    var result = sass.renderSync({
      data: scss_content
  [, options..]*/
});

/*

options: {
      map: true, // inline sourcemaps

      // or
      map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'dist/css/maps/' // ...to the specified directory
      },

      processors: [
        require('pixrem')(), // add fallbacks for rem units
        require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
        require('cssnano')() // minify the result
      ]
    },
    dist: {
      src: 'css/*.css'
    }
*/

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
