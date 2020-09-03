#!/usr/bin/env node

const fs = require('fs');
const balmModuleBin = require('../lib/balm-env');

const balmCliBin = fs.existsSync(balmModuleBin)
  ? `${balmModuleBin}/balm.js`
  : './balm-global.js';

require(balmCliBin);
