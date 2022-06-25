/**
 * @module
 * @description Sentry configuration
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

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

/* c8 ignore start */
export const sentryOpts = () => ({
  dsn: process.env.SENTRY_DSN,

  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      breadcrumbs: true,
      tracing: true
    }),
    new Sentry.Integrations.Console(),
    new Sentry.Integrations.OnUncaughtException(),
    new Sentry.Integrations.OnUnhandledRejection(),
    new Sentry.Integrations.FunctionToString()

    // Add additional integrations when needed
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: parseFloat(process.env.SENTRY_SAMPLE_RATE || '1.0')
});

if (process.env.SENTRY_DSN) {
  Sentry.init(sentryOpts());
}
/* c8 ignore end */

export {
  Sentry,
  Tracing
};
