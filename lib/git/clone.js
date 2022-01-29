import { spawn } from 'node:child_process';

export default function (repo, targetPath, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = null;
  }

  opts = opts || {};

  let git = opts.git || 'git';
  let args = ['clone'];

  if (opts.shallow) {
    args.push('--depth');
    args.push('1');
  }

  args.push('--');
  args.push(repo);
  args.push(targetPath);

  let process = spawn(git, args);
  process.on('close', function (status) {
    if (status == 0) {
      if (opts.checkout) {
        _checkout();
      } else {
        cb && cb();
      }
    } else {
      cb && cb(new Error(`'git clone' failed with status ${status}`));
    }
  });

  function _checkout() {
    let args = ['checkout', opts.checkout];
    let process = spawn(git, args, { cwd: targetPath });
    process.on('close', function (status) {
      if (status == 0) {
        cb && cb();
      } else {
        cb && cb(new Error(`'git checkout' failed with status ${status}`));
      }
    });
  }
}
