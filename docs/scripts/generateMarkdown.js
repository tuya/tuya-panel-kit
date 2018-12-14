/* eslint-disable */
const parser = require('./docParser');
function generateMarkdown(name, reactAPI) {
  const markdownString =
    `${generateTitle(name)
    }\n${
    generateDesciption(reactAPI.description)
    }\n${
    generateProps(reactAPI.props || {})}`;

  return markdownString;
}

function generateTitle(name) {
  return `### ${name} api`;
}

function generateDesciption(desc) {
  return desc;
}

function genType(type) {
  switch (type.name) {
    case 'custom':
      return `${type.raw}`;
    case 'shape':
      let ret = `
      <table>
        <thead>
          <th>NAME</th>
          <th>TYPE</th>
          <th>REQUIRED</th>
          <th>DESC</th>
        </thead>
        <tbody>
      `;
      ret = Object.keys(type.value).reduce((r, n) => {
        const { name, description = '', required } = type.value[n];
        return `${r}
        <tr>
          <td>${n}</td>
          <td>${name}</td>
          <td>${required}</td>
          <td>${description}</td>
        </tr>
        `
      }, ret);
      return `${ret}
        </tbody>
      </table>`.replace(/\n/g, '').replace(/\ /g, '');

    case 'union':
      return type.value.map(it => '`'+it.name+'`').join(',');

    default:
      return type.name;
  }
}

function xtrim(s) {
  return s.replace(/\n/g, '').replace(/\ /g, '');
}

function generateProps(props) {
  let ret = '';
  Object.keys(props).forEach((k, i) => {
    const { required = false, type = {}, description = '', defaultValue = {} } = props[k];
    const { desc, kvs } = parser(description);

    ret += `
#### ${k}

> since ${kvs.since || '1.0'}

${desc}

| TYPE | REQUIRED | PLATFORM | DEFAULT |
| ---- | --- | --- | ----- |
| ${genType(type)} | ${required} | ${kvs.platform || 'all'} | ${defaultValue.value} |
    `;
  });
  return ret;
}

module.exports = generateMarkdown;
