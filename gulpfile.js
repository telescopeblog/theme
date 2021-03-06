// generated on 2016-07-05 using generator-webapp 2.1.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep').stream;
var useref = require('gulp-useref');
var concat = require('gulp-concat');
var vendor = require('gulp-concat-vendor');
var output_dir= "assets";
var jsLibArray = [
  "bower_components/jquery/dist/jquery.min.js",
  "bower_components/materialize/dist/js/materialize.min.js"
];
var cssLibArray = [
  "bower_components/materialize/dist/css/materialize.min.css",
];

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('scripts', function() {
  gulp.src('assets/js/**/*.js')
    .pipe(concat('tele.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(output_dir + '/vendor/js'))

  gulp.src(jsLibArray)
    .pipe(concat('vendor.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(output_dir  + '/vendor/js'))
});

gulp.task('styles', function() {
  gulp.src('assets/css/**/*.css')
    .pipe(concat('tele.min.css'))
    .pipe($.if('*.css', $.cssnano({
      safe: true,
      autoprefixer: false
    })))
    .pipe(gulp.dest(output_dir + '/vendor/css'))

  /*gulp.src(cssLibArray)
    .pipe(concat('vendor.min.css'))
    .pipe($.if('*.css', $.cssnano({
      safe: true,
      autoprefixer: false
    })))
    .pipe(gulp.dest(output_dir + '/vendor/css'))*/

  gulp.src('bower_components/materialize/fonts/**/*')
    .pipe(gulp.dest(output_dir + '/vendor/fonts'))
});

function lint(files, options) {
  return gulp.src(files)
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', function() {
  return lint('app/scripts/**/*.js', {
      fix: true
    })
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', function() {
  return lint('test/spec/**/*.js', {
      fix: true,
      env: {
        mocha: true
      }
    })
    .pipe(gulp.dest('test/spec/**/*.js'));
});

gulp.task('html', ['styles', 'scripts'], function() {
  return gulp.src('app/*.html')
    .pipe($.useref({
      searchPath: ['.tmp', 'app', '.']
    }))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({
      safe: true,
      autoprefixer: false
    })))
    .pipe($.if('*.html', $.htmlmin({
      collapseWhitespace: true
    })))
    .pipe(gulp.dest(output_dir));
});

gulp.task('images', function() {
  return gulp.src('assets/img/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{
        cleanupIDs: false
      }]
    })))
    .pipe(gulp.dest('assets/vendor/img'));
});

gulp.task('fonts', function() {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {})
      .concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest(output_dir + '/fonts'));
});


gulp.task('extras', function() {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts', 'images', 'fonts'], function() {
  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    'assets/css/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('assets/css/*.css', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', function() {
  browserSync({
    notify: false,
    port: 8090,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], function() {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', function() {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], function() {
  return gulp.src('dist/**/*').pipe($.size({
    title: 'build',
    gzip: true
  }));
});

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
