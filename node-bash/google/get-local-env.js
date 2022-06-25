/**
 * @module
 * @description Getting .env for local manual development from Google Cloud
 *
 * Usage: npm run local:get:env projects/<projectId>/secrets/<keyName>
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

import { program } from 'commander';
import { exec } from 'child_process';

program
  .argument('<keyPath>', 'path to the secret key (e.g. projects/projectId/secrets/keyName)')
  .action((keyPath) => {
    const [, projectId, , key, , version = 'latest'] = keyPath.split('/');
    if (projectId && key && version) {
      exec(`~/google-cloud-sdk/bin/gcloud secrets versions access ${version} --project ${projectId} --secret=${key} > secret/.env`, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    }
  });

program.parse();
