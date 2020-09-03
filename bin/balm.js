#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const balmCwd = process.env.BALM_CWD || process.cwd();
const balmModuleBin = path.join(balmCwd, 'node_modules', 'balm', 'bin');
const balmCliBin = fs.existsSync(balmModuleBin)
  ? `${balmModuleBin}/balm.js`
  : './balm-global.js';

require(balmCliBin);
