/**
 * @module
 * @description Get Environment Google Cloud
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

let projectId, key, version;

const {
  CI_JOB_NAME = 'run-test-stable',
  CI_COMMIT_BRANCH = 'master',
  TEST_ENV_SECRET_PATH = '',
  DEV_ENV_SECRET_PATH = '',
  STAGING_ENV_SECRET_PATH = '',
  UAT_ENV_SECRET_PATH = '',
  PROD_ENV_SECRET_PATH = ''
} = process.env || {};

if (CI_JOB_NAME === 'run-test-stable' || CI_JOB_NAME === 'run-test') {
  [, projectId, , key, , version = 'latest'] = TEST_ENV_SECRET_PATH.split('/');
} else {
  switch (CI_COMMIT_BRANCH) {
    case 'main':
    case 'master':
      [, projectId, , key, , version = 'latest'] = DEV_ENV_SECRET_PATH.split('/');
      break;
    case 'staging':
      [, projectId, , key, , version = 'latest'] = STAGING_ENV_SECRET_PATH.split('/');
      break;
    case 'uat':
      [, projectId, , key, , version = 'latest'] = UAT_ENV_SECRET_PATH.split('/');
      break;
    case 'prod':
    case 'production':
    case 'release':
      [, projectId, , key, , version = 'latest'] = PROD_ENV_SECRET_PATH.split('/');
      break;
    default:
      console.log(`echo "will not deploy ${CI_COMMIT_BRANCH}`);
      break;
  }
}

if (projectId && key && version) {
  console.log(`~/google-cloud-sdk/bin/gcloud secrets versions access ${version} --project ${projectId} --secret=${key} > secret/.env`);
}
