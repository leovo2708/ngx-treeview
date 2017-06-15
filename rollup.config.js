export default {
    entry: 'dist/lib/src/index.js',
    dest: 'dist/lib/bundles/ngx-treeview.umd.js',
    sourceMap: true,
    format: 'umd',
    onwarn: function (warning) {
        // Skip certain warnings

        // should intercept ... but doesn't in some rollup versions
        if (warning.code === 'THIS_IS_UNDEFINED') { return; }

        // console.warn everything else
        console.warn(warning.message);
    },
    moduleName: 'ngx-treeview',
    external: [
        '@angular/common',
        '@angular/core',
        '@angular/forms',
        'lodash'
    ],
    globals: {
        '@angular/common': 'ng.common',
        '@angular/core': 'ng.core',
        '@angular/forms': 'ng.forms',
        'lodash': 'lodash'
    }
}