/**
 * @module
 * @description Deploy Cloud Run
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
  GOOGLE_RUN_PROJECT_ID,
  GOOGLE_RUN_REGION,
  GOOGLE_RUN_SERVICE_ACCOUNT,
  GOOGLE_RUN_ALLOW_UNAUTHENTICATED = false,
  GOOGLE_RUN_SECRETS,
  // added here
  GOOGLE_VPC_CONNECTOR,
  GOOGLE_CLOUD_SQL,
  GOOGLE_INGRESS = 'all',
  GOOGLE_MAX_INSTANCES = 'default',
  GOOGLE_MIN_INSTANCES = 'default',
  GOOGLE_CPU,
  GOOGLE_MEMORY
} = process.env || {};

console.log(`~/google-cloud-sdk/bin/gcloud run deploy ${GOOGLE_TAG} \
  --project ${GOOGLE_RUN_PROJECT_ID} \
  --image gcr.io/${GOOGLE_BUILD_PROJECT_ID}/${GOOGLE_TAG}:${version} \
  --platform managed \
  --region ${GOOGLE_RUN_REGION} \
  --service-account ${GOOGLE_RUN_SERVICE_ACCOUNT} \
  --ingress=${GOOGLE_INGRESS} \
  --max-instances=${GOOGLE_MAX_INSTANCES} \
  --min-instances=${GOOGLE_MIN_INSTANCES} \
  ${GOOGLE_RUN_ALLOW_UNAUTHENTICATED
    ? '--allow-unauthenticated'
    : ''
  } \
  ${GOOGLE_RUN_SECRETS
    ? `--set-secrets=${GOOGLE_RUN_SECRETS}`
    : ''} \
  ${GOOGLE_VPC_CONNECTOR
    ? `--vpc-connector=${GOOGLE_VPC_CONNECTOR}`
    : ''} \
  ${GOOGLE_CLOUD_SQL
    ? `--set-cloudsql-instances=${GOOGLE_CLOUD_SQL}`
    : ''}
  ${GOOGLE_CPU
    ? `--cpu=${GOOGLE_CPU}`
    : ''}
  ${GOOGLE_MEMORY
    ? `--memory=${GOOGLE_MEMORY}`
    : ''}
  `);
