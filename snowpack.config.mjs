import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

const production = process.env.NODE_ENV === 'production';

const babelOptions = () => {
    return {
        plugins: production ? ['transform-remove-console'] : [],
    }
}

export default {
    mount: {
      public: {url: '/', static: true},
      src: {url: '/dist'},
    },
    plugins: [
        ['@snowpack/plugin-svelte', {
            preprocess: sveltePreprocess({
				// scss로 style된 모든 곳에 main.scss를 적용시키기
				scss: {
					prependData: '@import "./src/scss/main.scss";'
				},
				// 후처리
				postcss: {
					plugins: [
						autoprefixer()
					]
				},
                // svelte파일에서 콘솔 제거 등록
                babel: babelOptions(),
			})
        }],
        ['@snowpack/plugin-babel', {
            transformOptions: babelOptions(),
        }],
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-sass',
        '@snowpack/plugin-optimize',
    ],
    // 앨리어스 설정
    alias: {
        '~': './src'
    },
    routes: [
      /* Example: Enable an SPA Fallback in development: */
      // {"match": "routes", "src": ".*", "dest": "/index.html"},
    ],
    optimize: {
      /* Example: Bundle your final build: */
      // "bundle": true,
    },
    packageOptions: {
      /* ... */
    },
    devOptions: {
      /* ... */
    },
    buildOptions: {
      /* ... */
    },
  };
  