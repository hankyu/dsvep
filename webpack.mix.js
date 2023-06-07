let mix = require('laravel-mix')

require('laravel-mix-polyfill')

mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': __dirname + '/resources'
        }
    },
    output: {
        chunkFilename: 'js/[name].[chunkhash].js'
        // chunkFilename: 'js/[name].js'
    }
})

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .polyfill({
        enabled: true,
        useBuiltIns: 'usage',
        // targets: { firefox: '50', ie: 11 },
        corejs: 3
    })
