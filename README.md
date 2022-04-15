# Balm CLI [![NPM version][balm-cli-image]][balm-cli-url]

A simple CLI for scaffolding [BalmJS](https://github.com/balmjs/balm) projects.

## Requirements

1. [Node.js](https://nodejs.org/) >= 12.20, npm version 5.2.0+
2. [Git](https://git-scm.com/)
3. [BalmJS](https://balm.js.org/) `balm-core` >= 3

First install the `balm-core` globally.

```sh
yarn global add balm-core
# OR
npm install -g balm-core
```

## Installation

Then install the `balm-cli` globally.

```sh
yarn global add balm-cli
# OR
npm install -g balm-cli

# Verify
balm -V
# Output:
# balm-cli: 3.0.0
# balm-core: 3.0.0 (Global)
```

## Usage

```sh
# See all available official templates
balm list
```

```sh
balm init <template-name> <project-name>
```

Example:

```sh
# Official template
balm init vue-ui my-project
```

```sh
# Custom template
balm init username/repo my-project
```

## Official Templates

- Default
  - [simple](https://github.com/balmjs/template-simple) - A simple project
- Vue.js
  - [vue](https://github.com/balmjs/template-vue) - A Vue.js project
  - [vue-expert](https://github.com/balmjs/template-vue-expert) - A Vue.js project with router
  - [vue-master](https://github.com/balmjs/template-vue-master) - A Vue.js project with router & store
  - [vue-ui](https://github.com/balmjs/template-vue-ui) - A Vue.js project with router & BalmUI (Recommended)
  - [vue-ssr](https://github.com/balmjs/template-vue-ssr) - A server-rendered Vue.js project (Experimental)
  - [vue-ssr-without-vuex](https://github.com/balmjs/template-vue-ssr-without-vuex) - A server-rendered Vue.js project without Vuex (Experimental)
  - [vue-wechat-mp](https://github.com/balmjs/template-vue-wechat-mp) - 使用 Vue 同构微信小程序和 Web
- React
  - [react](https://github.com/balmjs/template-react) - A React project
  - [react-expert](https://github.com/balmjs/template-react-expert) - A React project with router
  - [react-master](https://github.com/balmjs/template-react-master) - A React project with router & store
- Angular
  - [ng](https://github.com/balmjs/template-ng) - An Angular project
- Desktop apps
  - [electron](https://github.com/balmjs/template-electron) - An Electron project
  - [tauri](https://github.com/balmjs/template-tauri) - A Tauri project (Coming soon)
- Others
  - [pwa](https://github.com/balmjs/template-pwa) - Progressive Web Apps project
  - [legacy](https://github.com/balmjs/template-legacy) - A jQuery project for older browsers
  - [svelte](https://github.com/balmjs/template-svelte) - A Svelte project
  - [solid](https://github.com/balmjs/template-solid) - A Solid project

[balm-cli-image]: https://img.shields.io/npm/v/balm-cli
[balm-cli-url]: https://www.npmjs.com/package/balm-cli
