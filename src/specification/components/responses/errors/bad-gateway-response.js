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

export const BadGatewayResponse = {
  description: 'Bad Gateway Response',
  content: {
    'application/json': {
      schema: {
        $ref: `${schemas}/CommonError`,
        description: 'This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.',
        example: {
          success: false,
          statusCode: 502,
          error: 'gateway/invalid',
          code: 'gateway/invalid',
          message: 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.'
        }
      }
    }
  }
};
