# SpacexLaunches

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

An app that lists SpaceX launch missions through out the years 2006 to 2020. Built using Angular

## Demo

- Check out the hosted app [here](https://app-spacex-launches.herokuapp.com)

- Screenshots:
![Phone View](https://user-images.githubusercontent.com/61248036/95018496-c32b3700-067d-11eb-9646-e8339898b0ef.PNG)

![TabletView](https://user-images.githubusercontent.com/61248036/95018497-c4f4fa80-067d-11eb-93d1-e396244cb10c.PNG)

![DesktopView1440px](https://user-images.githubusercontent.com/61248036/95018498-c58d9100-067d-11eb-957f-f982e54bec48.PNG)

## Tech Stack

- Angular 9
- Node
- Npm

## Dependencies

- [@nguniversal/express-engine](https://www.npmjs.com/package/@nguniversal/express-engine)
- [auto-changelog](https://www.npmjs.com/package/auto-changelog)
- [camel-case-recursive](https://www.npmjs.com/package/camelcase-keys-recursive)
- [npm-run-all](https://www.npmjs.com/package/npm-run-all)
- [express](https://www.npmjs.com/package/express)
- [prettier](https://www.npmjs.com/package/prettier)
- [tslint](https://www.npmjs.com/package/tslint)
- [husky](https://www.npmjs.com/package/husky)
- [pretty-quick](https://www.npmjs.com/package/pretty-quick)
- [lint-staged](https://www.npmjs.com/package/lint-staged)

## Description

### Client

- Created an angular app using `angular cli` version 9.
- Used DRY principles to efficiently modularize the code.
- Added `tslint` configurations to set up standards and other static code quality checks.
- Added `prettier` configurations to indent all files making it more readable and developer friendly.
- Used angular `lazy-loading` to boost performance and reduce resource consumption.
- Followed the below standard for application folder structure
  ```
  |--src
    |--app
      |--core
        |--services
        |--utils
      |--shared
        |--components
        |--mocks
      |--module1
        |--components
        |--models
        |--constants
        |--services
        |--pages
  ```
- Used `rxjs` extensively to minimize LOC, advocate clean coding practices, and asynchronous non-blocking operations.
- Implemented unit and functional tests for major components and services and increased overall test coverage to around 75%.
- Used husky to install pre-commit hooks for linting and formatting files.
- Added [Server Side Rendering](https://angular.io/guide/universal) using `@nguniversal`.
- Added `TransferHttpCacheModule` to overcome the issue of page flickering in SSR hosted angular apps. [Reference](https://stackoverflow.com/questions/57220189/angular-page-loads-twice-after-server-side-rendering), [Solution](https://github.com/angular/universal/blob/master/docs/transfer-http.md)
- Added polyfills, updated tsconfig module key from `es2015` to `es5` to support IE-11. (However, It comes with a catch - `es5` disables differential loading and hence the angular build bundle size increases. Also, IE-11 is a legacy browser that does not completely support css grid and flex-box features).
- Added format and lint checks to build pipeline.
- Added `autochangelog` to auto generating changelog.
- Handled website layout in all devices ranging from mobile, tablet and desktop, thereby enhancing responsiveness.

## Server

- Serving data from API [here](https://api.spaceXdata.com/v3/launches?limit=100)

## Lighthouse Performance

![LigthHouse-62](https://user-images.githubusercontent.com/61248036/95018499-c6262780-067d-11eb-817f-28e85dd2a414.PNG)

## Development server

Run `npm run dev:ssr` for a dev server using SSR. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build:ssr` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Linting Staged Files

Run `npm run lint` to lint staged files. Run `npm run lint:check` for lint errors in any file.

## Prettify Files

Run `npm run format:fix:staged` to format staged files, and `npm run format:fix:all` to force format all files. Run `npm run format:check` to check formatting issues in files.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
