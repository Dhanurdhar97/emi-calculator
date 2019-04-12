var fs = require('fs');
var gulp = require('gulp'),
connect = require('gulp-connect');
var webpack = require('webpack');
var webpackGulp = require('webpack-stream');

/**
 * Compile script files
 */
gulp.task('scripts', function(done) {
    var ts = require('gulp-typescript');
    var tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript') });
    var tsResult = gulp.src(['./src/**/*.ts', './spec/**/*.ts'], { base: '.' })
        .pipe(ts(tsProject));        
    tsResult.js
        .pipe(gulp.dest('./'))
        .on('end', function() {
            done();
        });
});

/**
 * Compile scss files
 */
gulp.task('styles', function() {
    var sass = require('gulp-sass');
    return gulp.src(['./styles/**/*.scss'], { base: './' })
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: './node_modules/@syncfusion/'
        }))
        .pipe(gulp.dest('.'));
});

/**
 * Bundle all module using webpack
 */
gulp.task('bundle', function() {
    var webpackConfig = require(fs.realpathSync('./webpack.config.js'));
    return gulp.src('')
        .pipe(webpackGulp(webpackConfig, webpack))
        .pipe(gulp.dest('.'));
});

/**
 * Build ts and scss files
 */
gulp.task('build', function(done) {
    var runSequence = require('run-sequence');
    runSequence('scripts', 'styles', 'bundle', done);
});

/**
 * Run test for samplebrowser
 */
gulp.task('test', function(done) {
    var karma = require('karma');
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        browsers: ['ChromeHeadless'],
        browserNoActivityTimeout: 30000
    }, function(e) {
        done(e === 0 ? null : 'karma exited with status ' + e);
    }).start();
});

/**
 * Load the samples
 */
gulp.task('serve', ['build'], function (done) {
    var browserSync = require('browser-sync').create();
    //var bs = browserSync.create('Essential JS 2');
    browserSync.init({
        server: "./"
    });

    //gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("./styles/**/*.scss",['styles']);
    gulp.watch("./src/**/*.ts").on('change',function(){
        console.log('change the ts files');
        var runSequence = require('run-sequence');
        runSequence('scripts','bundle', browserSync.reload);
        //gulp.start('styles',);
    });
    
    gulp.watch("./src/**/*.html").on('change', browserSync.reload);
    
    /*var options = {
        server: {
            baseDir: './'
        },
        ui: true
    };*/
    //bs.init(options, done);
   // gulp.watch("./src/**/).on('change',function(bs){
       // console.log(' found any change',bs);
     //   bs.reload;
   // });
});
gulp.task('webserver', function() {
    connect.server();
  });
gulp.task('default', ['webserver']);