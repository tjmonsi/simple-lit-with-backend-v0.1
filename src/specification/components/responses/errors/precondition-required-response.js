/**
 * @module
 * @description Payment Required Response specifications
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

import { schemas } from '../../../../utils/open-api/components.js';

export const PreconditionRequiredResponse = {
  description: 'Precondition Required Response',
  content: {
    'application/json': {
      schema: {
        $ref: `${schemas}/CommonError`,
        description: 'The origin server requires the request to be conditional. This response is intended to prevent the \'lost update\' problem, where a client GETs a resource\'s state, modifies it and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.',
        example: {
          success: false,
          statusCode: 426,
          error: 'request/precondition-required',
          code: 'request/precondition-required',
          message: 'The origin server requires the request to be conditional.'
        }
      }
    }
  }
};
