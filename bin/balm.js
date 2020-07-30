#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const balmModuleBin = path.join(process.cwd(), 'node_modules', 'balm', 'bin');
const balmCliBin = fs.existsSync(balmModuleBin)
  ? `${balmModuleBin}/balm.js`
  : './balm-global.js';

require(balmCliBin);
