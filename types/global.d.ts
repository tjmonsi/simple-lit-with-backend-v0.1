declare module 'is-invalid-path';
declare module 'inquirer-directory';
declare module '@zentered/fastify-sentry';

/**
 * add imported things here
 */
const {
  FastifyInstance,
  RouteShorthandOptions,
  FastifyLoggerInstance,
  FastifyRegisterOptions,
  FastifyRequest,
  FastifyReply,
  FastifyError
} = require('fastify');

const {
  RouteGenericInterface
} = require('fastify/types/route')

const {
  FastifyOpenapiGlueOptions
} = require('fastify-openapi-glue');

const {
  FastifyDynamicSwaggerOptions
} = require('fastify-swagger');

const {
  Http2SecureServer,
  Http2ServerRequest,
  Http2ServerResponse
} = require('http2');

const {
  NodePlopAPI
} = require('plop');

const {
  PromptModule
} = require('inquirer');

const {
  PlaywrightTestConfig
} = require('@playwright/test');

/**
 * add interfaces here
 */
interface ErrorDictionary {
  [errorCode: string]: {
    code: string,
    message: string
  }
}

interface SwaggerDataDefinition {
  [key: string]: {
    type: string,
    description?: string,
    required?: Array<string>,
    items?: SwaggerDataDefinition | string,
    properties?: SwaggerDataDefinition | string,
    value?: string,
    example?: string
  }
}

interface AddFilePrompt {
  destinationpath: string,
  filename: string,
  description: string
}

interface AddDocumentPagePrompt {
  name: string,
  destinationpath: string | null,
  isIndex: boolean,
  weight: number
}
