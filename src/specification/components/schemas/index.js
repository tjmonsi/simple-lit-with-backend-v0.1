/**
 * @module
 * @description Open API Specifications Schemas Index
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
 *
 * HOW TO USE:
 *
 * Import files from definitions folder. The model definitions are categorized
 * as the following
 *
 * - atomic
 * - data
 *
 * Atomic models are data that are types of string, number, or boolean.
 *
 * Data models are data that are types of objects and arrays and are comprised
 * of atomic models or data models. We reference those models using their
 * ID name, which is in essence the Key name we use to import them.
 *
 */

// import atomic models
import { Success } from './base/success.js';

// import data models
import { CommonError } from './base/common-error.js';

/** @type {*} */

export const schemas = {
  Success,
  CommonError
};
