#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { chalk } = require('../lib/utils');

const balmEnvFile = path.join(process.cwd(), 'balm.env.js');

if (fs.existsSync(balmEnvFile)) {
  require(balmEnvFile);
}

const balmCwd = process.env.BALM || process.cwd();
const balmModule = path.join(balmCwd, 'node_modules', 'balm', 'bin', 'balm.js');

if (fs.existsSync(balmModule)) {
  require(balmModule);
} else {
  console.warn(
    chalk.bgBlueBright('BalmJS'),
    chalk.yellow('`balm` module not found :(')
  );
}
