/**
 * @module
 * @license
 * Copyright 2020, Senti Techlabs Inc..
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/

const isInvalidPath = require('is-invalid-path');
const { resolve, extname } = require('path');
const { existsSync, lstatSync } = require('fs');

/**
 * @param {NodePlopAPI} plop
 * @returns {Array<*>}
 */
module.exports = (plop) => [
  {
    type: 'directory',
    name: 'destinationpath',
    message: 'Put the relative path of the file',
    basePath: plop.getPlopfilePath(),
    /**
     * @ignore
     * @param {string} value
     * @return {string | boolean}
     */
    validate: value => {
      if ((/.+/).test(value) && !isInvalidPath(value)) { return true; }
      return 'Path is required';
    }
  },
  {
    type: 'input',
    name: 'filename',
    message: 'Put the filename with the file extension',
    /**
     * @ignore
     * @param {string} value
     * @return {string | boolean}
     */
    validate: value => {
      if ((/.+/).test(value)) { return true; }
      return 'Filename is required';
    },
    when: /** @param {*} answers */(answers) => {
      const path = resolve(
        plop.getPlopfilePath(),
        answers.destinationpath
      );

      if (extname(path)) {
        try {
          if (existsSync(path) && lstatSync(path).isDirectory()) {
            return true;
          }
        } catch (error) {
          return false;
        }
      }

      return false;
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'What is the file about? (description)'
  }
];
