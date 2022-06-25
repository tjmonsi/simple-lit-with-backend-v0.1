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

export const UnsupportedMediaTypeResponse = {
  description: 'Unsupported Media Type Response',
  content: {
    'application/json': {
      schema: {
        $ref: `${schemas}/CommonError`,
        description: 'The media format of the requested data is not supported by the server, so the server is rejecting the request.',
        example: {
          success: false,
          statusCode: 415,
          error: 'request/unsupported-media-type',
          code: 'request/unsupported-media-type',
          message: 'The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method.'
        }
      }
    }
  }
};
