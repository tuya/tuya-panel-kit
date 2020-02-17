const path = require('path');
const blacklist = require('metro-bundler/src/blacklist'); // eslint-disable-line
const pak = require('../package.json');

const dependencies = Object.keys(pak.dependencies || {});
const peerDependencies = Object.keys(pak.peerDependencies || {});

module.exports = {
  getProjectRoots() {
    return [__dirname, path.resolve(__dirname, '..')];
  },
  getProvidesModuleNodeModules() {
    return [
      ...dependencies,
      ...peerDependencies,
      'xmlbuilder',
      'simple-plist',
      'hoist-non-react-statics',
    ];
  },
  getBlacklistRE() {
    return blacklist([
      new RegExp(`^${escape(path.resolve(__dirname, '..', 'node_modules'))}\\/.*$`),
    ]);
  },
};
