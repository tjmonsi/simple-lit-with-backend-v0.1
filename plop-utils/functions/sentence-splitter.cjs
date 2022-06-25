/**
 * @module
 * @description This splits a long text into an array of splitted
 * phrases that have a length n.
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
 * @description This splits the sentence into an array of phrases that has a
 * a limit of charLength
 *
 * @param {string} str the text that needs to be split
 * @param {number} charLength this is the limit of the length of the line. Default is 50 characters
 * @return {Array<string>} returns an array of phrases with each phrase's length near the charLength limit
 */
const sentenceSplitter = (str, charLength = 50) => {
  const phrases = [];
  const words = str.split(/\s/s);

  let phrase = [];
  for (const word of words) {
    phrase.push(word);
    const phraseTemp = phrase.join(' ');
    if (phraseTemp.length > charLength) {
      phrases.push(phraseTemp);
      phrase = [];
    }
  }

  if (phrase.length > 0) {
    phrases.push(phrase.join(' '));
  }

  return phrases;
};

module.exports = sentenceSplitter;
