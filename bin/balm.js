#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const balmModuleBin = path.join(__dirname, '..', '..', 'balm', 'bin');
const balmCliBin = fs.existsSync(balmModuleBin)
  ? `${balmModule}/balm-go.js`
  : './balm-global.js';

require(balmCliBin);
