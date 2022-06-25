/**
 * @module
 * @description Get Cloud Run URL
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

const result = dotenv.config({
  path: process.env.ENV_PATH || 'secret/.env'
});

if (result.error) {
  console.error('Please copy env into .env to start working');
  throw result.error;
}

const {
  GOOGLE_PROJECT_ID,
  GOOGLE_TAG,
  GOOGLE_RUN_REGION
} = process.env || {};

console.log(`GCLOUD_RUN_URL=$(gcloud run services describe ${GOOGLE_TAG} --project ${GOOGLE_PROJECT_ID} --platform managed --region ${GOOGLE_RUN_REGION} --format 'value(status.url)')`);
console.log('echo $GCLOUD_RUN_URL');
