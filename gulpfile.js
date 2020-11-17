const {
    src,
    dest,
    series
} = require('gulp');

function copy() {
    return src('content/themes/bloginn/**')
        .pipe(dest('../ghost-themes/bloginn/'));
}

exports.default = series(copy);
