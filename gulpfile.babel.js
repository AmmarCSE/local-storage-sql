import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import webpack from 'webpack-stream';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('default', () => {
  return gulp.src('src/grid/App.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('/home/ammar/Work/react-gridify/dist'))
});

gulp.task('scripts', () => {
  return gulp.src('src/grid/App.js')
    .pipe(webpack(require('./webpack.config.js')))
    .on('error', handleError)
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', [ 'scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'index.html'
  ]).on('change', reload);

  gulp.watch('src/**/*.js', ['scripts']);
});

function handleError (error) {
  console.log(error.toString())

  this.emit('end')
}
