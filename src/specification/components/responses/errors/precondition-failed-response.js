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

export const PreconditionedFailedResponse = {
  description: 'Preconditioned Failed Response',
  content: {
    'application/json': {
      schema: {
        $ref: `${schemas}/CommonError`,
        description: 'The client has indicated preconditions in its headers which the server does not meet.',
        example: {
          success: false,
          statusCode: 412,
          error: 'request/precondition-failed',
          code: 'request/precondition-failed',
          message: 'The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server.'
        }
      }
    }
  }
};
