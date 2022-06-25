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

const pkg = require('../../package.json');
// @ts-ignore
const sentenceSplitter = require('./sentence-splitter.cjs');
const { extname } = require('path');

/**
 * @function
 * @description creates a license snippet for Hash comment type of files
 * @returns {string} the license snippet
 */
const hashLicense = () => `# Copyright 2020, ${pkg.author}.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# =========================================================================`;

/**
 * @function
 * @description creates a license snippet for Comment block type of files
 * @returns {string} the license snippet
 */
const commentLicenseBlock = () => `/**
 * Copyright 2020, ${pkg.author}.
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
**/`;

/**
 * @function
 * @description creates a license snippet for JS files
 * @param {string} description
 * @returns {string} the license snippet
 */
const jsCommentLicense = (description) => `/**
 * @module
 * @description ${sentenceSplitter(description, 50).map(item => item.trim()).join('\n * ')}
 *
 * @license
 * Copyright 2020, ${pkg.author}.
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
**/`;

/**
 * @function
 * @description creates a license snippet for Triple slash type of files
 * @returns {string} the license snippet
 */
const tripleSlashLicense = () => `///
/// @license
/// Copyright 2020, ${pkg.author}.
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///    http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///`;

/**
 * @function
 * @description creates a license snippet for Python type of files
 * @returns {string} the license snippet
 */
const pythonLicense = () => `#!/usr/bin/env python
#
${hashLicense()}`;

/**
 * Creates a snippet of license given a file
 *
 * @this AddFilePrompt
 * @return {string} the snippet
 */
function addLicenseSnippet () {
  const { filename, description, destinationpath } = this;
  const fileType = extname(filename || destinationpath).replace('.', '');

  switch (fileType) {
    case 'py':
      return pythonLicense();
    case 'yml':
    case 'Dockerfile':
      return hashLicense();
    case 'js':
      return jsCommentLicense(description);
    case 'ts':
    case 'styl':
      return commentLicenseBlock();
    case 'sass':
    case 'scss':
      return tripleSlashLicense();
    default:
      return '';
  }
}

module.exports = addLicenseSnippet;
