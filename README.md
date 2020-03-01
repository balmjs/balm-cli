# Balm CLI [![NPM version][balm-cli-image]][balm-cli-url]

A simple CLI for scaffolding [BalmJS](https://github.com/balmjs/balm) projects.

## Installation

### Requirements

1. [Node.js](https://nodejs.org/en/) (>=8.x, 10.x preferred), npm version 5+
2. [Git](https://git-scm.com/)
3. BalmJS workflow using [gulp](https://gulpjs.com/) for the build process, so you need install `gulp-cli` globally.

```sh
yarn global add gulp-cli
# OR
npm install -g gulp-cli

# Verify
$ gulp -v
# Output:
# CLI version: 2.2.0
```

### Installing **`balm-cli`**

Then install the `balm-cli` globally.

```sh
yarn global add balm-cli
# OR
npm install -g balm-cli

# Verify
$ balm -V
# Output:
# 1.3.0
```

### Usage

```sh
# See all available official templates
$ balm list
```

```sh
$ balm init <template-name> <project-name>
```

Example:

```sh
$ balm init vue my-project

# Custom templates
$ balm init username/repo my-project
```

## Official Templates

- Default
  - [simple](https://github.com/balmjs/template-simple) - A simple project
- Vue.js
  - [vue](https://github.com/balmjs/template-vue) - A Vue.js project
  - [vue-expert](https://github.com/balmjs/template-vue-expert) - A Vue.js project with router (Recommended)
  - [vue-master](https://github.com/balmjs/template-vue-master) - A Vue.js project with router & Vuex
  - [vue-ssr](https://github.com/balmjs/template-vue-ssr) - A server-rendered Vue.js project (Experimental)
  - [vue-ssr-without-vuex](https://github.com/balmjs/template-vue-ssr-without-vuex) - A server-rendered Vue.js project without Vuex (Experimental)
  - [vue-wechat-mp](https://github.com/balmjs/template-vue-wechat-mp) - A Vue.js project for WeChat Mini Program (Experimental)
- React
  - [react](https://github.com/balmjs/template-react) - A React project
  - [react-expert](https://github.com/balmjs/template-react-expert) - A React project with router
  - [react-master](https://github.com/balmjs/template-react-master) - A React project with router & MobX
- Angular
  - [ng](https://github.com/balmjs/template-ng) - An Angular project
- Others
  - [pwa](https://github.com/balmjs/template-pwa) - Progressive Web Apps project
  - [electron](https://github.com/balmjs/template-electron) - An Electron app boilerplate based on the BalmJS
  - [legacy](https://github.com/balmjs/template-legacy) - A jQuery project for older browsers

[balm-cli-image]: https://badge.fury.io/js/balm-cli.svg
[balm-cli-url]: https://npmjs.org/package/balm-cli
