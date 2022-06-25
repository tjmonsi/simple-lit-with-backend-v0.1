---
  title: "security"
  draft: false
  TableOfContents: true
  weight: 10000
---
<a name="module_security/index"></a>

## security/index
Security Class

**License**: Copyright 2020, Senti Techlabs Inc..
Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.  

* [security/index](#module_security/index)
    * [.Security](#module_security/index.Security)
        * [new exports.Security(app)](#new_module_security/index.Security_new)
        * [.bearerAuth(request, response)](#module_security/index.Security+bearerAuth)

<a name="module_security/index.Security"></a>

### Security
**Kind**: static class of [<code>security/index</code>](#module_security/index)  

* [.Security](#module_security/index.Security)
    * [new exports.Security(app)](#new_module_security/index.Security_new)
    * [.bearerAuth(request, response)](#module_security/index.Security+bearerAuth)

<a name="new_module_security/index.Security_new"></a>

#### new exports.Security(app)

| Param | Type |
| --- | --- |
| app | <code>FastifyInstance.&lt;Http2SecureServer, Http2ServerRequest, Http2ServerResponse, FastifyLoggerInstance&gt;</code> | 

<a name="module_security/index.Security+bearerAuth"></a>

#### security.bearerAuth(request, response)
**Kind**: instance method of [<code>Security</code>](#module_security/index.Security)  

| Param | Type |
| --- | --- |
| request | <code>FastifyRequest.&lt;\*&gt;</code> | 
| response | <code>FastifyReply.&lt;Response&gt;</code> | 

