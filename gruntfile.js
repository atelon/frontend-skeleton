'use strict';

const path = require("path");

module.exports = grunt => {

  // Load all availiable tasks by devs
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browser-sync');


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-stylelint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Init
  grunt.config.init({
    build_html: {
      dest: path.resolve(__dirname, "dist"),
      filename : 'index.html',
      link: [
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/assets/css/index.css'
        }
      ],
      script: [
        {
          type: 'text/javascript',
          src: '/assets/js/index.js'
        }
      ]
    },
    copy: {
      main: {
        files: [
          {
            src: path.resolve(__dirname, "src") + path.sep + 'robots.txt',
            dest: path.resolve(__dirname, "dist") + path.sep + 'robots.txt'
          }
        ]
      }
    },
    build_js: {
      entry: 'src/index.jsx',
      dest: 'dist/assets/js/index.js',
      format:  'umd'
    },
    build_css: {
      files: [
        {
          src: [
            'src/index.scss',
            'src/index.postcss'
          ],
          dest: 'dist/assets/css/index.css'
        }
      ]
    },
    browserSync: {
      bsFiles: {
        src : './dist/**/*'
      },
      options: {
      /*  ui: {
          port: 1080
        },*/
        server: {
          baseDir: "./dist",
          directory: true
        }
      }
    }
  });

  // Load all custom tasks
  grunt.task.loadTasks(
    path.resolve(__dirname, "grunt_tasks")
  );

};
