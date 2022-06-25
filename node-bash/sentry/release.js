/**
 * @module
 * @description Release script for Sentry
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
  SENTRY_ENVIRONMENT = 'development'
} = process.env || {};

console.log(`curl -sL https://sentry.io/get-cli/ | bash
export SENTRY_RELEASE=v${version}-$(sentry-cli releases propose-version)
sentry-cli releases new -p $SENTRY_PROJECT $SENTRY_RELEASE
sentry-cli releases set-commits $SENTRY_RELEASE --auto
sentry-cli releases files $SENTRY_RELEASE upload-sourcemaps path-to-sourcemaps-if-applicable
sentry-cli releases finalize $SENTRY_RELEASE
sentry-cli releases deploys $SENTRY_RELEASE new -e ${SENTRY_ENVIRONMENT}
`);
