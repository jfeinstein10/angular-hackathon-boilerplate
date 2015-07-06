var del = require('del');
var gulp = require('gulp');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var Builder = require('systemjs-builder');

var PATHS = {
    src: {
      js: 'src/**/*.js',
      html: 'src/**/*.html'
    },
    lib: {
      js: [
        'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',

        'node_modules/angular/angular.js',
        'node_modules/angular-new-router/dist/router.es5.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-material/angular-material.min.js',

        'node_modules/rx-angular/node_modules/rx/dist/rx.min.js',
        'node_modules/rx-angular/dist/rx.angular.min.js'
      ],
      css: [
        'node_modules/angular-material/angular-material.min.css'
      ]
    }
};

gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('src', function () {
  var builder = new Builder({
    baseURL: './src',
    defaultJSExtensions: true,
    transpiler: 'traceur',
    traceurOptions: {
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }
  });
  builder.buildSFX('app', 'dist/app.js', {
    minify: false,
    sourceMaps: true,
    runtime: false
  })
  .then(function() {
    console.log('Build complete');
  })
  .catch(function(err) {
    console.log('Build error');
    console.log(err);
  });
});

gulp.task('html', function() {
  return gulp.src(PATHS.src.html)
    .pipe(gulp.dest('dist/'));
})

gulp.task('libs-js', function () {
    var size = require('gulp-size');
    return gulp.src(PATHS.lib.js)
      .pipe(size({showFiles: true, gzip: true}))
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/lib'));
});

gulp.task('libs-css', function() {
    var size = require('gulp-size');
    return gulp.src(PATHS.lib.css)
      .pipe(size({showFiles: true, gzip: true}))
      .pipe(concat('libs.css'))
      .pipe(gulp.dest('dist/lib'));
})

gulp.task('play', ['default'], function () {

    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.js, ['src']);

    app = connect().use(serveStatic(__dirname + '/dist'));
    http.createServer(app).listen(port, function () {
      open('http://localhost:' + port);
    });
});

gulp.task('libs', ['libs-js', 'libs-css']);

gulp.task('default', ['src', 'html', 'libs']);
