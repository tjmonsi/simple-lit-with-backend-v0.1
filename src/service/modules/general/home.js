/**
 * @module
 * @description Home operation id
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
 * Simple home service function that returns a simple object
 *
 * @param {FastifyRequest<RouteGenericInterface, Http2SecureServer, Http2ServerRequest> | *} _request
 * @param {FastifyReply<Http2SecureServer, Http2ServerRequest, Http2ServerResponse, RouteGenericInterface, unknown> | *} _response
 * @returns {Promise<{ success: boolean }>}
 */
export const home = async (_request, _response) => {
  return {
    success: true
  };
};
