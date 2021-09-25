const fs = require('fs');
const { join } = require('path');
const vm = require('vm');

const str = fs.readFileSync(join(__dirname, 'src', 'routes.ts')).toString();

const pattern = /export\s+const\s+routes\s+=\s+(\[[\s\S]*?\])/;
const config = str.match(pattern)[1];

const input = config.replace(/component: \S+/g, '_:0').replace(/Strings\.getLang\(\S+?\)/g, "''");

const routes = vm.runInContext(input, vm.createContext({}));

const getComponent = path => join(__dirname, 'src', 'pages', path);

const defaultRoute = {
  exact: true,
  path: '/',
  component: getComponent('index.tsx'),
};

module.exports = [
  {
    exact: false,
    path: '/',
    component: join(__dirname, 'src', 'layouts', 'index.tsx'),
    routes: [
      defaultRoute,
      ...routes.map(route => ({
        exact: true,
        path: route.href,
        component: getComponent(join(route.href, 'index.tsx')),
      })),
    ],
  },
];
