/**
 * @module
 * @description Common response errors
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

import { responses } from './components.js';

/**
 * @param {Array<number>} excludeStatuses
 * @param {Array<number>} includeStatuses
 * @returns {Object<number, *>}
 */
export const commonErrors = (excludeStatuses = [], includeStatuses = []) => {
  /**
   * @type {Array<number>}
   */
  const defaultExcludeStatuses = [
    402,
    405,
    407,
    409,
    412,
    413,
    414,
    415,
    416,
    417,
    421,
    422,
    423,
    424,
    426,
    428,
    431,
    451,
    501,
    502,
    504,
    505,
    507
  ];

  /**
   * @type {Array<number>}
   */
  const newExcludeStatuses = [
    ...excludeStatuses,
    ...defaultExcludeStatuses
  ];

  /** @type {Object<number?, *>} */
  const commonErrorResponses = {
    400: {
      $ref: `${responses}/MalformedResponse`
    },
    401: {
      $ref: `${responses}/UnauthorizedResponse`
    },
    402: {
      $ref: `${responses}/PaymentRequiredResponse`
    },
    403: {
      $ref: `${responses}/ForbiddenResponse`
    },
    404: {
      $ref: `${responses}/NotFoundResponse`
    },
    405: {
      $ref: `${responses}/MethodNotAllowedResponse`
    },
    406: {
      $ref: `${responses}/NotAcceptableResponse`
    },
    408: {
      $ref: `${responses}/TimeoutResponse`
    },
    409: {
      $ref: `${responses}/ConflictResponse`
    },
    410: {
      $ref: `${responses}/GoneResponse`
    },
    411: {
      $ref: `${responses}/LengthRequiredResponse`
    },
    412: {
      $ref: `${responses}/PreconditionedFailedResponse`
    },
    413: {
      $ref: `${responses}/PayloadTooLargeResponse`
    },
    414: {
      $ref: `${responses}/URITooLongResponse`
    },
    415: {
      $ref: `${responses}/UnsupportedMediaTypeResponse`
    },
    416: {
      $ref: `${responses}/RangeNotSatisfiableResponse`
    },
    417: {
      $ref: `${responses}/ExpectationFailedResponse`
    },
    418: {
      $ref: `${responses}/TeapotResponse`
    },
    421: {
      $ref: `${responses}/MisdirectedResponse`
    },
    422: {
      $ref: `${responses}/UnprocessableEntityResponse`
    },
    423: {
      $ref: `${responses}/LockedResponse`
    },
    424: {
      $ref: `${responses}/FailedDependencyResponse`
    },
    426: {
      $ref: `${responses}/UpgradeRequiredResponse`
    },
    428: {
      $ref: `${responses}/PreconditionRequiredResponse`
    },
    429: {
      $ref: `${responses}/RateLimitResponse`
    },
    431: {
      $ref: `${responses}/RequestHeaderFieldsTooLargeResponse`
    },
    451: {
      $ref: `${responses}/UnavailableLegalResponse`
    },
    500: {
      $ref: `${responses}/InternalServerErrorResponse`
    },
    501: {
      $ref: `${responses}/NotImplementedResponse`
    },
    502: {
      $ref: `${responses}/BadGatewayResponse`
    },
    503: {
      $ref: `${responses}/ServiceUnavailableResponse`
    },
    504: {
      $ref: `${responses}/GatewayTimeoutResponse`
    },
    507: {
      $ref: `${responses}/StorageInsufficientResponse`
    }
  };

  /* c8 ignore start */
  for (const statusCode of newExcludeStatuses) {
    if (statusCode === 0) {
      /** @type {Object<number?, *>} */
      const newCommonErrorResponses = {};

      for (const statusCode of includeStatuses) {
        newCommonErrorResponses[statusCode] = commonErrorResponses[statusCode];
      }

      return newCommonErrorResponses;
    }

    if (includeStatuses.indexOf(statusCode) < 0) {
      delete commonErrorResponses[statusCode];
    }
  }
  /* c8 ignore end */

  return commonErrorResponses;
};
