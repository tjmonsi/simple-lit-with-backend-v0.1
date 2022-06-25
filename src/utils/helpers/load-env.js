/**
 * @module
 * @description Loads the environment variables from .env
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

import dotenv from 'dotenv';

// load dotenv
const result = dotenv.config({
  path: process.env.ENV_PATH || 'secret/.env'
});

/* c8 ignore start */
if (result.error) {
  console.error('Please copy env into .env to start working');
  throw result.error;
}
/* c8 ignore end */
