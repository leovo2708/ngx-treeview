const path = require('path');
const gulp = require('gulp');
const through = require('through2');
const sass = require('node-sass');
const fs = require('fs');

const paths = {
    src: 'src/lib',
    dist: 'dist/lib'
}

gulp.task('inline', function () {
    const globs = [
        path.join(paths.dist, '**', '*.js'),
    ];
    gulp.src(globs).pipe(through.obj((file, encode, callback) => {
        const filePath = file.path;

        function resolveUrl(url) {
            return path.join(paths.src, url);
        }

        function inlineTemplate(content) {
            return content.replace(/templateUrl:\s*'([^']+?\.html)'/g, (matchers, templateUrl) => {
                const templateFile = resolveUrl(templateUrl);
                const templateContent = fs.readFileSync(templateFile, encode);
                const shortenedTemplate = templateContent
                    .replace(/([\n\r]\s*)+/gm, ' ');
                return `template: '${shortenedTemplate}'`;
            });
        }

        function inlineStyles(content) {
            return content.replace(/styleUrls:\s*(\[[\s\S]*?\])/gm, (matchers, styleUrls) => {
                const urls = eval(styleUrls);
                return 'styles: ['
                    + urls.map(styleUrl => {
                        const styleFile = resolveUrl(styleUrl);
                        let styleContent = fs.readFileSync(styleFile, encode);
                        if (/\.(scss)$/i.test(styleUrl)) {
                            styleContent = compileSass(styleContent, styleFile);
                        }
                        const shortenedStyle = styleContent
                            .replace(/([\n\r]\s*)+/gm, ' ');
                        return `'${shortenedStyle}'`;
                    }).join(',\n') + ']';
            });
        }

        function compileSass(content, file) {
            const result = sass.renderSync({
                data: content,
                file: file,
                outputStyle: 'compact'
            });
            return result.css.toString();
        }

        function removeModuleId(content) {
            return content.replace(/\s*moduleId:\s*module\.id\s*,?\s*/gm, '');
        }

        function inline(content) {
            return [
                inlineTemplate,
                inlineStyles,
                removeModuleId
            ].reduce((content, fn) => fn(content), content);
        }

        if (/\.(component.js)$/i.test(filePath)) {
            let fileContent = file.contents.toString();
            fileContent = inline(fileContent);
            file.contents = new Buffer(fileContent);
        }

        return callback(null, file);
    })).pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['inline']);