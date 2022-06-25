import jsdoc2md from 'jsdoc-to-markdown';
import { writeFileSync, mkdirSync, rmdirSync } from 'fs';

const templateData = jsdoc2md.getTemplateDataSync({
  files: [
    `${process.cwd()}/src/*.js`,
    `${process.cwd()}/src/**/*.js`
  ]
});

/** @type {Array<string>} */
const fileNames = templateData
  .reduce(/** @param {*} fileNames, @param {*} id */(fileNames, id) => {
    if (id.kind === 'module') {
      fileNames.push(id.name);
    }
    return fileNames;
  }, []);

// console.log(fileNames);

rmdirSync('docs/source', { recursive: true });
mkdirSync('docs/source', { recursive: true });
writeFileSync('docs/source/_index.md', `---
  title: "Source"
  draft: false
  TableOfContents: true
  weight: 10000
---
`);

for (const fileName of fileNames) {
  let title = fileName;

  if (fileName === 'index') {
    title = 'Source';
  }

  if (title.indexOf('index') >= 0) {
    const array = fileName.split('/');
    array.pop();
    title = array.join('/');
    // console.log(title);
  }
  const template = `---
  title: "${title}"
  draft: false
  TableOfContents: true
  weight: 10000
---
{{#module name="${fileName}"}}{{>docs}}{{/module}}`;
  const output = jsdoc2md.renderSync({ data: templateData, template: template });

  const folderArray = fileName.split('/');
  folderArray.pop();

  if (folderArray.length) {
    const folder = folderArray.join('/');
    mkdirSync(`docs/source/${folder}`, { recursive: true });
  }

  const newFileName = fileName.indexOf('index') >= 0
    ? fileName.replace('index', '_index')
    : fileName;

  const newOutput = output.replace(new RegExp(`# ${fileName}.`, 'g'), '# ');

  writeFileSync(`docs/source/${newFileName}.md`, newOutput);
}
