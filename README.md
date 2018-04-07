# Balm CLI [![NPM version][balm-cli-image]][balm-cli-url]

A simple CLI for scaffolding [BalmJS](https://github.com/balmjs/balm) projects.

## Installation

### Requirements

1. [Node.js](https://nodejs.org/en/) (>=6.x, LTS preferred), npm version 3+
2. [Git](https://git-scm.com/)
3. BalmJS workflow using [gulp](https://gulpjs.com/) for the build process, so you need run `npm install --global gulp-cli` if it is not already on your machine.

### Installing **`balm-cli`**

```sh
$ npm install --global balm-cli

# Verify
$ balm -V
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
```

## Official Templates

* [simple](https://github.com/balmjs/template-simple) - A simple project
* [vue](https://github.com/balmjs/template-vue) - A Vue.js project
* [vue-expert](https://github.com/balmjs/template-vue-expert) - A Vue.js project with router
* [vue-master](https://github.com/balmjs/template-vue-master) - A Vue.js project with router & Vuex
* [react](https://github.com/balmjs/template-react) - A React project
* [react-expert](https://github.com/balmjs/template-react-expert) - A React project with router
* [react-master](https://github.com/balmjs/template-react-master) - A React project with router & MobX
* [ng](https://github.com/balmjs/template-ng) - An Angular project
* [pwa](https://github.com/balmjs/template-pwa) - Progressive Web Apps project
* [electron](https://github.com/balmjs/template-electron) - An Electron app boilerplate based on the BalmJS

[balm-cli-image]: https://badge.fury.io/js/balm-cli.svg
[balm-cli-url]: https://npmjs.org/package/balm-cli
