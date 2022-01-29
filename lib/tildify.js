import path from 'node:path';
import os from 'node:os';

const homeDirectory = os.homedir();

export default function (absolutePath) {
  const normalizedPath = path.normalize(absolutePath) + path.sep;

  return (normalizedPath.indexOf(homeDirectory) === 0
    ? normalizedPath.replace(homeDirectory + path.sep, `~${path.sep}`)
    : normalizedPath
  ).slice(0, -1);
}
