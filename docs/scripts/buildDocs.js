/* eslint-disable */

var fs = require('fs');
var generateMarkdown = require('./generateMarkdown');
var path = require('path');
var reactDocs = require('react-docgen');
var glob = require('glob');
var externalProptypesHandler = require('react-docgen-external-proptypes-handler');

function buildDocs(api) {
  // api is an object keyed by filepath. We use the file name as component name.
  for (var filepath in api) {
    var name = getComponentName(filepath);
    var markdown = generateMarkdown(name, api[filepath]);
    fs.writeFileSync('../dist/' + name + '.gen.md', markdown);
    process.stdout.write(filepath + ' -> ' + name + '.md\n');
  }
}

function getComponentName(filepath) {
  const f = filepath.split(path.sep);
  const name = f[f.length - 2];
  return name;
}

// ================================================================================================
var api = {};
glob.sync('../../src/components/*/index.js', {
  ignore: ['../../src/components/utils/index.js']
}).forEach(p => {
  try {
    const handlers = reactDocs.defaultHandlers.concat(externalProptypesHandler(path))
    var j = fs.readFileSync(p);
    var componentInfo = reactDocs.parse(j, null, handlers);

    api[p]=componentInfo;
  } catch (e) {
    console.log(e);
  }
})
buildDocs(api);
