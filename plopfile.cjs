// @ts-nocheck
const inquirerPrompt = /** @type {*} */(require('inquirer-directory'));

/**
 * @param {NodePlopAPI} plop
 */
module.exports = plop => {
  // general helpers
  plop.setHelper('capitalCase', require('change-case').capitalCase);
  plop.setHelper('docPathCreator', require('./plop-utils/functions/doc-path-creator.cjs'));
  plop.setHelper('dateToday', require('./plop-utils/functions/date-today.cjs'));
  plop.setHelper('addLicenseSnippet', require('./plop-utils/functions/add-license-snippet.cjs'));
  plop.setHelper('absolutePath', require('./plop-utils/functions/absolute-path.cjs').bind(this, plop));
  plop.setHelper('absoluteDocPath', require('./plop-utils/functions/absolute-doc-path.cjs').bind(this, plop));
  plop.setHelper('checkFilename', require('./plop-utils/functions/check-filename.cjs'));

  // add custom inquirer prompt type
  plop.addPrompt('directory', /** @type {PromptModule} */(inquirerPrompt));

  // generator setting
  plop.setGenerator('create:file', {
    description: 'Create a new file',
    prompts: require('./plop-utils/prompts/add-file.cjs')(plop),
    actions: require('./plop-utils/actions/add-file.cjs')()
  });

  plop.setGenerator('create:doc', {
    description: 'Create a new documentation',
    prompts: require('./plop-utils/prompts/add-doc.cjs')(plop),
    actions: require('./plop-utils/actions/add-doc.cjs')()
  });
};
