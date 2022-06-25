/**
 * @module
 * @description Open API Specification index
 *
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

import { components } from './components/index.js';
import { paths } from './paths/index.js';
import { tags } from './tags/index.js';
import { externalDocs } from './external-docs/index.js';
import { security } from './security/index.js';
import { servers } from './servers/index.js';
import { readFileSync } from 'fs';

const {
  name: title,
  description,
  version,
  license
} = JSON.parse(readFileSync('package.json', 'utf8'));

export const specification = {
  openapi: '3.1.0',
  servers,
  info: {
    description,
    version,
    title,
    license: {
      name: license,
      url: 'https://spdx.org/licenses/Apache-2.0.html'
    }
  },
  tags,
  paths,
  externalDocs,
  components,
  security
};
