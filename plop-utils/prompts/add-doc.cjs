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

/**
 * @param {NodePlopAPI} plop
 * @returns {Array<*>}
 */
module.exports = (plop) => [
  {
    type: 'directory',
    name: 'destinationpath',
    message: 'Put the relative path of the folder (e.g. path/to/the/folder)',
    basePath: plop.getPlopfilePath() + '/docs',
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
    name: 'name',
    message: 'Put the title of the documentation',
    /**
     * @ignore
     * @param {string} value
     * @return {string | boolean}
     */
    validate: value => {
      if ((/.+/).test(value)) { return true; }
      return 'Title is required';
    }
  },
  {
    type: 'confirm',
    name: 'isIndex',
    message: 'Is this going to be an index for this folder?'
  },
  {
    type: 'input',
    name: 'weight',
    default: 0,
    message: 'What would be the order of this page related to others? (will be multiplied to 10 after)',
    /**
     * @param {number} value
     * @return {string | boolean}
     * @ignore
     */
    validate: value => {
      if (isNaN(value)) {
        return 'Please put a number (integer)';
      }
      return true;
    },
    /**
     * @param {string} value
     * @return {number}
     * @ignore
     */
    filter: value => parseInt(value) * 10
  }
];
