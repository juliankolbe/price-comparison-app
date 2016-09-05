var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var jsFiles = [
  '*.js',
  // './controllers/**/*.js',
  './lib/**/*.js',
  // './models/**/*.js',
  // './routes/**/*.js',
  // './views/**/*.js',
  // './config/**/*.js'
];

gulp.task('test', function () {

    var options = {
        script: 'app.js',
        delayTime: 5,
        env: {
            'PORT': 5000
        },
        watch: jsFiles,
        legacyWatch: true
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        });
});

gulp.task('develop', function () {

    var options = {
        script: 'app.js',
        delayTime: 5,
        env: {
            'PORT': 3000
        },
        watch: jsFiles,
        legacyWatch: true
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        });
});

gulp.task('serve', ['develop']);
