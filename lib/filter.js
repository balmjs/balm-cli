import { minimatch } from 'minimatch';
import { evaluate } from './utils/index.js';

export default function (files, filters, data, done) {
  if (!filters) {
    return done();
  }
  const fileNames = Object.keys(files);
  Object.keys(filters).forEach((glob) => {
    fileNames.forEach((file) => {
      if (minimatch(file, glob, { dot: true })) {
        const condition = filters[glob];
        if (!evaluate(condition, data)) {
          delete files[file];
        }
      }
    });
  });
  done();
}
