/**
 * @module
 * @description Error handler Test
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

import tap from 'tap';
import 'must/register.js';
import { errorFilter } from '../../../src/utils/helpers/error-filter.js';

tap.mochaGlobals();

describe('Utils helper error-handler', async () => {
  /** @type {*} */
  const request = {};

  it('should return true when statusCode >= 500', async () => {
    // mocks error, request, and response
    const error = {
      statusCode: 500
    };

    const reply = /** @type {*} */ (errorFilter(error, request));
    reply.must.be.true();
  });
});
