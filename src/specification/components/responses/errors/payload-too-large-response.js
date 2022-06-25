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

export const PayloadTooLargeResponse = {
  description: 'Payload Too Large Response',
  content: {
    'application/json': {
      schema: {
        $ref: `${schemas}/CommonError`,
        description: 'Request entity is larger than limits defined by server. The server might close the connection or return an Retry-After header field.',
        example: {
          success: false,
          statusCode: 413,
          error: 'request/too-large',
          code: 'request/too-large',
          message: 'The server is refusing to process a request because the request entity is larger than the server is willing or able to process.'
        }
      }
    }
  }
};
