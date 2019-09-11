# React Server Side Rendering

This project is Razzle boilerplate for React Server Side Rendering.

## Getting Started

To start using this project :

1. `git clone https://github.com/finmavis/razzle-boilerplate.git`
2. Navigate to folder you just clone
3. Install all Dependencies, `yarn` or `npm install`
4. Then for development just run the script `yarn start` or `npm run start`
5. To build production just run the script `yarn build` or `npm run build`, it will generate folder build.
6. To serve Production just run the script :
   - `yarn start:prod`
   - For windows platform `yarn start:prod:windows`

## Features

- Server Side Rendering (thanks to [Razzle](https://github.com/jaredpalmer/razzle))
- SEO Friendly (Thanks to [React Helmet](https://github.com/nfl/react-helmet))
- Code Splitting (Thanks to [@loadable/component](https://github.com/smooth-code/loadable-components))
- Remove unused CSS on `Post Build` Production (Thanks to [PurgeCSS](https://www.purgecss.com/))
- Static type checking using [Eslint](https://www.npmjs.com/package/eslint-config-react-app) and [Prettier](https://prettier.io/)
- Pre-commit hooks using [Husky](https://github.com/typicode/husky) and [Lint Staged](https://github.com/okonet/lint-staged)
- Compression using Brotli and fallback to Gzip
- Remove `source maps` on Production

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode. By default, runs tests related to files changed since the last commit.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run start:prod` or `yarn start:prod`

Runs the compiled app in production.

You can again view your application at http://localhost:3000

### `npm run start:prod:windows` or `yarn start:prod:windows`

Runs the compiled app in production on `windows Platform`

You can again view your application at http://localhost:3000

### `npm run lint` or `yarn lint`

To check javascript linting rules.

### `npm run lint:fix` or `yarn lint:fix`

To check javascript linting rules and automatic fix if possible.

### `npm run prettier` or `yarn prettier`

To check codebase using `Prettier` rules.

### `npm run prettier:fix` or `yarn prettier:fix`

To format or prettier codebase using `Prettier`

### `npm run validate` or `yarn validate`

To check `Javascript Linting` and `Prettier` rules on `Codebase`

### `npm run optimize:css` or `yarn optimize:css`

Optimize CSS Assets by removing unused CSS using [PurgeCSS](https://www.purgecss.com/)

## Other Resources

- [Razzle](https://github.com/jaredpalmer/razzle)
- [React Helmet](https://github.com/nfl/react-helmet)
- [@loadable/component](https://github.com/smooth-code/loadable-components)
- [PurgeCSS](https://www.purgecss.com/)
- [Eslint](https://www.npmjs.com/package/eslint-config-react-app)
- [Prettier](https://prettier.io/)
- [Husky](https://github.com/typicode/husky)
- [Lint Staged](https://github.com/okonet/lint-staged)
