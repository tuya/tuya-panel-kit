const fs = require('fs');
const { join } = require('path');
const vm = require('vm');

const str = fs.readFileSync(join(__dirname, 'src', 'routes.ts')).toString();

const pattern = /export\s+const\s+routes\s+=\s+(\[[\s\S]*?\])/;
const config = str.match(pattern)[1];

const input = config.replace(/component: \S+/g, '_:0').replace(/Strings\.getLang\(\S+?\)/g, "''");

const routes = vm.runInContext(input, vm.createContext({}));

module.exports = routes.map(route => ({
  path: route.href,
  component: join(__dirname, 'src', 'pages', route.href, 'index.tsx'),
}));
