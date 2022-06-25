/**
 * @module
 * @description Components specifications
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
 */

import { responses } from './responses/index.js';
import { schemas } from './schemas/index.js';
import { securitySchemes } from './security-schemes/index.js';
import { requestBodies } from './request-bodies/index.js';
import { parameters } from './parameters/index.js';
import { headers } from './headers/index.js';
import { examples } from './examples/index.js';

export const components = {
  responses,
  securitySchemes,
  schemas,
  requestBodies,
  parameters,
  headers,
  examples
};
