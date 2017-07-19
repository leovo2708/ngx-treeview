const gulp = require('gulp');
const sass = require('node-sass');
const inlineTemplates = require('gulp-inline-ng2-template');

/**
 * Inline templates configuration.
 * @see  https://github.com/ludohenin/gulp-inline-ng2-template
 */
const INLINE_TEMPLATES = {
  SRC: './src/lib/**/*.ts',
  DIST: './tmp',
  CONFIG: {
    base: '/src',
    target: 'es6',
    useRelativePaths: true,
    styleProcessor: compileSass
  }
};

/**
 * Inline external HTML and SCSS templates into Angular component files.
 * @see: https://github.com/ludohenin/gulp-inline-ng2-template
 */
gulp.task('inline-templates', () => {
  return gulp.src(INLINE_TEMPLATES.SRC)
    .pipe(inlineTemplates(INLINE_TEMPLATES.CONFIG))
    .pipe(gulp.dest(INLINE_TEMPLATES.DIST));
});

/**
 * Compile SASS to CSS.
 * @see https://github.com/ludohenin/gulp-inline-ng2-template
 * @see https://github.com/sass/node-sass
 */
function compileSass(_path, ext, data, callback) {
  const compiledCss = sass.renderSync({
    data: data,
    outputStyle: 'expanded',
    importer: function (url, prev, done) {
      if (url.startsWith('~')) {
        const newUrl = path.join(__dirname, 'node_modules', url.substr(1));
        return { file: newUrl };
      } else {
        return { file: url };
      }
    }
  });
  callback(null, compiledCss.css);
}