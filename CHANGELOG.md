# BalmCLI ChangeLog

:tada: [`BalmJS 3.0`](https://balm.js.org/) released

## 4.5.0 (2024.02.04)

- update deps
  - `commander`: 11.x -> 12.x
  - `ora`: 7.x -> 8.x

## 4.4.0 (2023.12.22)

### Chore

- update deps
  - `global-dirs`: 3.x -> 4.x
  - `multimatch`: 6.x -> 7.x
  - `ora`: 6.x -> 7.x

### BREAKING CHANGES

- minimum supported Node.js version is `18`

## 4.3.0 (2023.06.19)

### Chore

- update deps
  - `commander`: 10.x -> 11.x
  - `consolidate`: 0.x -> 1.x
  - `rimraf`: 4.x -> 5.x

### BREAKING CHANGES

- minimum supported Node.js version is `16`

## 4.2.0 (2023.03.31)

### Features

- Windows compatible

## 4.1.0 (2023.03.16)

### Features

- update vite template repository

## 4.0.0 (2023.01.30)

### Chore

- update deps
  - `commander`: 9.x -> 10.x
  - `rimraf`: 3.x -> 4.x
  - `validate-npm-package-name`: 4.x -> 5.x

### BREAKING CHANGES

- Require Node.js ^14.17.0 || ^16.13.0 || >=18.0.0

## 3.3.1 (2022.09.22)

### Bug Fixes

- fix getMetadata bug

## 3.3.0 (2022.09.20)

### Chore

- update deps
  - `inquirer`: 8.x -> 9.x

## 3.2.2 (2022.09.20)

### Chore

- update deps

## 3.1.0 (2022.04.15)

### Chore

- update deps
  - `validate-npm-package-name`: 3.x -> 4.x
  - remove `request` and use `node-fetch` instead

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
