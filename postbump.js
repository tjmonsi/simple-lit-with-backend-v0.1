const reader = require('properties');
const { version } = require('./package.json');
const file = './sonar-project.properties';

/**
 *
 * @param {string} file
 * @param {*} options
 * @returns Promise<*>
 */
const readerPromise = (file, options) =>
  new Promise((resolve, reject) =>
    reader.parse(file, options, (/** @type {any} */ error, /** @type {any} */ obj) =>
      error ? reject(error) : resolve(obj)));

/**
 *
 * @param {string} file
 * @param {*} options
 * @returns Promise<*>
 */
const writerPromise = (file, options) =>
  new Promise((resolve, reject) =>
    reader.stringify(file, options, (/** @type {any} */ error) =>
      error ? reject(error) : resolve()));

const start = async () => {
  console.log('update the version', version);
  const properties = await readerPromise(file, {
    path: true
  });

  console.log(properties);
  properties['sonar.projectVersion'] = version;

  return writerPromise(properties, {
    path: file
  });
};

start().then(() => process.exit(0));
