const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const pkg = require('../package.json');

const modules = [...Object.keys(pkg.peerDependencies), 'react-native', 'react'];

const root = path.resolve(__dirname, '..');

const blacklistRE = blacklist(
  modules.map(m => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`))
);

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
