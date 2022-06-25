/**
 * @module
 * @description Error handler Test
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

import tap from 'tap';
import 'must/register.js';
import { errorHandler } from '../../../src/utils/helpers/error-handler.js';

tap.mochaGlobals();

describe('Utils helper error-handler', async () => {
  /** @type {*} */
  const request = {
    log: {
      /**
       * @param {string} string
       */
      error: function (string) {
        console.log(string);
      },
      /**
       * @param {string} string
       */
      info: function (string) {
        console.log(string);
      }
    }
  };

  /** @type {*} */
  const response = () => ({
    /**
     * @param {number} statusCode
     */
    code: function (statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    /**
     *
     * @param {*} obj
     * @returns
     */
    send: function (obj) {
      this.response = obj;
      return this;
    }
  });

  it('should return 400 when a statusCode 400 is given', async () => {
    // mocks error, request, and response
    const error = {
      statusCode: 400,
      message: 'request/malformed'
    };

    const reply = /** @type {*} */ (errorHandler(error, request, response()));
    reply.statusCode.must.be.equal(error.statusCode);
    reply.response.success.must.be.false();
    reply.response.statusCode.must.be.equal(error.statusCode);
  });

  it('should return 500 when a statusCode 500 is given', async () => {
    // mocks error, request, and response
    const error = {
      statusCode: 500,
      message: 'server/general-error'
    };

    const reply = /** @type {*} */ (errorHandler(error, request, response()));
    reply.statusCode.must.be.equal(error.statusCode);
    reply.response.success.must.be.false();
    reply.response.statusCode.must.be.equal(error.statusCode);
  });

  it('should return same status code', async () => {
    // mocks error, request, and response
    const error = {
      statusCode: 303,
      message: 'server/general-error'
    };

    const reply = /** @type {*} */ (errorHandler(error, request, response()));
    reply.statusCode.must.be.equal(error.statusCode);
    reply.response.success.must.be.false();
    reply.response.statusCode.must.be.equal(error.statusCode);
  });

  it('should return malformed', async () => {
    // mocks error, request, and response
    const error = {
      statusCode: 400,
      validation: [
        {
          message: 'id is not found'
        }
      ]
    };

    const reply = /** @type {*} */ (errorHandler(error, request, response()));
    reply.statusCode.must.be.equal(error.statusCode);
    reply.response.success.must.be.false();
    reply.response.statusCode.must.be.equal(error.statusCode);
  });

  it('should return malformed', async () => {
    // mocks error, request, and response
    const error = {
      statusCode: 400,
      message: 'Malformed'
    };

    const reply = /** @type {*} */ (errorHandler(error, request, response()));
    reply.statusCode.must.be.equal(error.statusCode);
    reply.response.success.must.be.false();
    reply.response.statusCode.must.be.equal(error.statusCode);
  });
});
