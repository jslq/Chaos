const path = require('path')
const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const version = process.env.VERSION || require('../package.json').version

const resolve = _path => path.resolve(__dirname, '../', _path)

const configs = {
	umdDev: {
		input: resolve('lib/index.js'),
		file: resolve('dist/chaos.js'),
		format: 'umd',
		env: 'development'
	},
	umdProd: {
		input: resolve('lib/index.js'),
		file: resolve('dist/chaos.min.js'),
		format: 'umd',
		env: 'production'
	},
	esm: {
		input: resolve('lib/index.js'),
		file: resolve('dist/chaos.esm.js'),
		format: 'es'
	}
}

function genConfig(opts) {
	const config = {
		input: {
			input: opts.input,
			plugins: [
				commonjs(),
				replace({
					__VERSION__: version
				}),
				buble(),
			]
		},
		output: {
			file: opts.file,
			format: opts.format,
			exports: 'named',
			name: 'Chaos'
		}
	}

	if (opts.env) {
		config.input.plugins.unshift(replace({
			'process.env.NODE_ENV': JSON.stringify(opts.env)
		}))
	}

	return config
}

function mapValues(obj, fn) {
	const res = {}
	Object.keys(obj).forEach(key => {
		res[key] = fn(obj[key], key)
	})
	return res
}

module.exports = mapValues(configs, genConfig)
