/**
 * @module
 * @description Error handler utility
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

import { errors as newErrors } from '../errors/index.js';

/**
 *
 * @param {FastifyError} error
 * @param {FastifyRequest<RouteGenericInterface, Http2SecureServer, Http2ServerRequest>} request
 * @param {FastifyReply<Http2SecureServer, Http2ServerRequest, Http2ServerResponse, RouteGenericInterface, unknown>} response
 */

export const errorHandler = (error, request, response) => {
  const { statusCode = 500, validation } = error;

  // request log error so that it can be caught also by system
  request.log.error(error);

  /** @type {ErrorDictionary} */
  const generalErrors = {
    // 400
    'request/malformed': {
      code: 'request/malformed',
      message: 'The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.'
    },
    // 401
    'auth/unauthorized': {
      code: 'auth/unauthorized',
      message: 'The request requires user authentication. The client MAY repeat the request with a suitable Authorization header field. If the request already included Authorization credentials, then the 401 response indicates that authorization has been refused for those credentials.'
    },
    'payment/required': {
      code: 'payment/required',
      message: 'This request requires the user to have a payment condition fulfilled. The requested content is not available until the client makes a payment'
    },
    'auth/forbidden': {
      code: 'auth/forbidden',
      message: 'The server understood the request, but is refusing to fulfill it. Authorization will not help and the request SHOULD NOT be repeated.'
    },
    'request/not-found': {
      code: 'request/not-found',
      message: 'The server has not found anything matching the Request-URI. No indication is given of whether the condition is temporary or permanent.'
    },
    'request/method-not-allowed': {
      code: 'request/method-not-allowed',
      message: 'The server does not allow the use of the HTTP Method.'
    },
    'request/not-acceptable': {
      code: 'request/not-acceptable',
      message: 'The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request.'
    },
    'request/timeout': {
      code: 'request/timeout',
      message: 'The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time.'
    },
    'request/conflict': {
      code: 'request/conflict',
      message: 'The request could not be completed due to a conflict with the current state of the resource. This code is only allowed in situations where it is expected that the user might be able to resolve the conflict and resubmit the request.'
    },
    'data/not-found': {
      code: 'data/not-found',
      message: 'The data you are trying to find cannot be found.'
    },
    'request/length-required': {
      code: 'request/length-required',
      message: 'The server refuses to accept the request without a defined Content- Length. The client MAY repeat the request if it adds a valid Content-Length header field containing the length of the message-body in the request message.'
    },
    'request/precondition-failed': {
      code: 'request/precondition-failed',
      message: 'The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server.'
    },
    'request/too-large': {
      code: 'request/too-large',
      message: 'The server is refusing to process a request because the request entity is larger than the server is willing or able to process.'
    },
    'request/uri-too-long': {
      code: 'request/uri-too-long',
      message: 'The server is refusing to service the request because the Request-URI is longer than the server is willing to interpret.'
    },
    'request/unsupported-media-type': {
      code: 'request/unsupported-media-type',
      message: 'The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method.'
    },

    'request/range-not-satisfiable': {
      code: 'request/range-not-satisfiable',
      message: 'The server cannot supply that requested portion of the file'
    },
    'request/expectation-failed': {
      code: 'request/expectation-failed',
      message: 'The server cannot meet the requirements of the Expect request-header field.'
    },
    'me/teapot': {
      code: 'me/teapot',
      message: 'I am a teapot. Enough said.'
    },
    'request/misdirected': {
      code: 'request/misdirected',
      message: 'The request was directed at a server that is not able to produce a response.'
    },
    'request/unprocessable-entity': {
      code: 'request/unprocessable-entity',
      message: 'The request was well-formed but was unable to be followed due to semantic errors.'
    },
    'data/locked': {
      code: 'data/locked',
      message: 'The resource that is being accessed is locked.'
    },
    'request/failed-dependency': {
      code: 'request/failed-dependency',
      message: 'The request failed due to failure of a previous request.'
    },
    'request/upgrade-required': {
      code: 'request/upgrade-required',
      message: 'Upgrade API request version.'
    },
    'request/precondition-required': {
      code: 'request/precondition-required',
      message: 'The origin server requires the request to be conditional.'
    },
    'request/rate-limit': {
      code: 'request/rate-limit',
      message: 'The user has sent too many requests in a given amount of time ("rate limiting")'
    },
    'request/header-fields-too-large': {
      code: 'request/header-fields-too-large',
      message: 'The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.'
    },
    'request/unavailable-legal': {
      code: 'request/unavailable-legal',
      message: 'Unavailable for legal reasons.'
    },
    'server/internal-server-error': {
      code: 'server/internal-server-error',
      message: 'The server encountered an unexpected condition which prevented it from fulfilling the request.'
    },

    'server/not-implemented': {
      code: 'server/not-implemented',
      message: 'The server does not support the functionality required to fulfill the request.'
    },
    'gateway/invalid': {
      code: 'gateway/invalid',
      message: 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.'
    },
    'server/unavailable': {
      code: 'server/unavailable',
      message: 'The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.'
    },
    'gateway/timeout': {
      code: 'gateway/timeout',
      message: 'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server'
    },
    'storage/insufficient': {
      code: 'storage/insufficient',
      message: 'The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.'
    }
  };

  /** @type {Object<string, string>} */
  const synonyms = {
    'Not Found': 'request/not-found',
    'Bad Request': 'request/malformed',
    Unauthorized: 'auth/unauthorized',
    'Payment Required': 'payment/required',
    Forbidden: 'auth/forbidden',
    'Method Not Allowed': 'request/method-not-allowed',
    'Not Acceptable': 'request/not-acceptable',
    'Request Timeout': 'request/timeout',
    Conflict: 'request/conflict',
    Gone: 'data/not-found',
    'Length Required': 'request/length-required',
    'Precondition Failed': 'request/precondition-failed',
    'Payload Too Large': 'request/too-large',
    'URI Too Long': 'request/uri-too-long',
    'Unsupported Media Type': 'request/unsupported-media-type',
    'Range Not Satisfiable': 'request/range-not-satisfiable',
    'Expectation Failed': 'request/expectation-failed',
    'I\'m a teapot': 'me/teapot',
    'Unprocessable Entity': 'request/unprocessable-entity',
    Locked: 'data/locked',
    'Failed Dependency': 'request/failed-dependency',
    'Unordered Collection': 'data/unordered',
    'Upgrade Required': 'request/update-required',
    'Precondition Required': 'request/precondition-required',
    'Too Many Requests': 'request/rate-limit',
    'Request Header Fields Too Large': 'request/header-fields-too-large',
    'Unavailable For Legal Reasons': 'request/unavailable-legal',
    'Internal Server Error': 'server/internal-server-error',
    'Not Implemented': 'server/not-implemented',
    'Bad Gateway': 'gateway/invalid',
    'Service Unavailable': 'server/unavailable',
    'Gateway Timeout': 'gateway/timeout',
    'Insufficient Storage': 'storage/insufficient'
  };

  for (const synonym in synonyms) {
    generalErrors[`${synonym}`] = generalErrors[`${synonyms[`${synonym}`]}`];
  }

  /** @type {ErrorDictionary} */
  const errors = {
    ...generalErrors,
    ...newErrors
  };

  if (validation) {
    return response
      .code(400)
      .send({
        success: false,
        statusCode: 400,
        code: 'request/malformed',
        error: 'request/malformed',
        message: validation[0].message
      });
  }

  return response
    .code(statusCode)
    .send({
      success: false,
      statusCode,
      error: errors[error.message] ? error.message : 'server/general-error',
      code: errors[error.message]?.code ? errors[error.message]?.code : 'server/general-error',
      message: errors[error.message]?.message || error.message
    });
};
