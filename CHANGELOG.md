# BalmCLI ChangeLog

:tada: [`BalmJS 3.0`](https://balm.js.org/) released

## 3.0.1 (2022.02.11)

### Bug Fixes

- fix `balm-core` version bug

## 3.0.0 (2022.01.29)

### BREAKING CHANGES

- Require Node.js 12.20
- This package is now pure ESM

## 2.5.1 (2021.04.06)

### Bug Fixes

- fix init bug for some registry

## 2.5.0 (2021.02.28)

### Chore

- add `svelte` template
- update deps
  - `commander`: 6.x -> 7.x
  - `global-dirs`: 2.x -> 3.x
  - `inquirer`: 7.x -> 8.x

## 2.4.2 (2020.12.15)

### Bug Fixes

- fix api for list repositories

## 2.4.1 (2020.11.30)

### Bug Fixes

- fix global packages directory for outdated Windows

## 2.4.0 (2020.10.21)

### Chore

- update deps
  - `multimatch`: 4.x -> 5.x

## 2.3.0 (2020.09.29)

### Chore

- update deps
  - `consolidate`: 0.15 -> 0.16

## 2.2.2 (2020.09.07)

### Bug Fixes

- bugfix for detect local `balm-core`

## 2.2.1 (2020.09.04)

### Features

- optimize project running

1. using `balm go` command
2. update `package.json`:

   ```json
   {
     "scripts": {
       "dev": "balm",
       "prod": "balm -p"
     }
   }
   ```

## 2.1.2 (2020.09.04)

### Features

- optimize `balm` command

## 2.0.0 (2020.08.09)

- Requirements: `balm-core` >= 3

```sh
yarn global add balm-core
# OR
npm install -g balm-core
```
