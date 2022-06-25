/**
 * @module
 * @description Home root
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

import { commonErrors } from '../../../utils/open-api/common-errors.js';
import { responses } from '../../../utils/open-api/components.js';

/** @type {Array<number>} */
const excludeStatuses = [
  401,
  403,
  410,
  411,
  404,
  406
];

/** @type {Array<number>} */
const includeStatuses = [];

export const home = {
  get: {
    summary: 'Home',
    description: 'Some home description',
    operationId: 'home',
    tags: [
      'General'
    ],
    responses: {
      200: {
        $ref: `${responses}/SuccessfulResponse`
      },
      ...commonErrors(excludeStatuses, includeStatuses)
    }
  }
};
