const { execSync } = require('child_process');

module.exports = () => {
  let name;
  let email;

  try {
    name = execSync('git config --get user.name');
    email = execSync('git config --get user.email');
  } catch (e) {
    // console.error(e);
  }

  name = name && JSON.stringify(name.toString().trim()).slice(1, -1);
  email = email && ' <' + email.toString().trim() + '>';
  return (name || '') + (email || '');
};
