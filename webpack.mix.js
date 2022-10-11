const mix = require('laravel-mix');

const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

require('laravel-mix-clean');
require('mix-html-builder');
require('laravel-mix-imagemin');

mix.setPublicPath('dist');
mix.disableNotifications();

mix.html({
	htmlRoot: './src/index.html',
	output: '',
	minify: { removeComments: true },
});

mix.sass('./src/scss/main.scss', 'css').options({
	processCssUrls: false,
});

mix.js(['./src/js/main.js', './src/js/data.js'], 'js');

mix.copy('./src/fonts/*.woff2', 'dist/fonts');

// Такой способ не работает, вот ссылка на ошибку https://stackoverflow.com/questions/63608065/npm-run-watch-error-in-cannot-read-property-of-map-undefined
// mix.imagemin({
// 	patterns: [{ from: './src/images', to: 'dist/images' }],
// });

mix.webpackConfig({
	stats: { children: true },
	plugins: [
		new CopyPlugin({
			patterns: [{ from: './src/images', to: 'images' }],
		}),
		new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
	],
});

mix.browserSync({
	server: { baseDir: 'dist' },
	files: ['dist/*'],
	notify: false,
	open: false,
});

mix.clean();
