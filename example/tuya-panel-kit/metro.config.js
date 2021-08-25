const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const pkg = require('../../package.json');

const modules = [...Object.keys(pkg.peerDependencies), 'tuya-panel-kit'];

const root = path.resolve(__dirname, '../../');

// block other examples
const fs = require('fs');
const examples = fs.readdirSync(path.join(root, 'example'));
const otherExamples = examples.filter(item => !__dirname.endsWith(item));

const blacklistRE = blacklist([
  ...modules.map(m => new RegExp(`^${path.join(root, 'node_modules', m)}\\/.*$`)),
  /\S*?\.yalc\S*?/,
  ...otherExamples.map(item => new RegExp(`^${path.join(root, 'example', item)}\\/.*$`)),
]);

const extraNodeModules = modules.reduce((acc, name) => {
  acc[name] = path.join(__dirname, 'node_modules', name);
  return acc;
}, {});

module.exports = {
  projectRoot: __dirname,
  watchFolders: [root],
  resolver: {
    blacklistRE,
    extraNodeModules,
  },
};
