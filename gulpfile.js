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

var ignoreFiles = [
  './logs/**/.log'
];

gulp.task('debug', function() {
  nodemon({
    execMap: {
      js: 'node-inspector --web-port 10100 & node --debug'
    },
    script: 'app.js',
    watch: jsFiles,
    ignore: ignoreFiles,
    legacyWatch: true,
    verbose: true
  }).on('start', ['']);
});


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

gulp.task('serve', ['debug']);
