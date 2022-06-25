/**
 * @module
 * @description Error filter for Sentry utility
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

/**
 * This filters the error to check if it should send the error to Sentry or not
 *
 * @param {*} error
 * @param {FastifyRequest} _request
 * @returns {boolean}
 */
export const errorFilter = (error, _request) => {
  const { statusCode } = error;

  /* c8 ignore start */
  // change this to add more statusCodes that needed to be reported
  return statusCode >= 500 ||
    statusCode === 403 ||
    statusCode === 405 ||
    statusCode === 408 ||
    statusCode === 411 ||
    (statusCode >= 413 && statusCode < 417) ||
    (statusCode > 418) ||
    !statusCode;
  /* c8 ignore end */
};
