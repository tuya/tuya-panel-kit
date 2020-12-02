const path = require('path');
const blacklist = require('metro-bundler/src/blacklist'); // eslint-disable-line

const pak = require('./package.json');

const dependencies = Object.keys(pak.dependencies || {});
const peerDependencies = Object.keys(pak.peerDependencies || {});

module.exports = {
  getProjectRoots() {
    return [__dirname];
  },
  getProvidesModuleNodeModules() {
    return [...dependencies, ...peerDependencies];
  },
  getBlacklistRE() {
    return blacklist([
      new RegExp(
        `^${escape(path.resolve(__dirname, '..', '..', '..', 'node_modules'))}\\/.*$`
      ),
      new RegExp(
        `^${escape(path.resolve(__dirname, '..', '..', '..', 'example', 'node_modules'))}\\/.*$`
      ),
      new RegExp(
        `^${escape(path.resolve(__dirname, '..', '..', '..', 'template'))}\\/.*$`
      ),
      new RegExp(
        `^${escape(path.resolve(__dirname, 'node_modules', 'tuya-panel-kit'))}\\/.*\\/node_modules.*$`
      ),
    ]);
  },
};
