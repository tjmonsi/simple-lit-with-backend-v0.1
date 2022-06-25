// @ts-nocheck
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

const { paramCase } = require('change-case');

/**
 * @function
 * @description This creates a path for the documentation that will
 * be added depending if it is a pageIndex or it is in root
 * @this AddDocumentPagePrompt
 * @return {String}
 */
function docPathCreator () {
  const { isIndex, name } = this;
  return `${paramCase(name)}${isIndex ? '/_index.md' : '.md'}`;
}

module.exports = docPathCreator;
