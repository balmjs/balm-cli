#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs';
import { chalk } from '../lib/utils/index.js';

const balmEnvFile = path.join(process.cwd(), 'balm.env.js');
const balmCwd = process.env.BALM || process.cwd();
const balmModule = path.join(balmCwd, 'node_modules', 'balm', 'bin', 'balm.js');

const run = async () => {
  if (fs.existsSync(balmEnvFile)) {
    await import(balmEnvFile);
  }

  if (fs.existsSync(balmModule)) {
    await import(balmModule);
  } else {
    console.warn(
      chalk.bgBlueBright('BalmJS'),
      chalk.yellow('`balm` module not found :(')
    );
  }
};

run();
