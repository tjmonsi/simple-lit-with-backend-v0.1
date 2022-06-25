/**
 * @module
 * @description Starting app file for Fastify
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

import Fastify from 'fastify';
import openApiGlue from 'fastify-openapi-glue';
import swagger from 'fastify-swagger';
import sensible from 'fastify-sensible';
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';
import cookie from 'fastify-cookie';
import session from 'fastify-session';
import stat from 'fastify-static';
import sentry from '@zentered/fastify-sentry';
import './utils/helpers/load-env.js';
import { specification } from './specification/index.js';
import { Service } from './service/index.js';
import { Security } from './security/index.js';
import { errorHandler } from './utils/helpers/error-handler.js';
import { errorFilter } from './utils/helpers/error-filter.js';
import { sentryOpts } from './utils/sentry/index.js';
// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';

/**
 * This is the function to build the app
 *
 * @param {*} opts this is an option set used to configure Fastify. See Fastify options
 * @returns {Promise<FastifyInstance<Http2SecureServer, Http2ServerRequest, Http2ServerResponse, FastifyLoggerInstance>>}
 */
export const build = async (opts = {}) => {
  const {
    CONNECTION_TIMEOUT = 0,
    KEEP_ALIVE_TIMEOUT = 5000,
    MAX_REQUESTS_PER_SOCKET = 0,
    REQUEST_TIMEOUT = 0,
    IGNORE_TRAILING_SLASH = '',
    MAX_PARAM_LENGTH = 100,
    BODY_LIMIT = 1048576,
    ON_PROTO_POISONING = 'error',
    ON_CONSTRUCTOR_POISONING = 'error',
    TRUST_PROXY = true,
    LOGGER_LEVEL = 'info',
    NODE_ENV = 'development',

    API_PREFIX = 'dev',
    EXPOSE_DOC_ROUTE = true,
    DOC_ROUTE_PREFIX = '/dev',
    CSP_DEFAULT_SRC = '\'self\'',
    CSP_BASE_URI = '\'self\'',
    CSP_MIXED_CONTENT = '',
    CSP_FONT_SRC = '\'self\'',
    CSP_FORM_ACTION = '\'self\'',
    CSP_FRAME_ANCESTORS = '\'self\'',
    CSP_OBJECT_SRC = '\'none\'',
    CSP_IMG_SRC = '\'self\' data: https:',
    CSP_SCRIPT_SRC = '\'self\' \'unsafe-inline\'',
    CSP_SCRIPT_SRC_ATTR = '\'none\'',
    CSP_STYLE_SRC = '\'self\' \'unsafe-inline\'',
    CROSS_ORIGIN_EMBEDDER_POLICY = false,
    CROSS_ORIGIN_OPENER_POLICY = 'same-origin',
    CROSS_ORIGIN_RESOURCE_POLICY = 'cross-origin',
    EXPECT_CT_MAX_AGE = '86400',
    EXPECT_CT_ENFORCE = false,
    EXPECT_CT_REPORT_URI = '',
    REFERRER_POLICY = 'no-referrer',
    HSTS_MAX_AGE = '15552000',
    HSTS_INCLUDE_SUBDOMAINS = false,
    HSTS_PRELOAD = false,
    NO_SNIFF = false,
    ORIGIN_AGENT_CLUSTER = false,
    DNS_PREFETCH_CONTROL_ALLOW = false,
    IE_NO_OPEN = false,
    FRAMEGUARD_ACTION = 'sameorigin',
    PERMITTED_CROSS_DOMAIN_POLICIES = 'none',
    HIDE_POWERED_BY = false,
    XSS_FILTER = false,
    CORS_ORIGIN = '*',
    SESSION_SECRET = 'a secret with minimum length of 32 characters'
  } = /** @type {*} */(process.env);

  /**
   * Setting up the app given options
   */
  const fastify = Fastify({
    connectionTimeout: parseInt(CONNECTION_TIMEOUT, 10),
    keepAliveTimeout: parseInt(KEEP_ALIVE_TIMEOUT, 10),
    maxRequestsPerSocket: parseInt(MAX_REQUESTS_PER_SOCKET, 10),
    requestTimeout: parseInt(REQUEST_TIMEOUT, 10),
    ignoreTrailingSlash: !!IGNORE_TRAILING_SLASH,
    maxParamLength: parseInt(MAX_PARAM_LENGTH, 10),
    bodyLimit: parseInt(BODY_LIMIT, 10),
    onProtoPoisoning: ON_PROTO_POISONING,
    onConstructorPoisoning: ON_CONSTRUCTOR_POISONING,
    trustProxy: !!TRUST_PROXY,
    logger: {
      // 'fatal', 'error', 'warn', 'info', 'debug', 'trace'; also 'silent'
      level: LOGGER_LEVEL
    },
    ...opts
  });

  fastify.register(cookie);
  fastify.register(session, {
    cookieName: 'sessionToken',
    secret: SESSION_SECRET,
    cookie: {
      secure: 'auto',
      httpOnly: true,
      maxAge: 60 * 60
    }
  });

  await fastify.register(sensible);

  /* c8 ignore start */
  if (process.env.SENTRY_DSN) {
    await fastify.register(sentry, {
      ...sentryOpts(),
      environment: NODE_ENV,
      tracing: true,
      errorHandler,
      errorFilter
    });
  } else {
    fastify.setErrorHandler(errorHandler);
  }
  /* c8 ignore end */

  await fastify.register(helmet, {
    // see https://helmetjs.github.io/
    // and https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    contentSecurityPolicy: {
      directives: {
        defaultSrc: CSP_DEFAULT_SRC.toLowerCase(),
        baseUri: CSP_BASE_URI.toLowerCase(),
        blockAllMixedContent: CSP_MIXED_CONTENT.toLowerCase(),
        fontSrc: CSP_FONT_SRC.toLowerCase(),
        formAction: CSP_FORM_ACTION.toLowerCase(),
        frameAncestors: CSP_FRAME_ANCESTORS.toLowerCase(),
        objectSrc: CSP_OBJECT_SRC.toLowerCase(),
        imgSrc: CSP_IMG_SRC.toLowerCase(),
        scriptSrc: CSP_SCRIPT_SRC.toLowerCase(),
        scriptSrcAttr: CSP_SCRIPT_SRC_ATTR.toLowerCase(),
        styleSrc: CSP_STYLE_SRC.toLowerCase()
      }
    },

    // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy
    crossOriginEmbedderPolicy: !!CROSS_ORIGIN_EMBEDDER_POLICY,

    // same-origin-allow-popups, unsafe-none -
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy
    crossOriginOpenerPolicy: {
      policy: CROSS_ORIGIN_OPENER_POLICY.toLowerCase()
    },

    // same-origin, same-site, cross-origin
    // see https://resourcepolicy.fyi/
    crossOriginResourcePolicy: {
      policy: CROSS_ORIGIN_RESOURCE_POLICY.toLowerCase()
    },

    // see https://developer.mozilla.org/en-US/docs/Web/Security/Certificate_Transparency
    expectCt: {
      maxAge: parseInt(EXPECT_CT_MAX_AGE, 10),
      enforce: !!EXPECT_CT_ENFORCE,
      reportUri: EXPECT_CT_REPORT_URI
    },

    // see https://developer.mozilla.org/en-US/docs/Web/Security/Referer_header:_privacy_and_security_concerns
    referrerPolicy: {
      policy: REFERRER_POLICY?.split(',')
        .map(/** @param {string} policy **/(policy) => policy
          .toLowerCase()
          .trim())
    },

    // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
    hsts: {
      maxAge: parseInt(HSTS_MAX_AGE, 10),
      includeSubDomains: !!HSTS_INCLUDE_SUBDOMAINS,

      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security#preloading_strict_transport_security
      preload: !!HSTS_PRELOAD
    },

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#mime_sniffing
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
    noSniff: !!NO_SNIFF,

    originAgentCluster: !!ORIGIN_AGENT_CLUSTER,

    dnsPrefetchControl: {
      allow: !!DNS_PREFETCH_CONTROL_ALLOW
    },

    ieNoOpen: !!IE_NO_OPEN,

    frameguard: {
      action: FRAMEGUARD_ACTION
    },

    permittedCrossDomainPolicies: {
      // none, master-only, by-content-type, all
      permittedPolicies: PERMITTED_CROSS_DOMAIN_POLICIES
    },

    hidePoweredBy: !!HIDE_POWERED_BY,

    xssFilter: !!XSS_FILTER
  });

  fastify.register(cors, {
    /* c8 ignore start */
    // change this if we want to use a database to load origin
    origin: CORS_ORIGIN === '*' || CORS_ORIGIN.indexOf(',') < 0
      ? CORS_ORIGIN
      : CORS_ORIGIN?.split(',')
        .map(/** @param {string} origin **/(origin) => origin.trim()),
    /* c8 ignore end */
    preflightContinue: true,
    optionsSuccessStatus: 200
  });

  console.log(`${process.cwd()}/src/public`);

  fastify.register(stat, {
    root: `${process.cwd()}/src/public`,
    preCompressed: true
  });

  fastify.setNotFoundHandler((_req, res) => {
    res.statusCode = 404;
    res.sendFile('index.html');
  });

  const service = new Service(fastify);
  const securityHandlers = new Security(fastify);

  /**
   * @type {FastifyRegisterOptions<FastifyOpenapiGlueOptions>}
   */
  const options = {
    specification,
    service,
    securityHandlers,
    /* c8 ignore next */
    prefix: API_PREFIX || '',
    noAdditional: true
  };

  /**
   * @type {FastifyRegisterOptions<FastifyDynamicSwaggerOptions>}
   */
  const swaggerOptions = {
    // @ts-ignore
    openapi: specification,
    routePrefix: DOC_ROUTE_PREFIX,
    exposeRoute: !!EXPOSE_DOC_ROUTE
  };

  fastify.register(swagger, swaggerOptions);
  fastify.register(openApiGlue, options);

  return fastify;
};
