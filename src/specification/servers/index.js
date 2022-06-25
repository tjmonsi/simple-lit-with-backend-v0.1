/**
 * @module
 * @description Servers Open API Specification index
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

export const servers = [
  {
    url: 'http://localhost:8080',
    description: 'Local Development Server'
  }
];

/* c8 ignore start */
if (process.env.GOOGLE_RUN_SERVER_URL) {
  servers.unshift({
    url: process.env.GOOGLE_RUN_SERVER_URL,
    description: 'Gcloud server'
  });
}

if (process.env.GITPOD_WORKSPACE_URL) {
  const [, gitpodUrl] = process.env.GITPOD_WORKSPACE_URL.split('https://');
  servers.unshift({
    url: `https://${process.env.PORT || 8080}-${gitpodUrl}`,
    description: 'Gitpod Development server'
  });
}
/* c8 ignore stop */
