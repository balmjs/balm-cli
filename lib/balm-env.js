const path = require('path');
const fs = require('fs');

const balmEnvFile = path.join(process.cwd(), 'balm.env.js');

if (fs.existsSync(balmEnvFile)) {
  require(balmEnvFile);
}

const balmCwd = process.env.BALM || process.cwd();
const balmModuleBin = path.join(balmCwd, 'node_modules', 'balm', 'bin');

module.exports = balmModuleBin;
