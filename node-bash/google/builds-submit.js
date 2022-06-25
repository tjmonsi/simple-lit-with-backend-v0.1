/**
 * @module
 * @description Build script Google Cloud
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
import { readFileSync } from 'fs';

const { version } = JSON.parse(readFileSync('package.json', 'utf8'));

const result = dotenv.config({
  path: process.env.ENV_PATH || 'secret/.env'
});

if (result.error) {
  console.error('Please copy env into .env to start working');
  throw result.error;
}

const {
  GOOGLE_BUILD_PROJECT_ID,
  GOOGLE_TAG,
  GOOGLE_BUILD_LOG_DIR,
  GOOGLE_BUILD_SOURCE_STAGING_DIR,
  GOOGLE_BUILD_REGION,
  GOOGLE_BUILD_TIMEOUT
} = process.env || {};

console.log(`~/google-cloud-sdk/bin/gcloud builds submit \
  --project ${GOOGLE_BUILD_PROJECT_ID} \
  --region ${GOOGLE_BUILD_REGION} \
  --tag gcr.io/${GOOGLE_BUILD_PROJECT_ID}/${GOOGLE_TAG}:${version} \
  --gcs-log-dir ${GOOGLE_BUILD_LOG_DIR}/${GOOGLE_TAG} \
  --gcs-source-staging-dir ${GOOGLE_BUILD_SOURCE_STAGING_DIR} \
  ${GOOGLE_BUILD_TIMEOUT ? `--timeout ${GOOGLE_BUILD_TIMEOUT}` : ''}`);
