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

export const FailedDependencyResponse = {
  description: 'Failed Dependency Response',
  content: {
    'application/json': {
      schema: {
        $ref: `${schemas}/CommonError`,
        description: 'The request failed due to failure of a previous request.',
        example: {
          success: false,
          statusCode: 424,
          error: 'request/failed-dependency',
          code: 'request/failed-dependency',
          message: 'The request failed due to failure of a previous request.'
        }
      }
    }
  }
};
