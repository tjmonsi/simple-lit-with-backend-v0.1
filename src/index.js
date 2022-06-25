/**
 * @module
 * @description Starting point
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

import { build } from './app.js';

async function start () {
  const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;
  const port = parseInt(process.env.PORT || '8080');
  const address = IS_GOOGLE_CLOUD_RUN ? '0.0.0.0' : undefined;

  try {
    const server = await build();
    const addr = await server.listen(port, address);
    console.log(`Listening on ${addr}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
