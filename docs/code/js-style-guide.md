---
title: "Javascript Style Guide"
date: 2022-02-08T01:28:26.898Z
draft: false
TableOfContents: true
weight: 200
---

## Introduction

This document serves as the complete definition of
the Senti's Javascript coding standards.
This is based on [Google Coding Standards](https://google.github.io/styleguide/jsguide.html),
[StandardJS](https://standardjs.com/) with [semicolon](https://www.npmjs.com/package/semistandard).

### Terminology used

Copying from Google Style guide:

In this document, unless otherwise clarified:

1. The term comment always refers to implementation comments.
We do not use the phrase documentation comments,
instead using the common term “JSDoc” for both human-readable
text and machine-readable annotations within `/** … */`.

2. This Style Guide uses [RFC 2119](https://tools.ietf.org/html/rfc2119)
terminology when using the phrases must, must not, should, should not, and may.
The terms prefer and avoid correspond to should and should not, respectively.
Imperative and declarative statements are prescriptive and correspond to must.

Other terminology notes will appear occasionally throughout the document.

### Things that we are different from Google JS Style Guide

- Array Literals, Trailing Commas: This style guide follows the StandardJS rule.
Don't add trailing commas at the end.
- Object Literals, Trailing Commas: This style guide follows the StandardJS rule.
Don't add trailing commas at the end.

## Source Code Structures

### Naming a file

File names must be all lowercase and only include dashes (`-`),
but no additional punctuation. Follow the convention that your project uses.
Filenames' extension must be `.js`.

### File encoding

Source codes are encoded in `UTF-8`.

### Creating a File

Creating a Javascript file must use the project's file generator:

```bash
npx plop create:file path/to/file.js
```

This will create a file with a license snippet and description of the file.

```js
/**
 * @module
 * @description this is a file
 *
 * @license
 * Copyright 2020, Generic Group.
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
```

Every file must have the license snippet above with the `@module` keyword,
`@description` keyword with the description of what the file is, and the
`@license` keyword.

### Line length

A code line length should be 80-columns.

### ES Module

#### Importing

Import statements must not be line wrapped and are therefore an exception to the 80-column limit.

##### When using in Node JS (without a bundler)

All loading of packages must be put on top of the file,
after the license snippet, except for the last case.

1. When loading a whole package, use require.

```js
const packageName = require('package-name');
require('package-name-2');
```

2. All requires must use `const`.

```js
const packageName = require('package-name');
```

3. Loading another file must have its path be based relative
to the file's folder path. No need to add `js` extension.

```js
const someFile = require('./path/to/some-file');
```

4. Loading the `index.js` file of a folder must have its path
be based relative to the file's folder path.

```js
const someFolder = require('./path/to/some-folder');
```

5. You must load only the methods that you need from a package.

```js
const { someMethod1, someMethod2 } = require('package-name');
```

6. Load order must be all packages installed, then the methods
from all packages installed, then the files, then last are
requires that doesn't need to be saved in a variable.

```js
const packageName = require('package-name');
const { someMethod1, someMethod2 } = require('package-name-two');
const { someMethod3, someMethod4 } = require('./path/to/file');
require('package-name-three');
require('./path/to/file-two');
```

7. If the file exports only a function that will be used only once, use it directly on code.

```js
app.use(require('some-package'));
```

##### When using in Node JS (with a bundler) or on Frontend

1. All loading of packages must be put on top of the file.

```js
import packageName from 'package-name';
import 'package-name-2';
```

2. Loading another file must have its path be based relative
to the file's folder path. No need to add `js` extension.

```js
import someFile from './path/to/some-file';
```

3. Loading the `index.js` file of a folder must have its path
be based relative to the file's folder path.

```js
import someFolder from './path/to/some-folder';
```

4. You must load only the methods that you need from a package.

```js
import { someMethod1, someMethod2 } from 'package-name';
```

5. Load order must be all packages installed, then the methods
from all packages installed, then the files, then last are
requires that doesn't need to be saved in a variable.

```js
import packageName from 'package-name'; // when package uses default
import * as packageNameTwo from 'package-name-two'; // to load methods
import { someMethod1, someMethod2 } from 'package-name-three';
import { someMethod3, someMethod4 } from './path/to/file';
import 'package-name-three';
import './path/to/file-two';
```

##### Naming conventions for importing

Module import names (import * as name) are lowerCamelCase names
that are derived from the imported file name.

```js
// for require
const packageName = require('package-name');

// for import
import * as packageName = require('package-name');
```

Default import names are derived from the imported
file name and follow the rule on identifier type

```js
import MyClass from '../my-class.js';
import myFunction from '../my_function.js';
import SOME_CONSTANT from '../someconstant.js';
```

In general symbols imported via the named import (`import {name}`) should keep the same name.
Avoid aliasing imports (`import {SomeThing as SomeOtherThing}`).
Prefer fixing name collisions by using a module import (`import *`) or renaming the exports themselves.

```js
import * as bigAnimals from './biganimals.js';
import * as domesticatedAnimals from './domesticatedanimals.js';

new bigAnimals.Cat();
new domesticatedAnimals.Cat();
```

If renaming a named import is needed then use components of
the imported module's file name or path in the resulting alias.

```js
import {Cat as BigCat} from './biganimals.js';
import {Cat as DomesticatedCat} from './domesticatedanimals.js';

new BigCat();
new DomesticatedCat();
```

#### Exporting

Symbols are only exported if they are meant to be used outside the module.
Non-exported module-local symbols are not declared `@private` nor do their names end with an underscore.
There is no prescribed ordering for exported and module-local symbols.

##### Named vs Default exports

Use named exports in all code. You can apply the `export` keyword
to a declaration, or use the `export {name};` syntax.

Do not use default exports. Importing modules must give a name to these values,
which can lead to inconsistencies in naming across modules.

```js
// Do not use default exports:
export default class Foo { ... } // BAD!

// Use named exports:
export class Foo { ... }

// Alternate style named exports:
class Foo { ... }

export { Foo };
```

##### Exporting static container classes and objects

Do not export container classes or objects with static methods or properties for the sake of namespacing.

```js
// container.js
// Bad: Container is an exported class that has only static methods and fields.
export class Container {
  /** @return {number} */
  static bar() {
    return 1;
  }
}

/** @const {number} */
Container.FOO = 1;
```

Instead, export individual constants and functions:

```js
/**
 * @description this is the bar function
 * @return {number}
 */
export function bar() {
  return 1;
}

/** @type {number} */
export const FOO = 1;
```

##### Mutability of exports

Exported variables must not be mutated outside of module initialization.

There are alternatives if mutation is needed, including exporting a constant
reference to an object that has mutable fields or exporting accessor functions for mutable data.

```js
// Bad: both foo and mutateFoo are exported and mutated.
export let /** number */ foo = 0;

/**
 * Mutates foo.
 */
export function mutateFoo() {
  ++foo;
}

/**
 * @param {function(number): number} newMutateFoo
 */
export function setMutateFoo(newMutateFoo) {
  // Exported classes and functions can be mutated!
  mutateFoo = () => {
    foo = newMutateFoo(foo);
  };
}
```

Instead...

```js
// Good: Rather than export the mutable variables foo and mutateFoo directly,
// instead make them module scoped and export a getter for foo and a wrapper for
// mutateFooFunc.

/** @type {number} */
let /** number */ foo = 0;

/**
 * @param {number} foo
 * @return {number}
 */
let mutateFooFunc = foo => foo + 1;

/**
 * @return {number}
 */
export function getFoo() {
  return foo;
}

/**
 * @description this mutates foo
 */
export function mutateFoo() {
  foo = mutateFooFunc(foo);
}

/**
 * @description setting the mutateFoo function
 * @param {function(number): number} mutateFoo
 */
export function setMutateFoo(mutateFoo) {
  mutateFooFunc = mutateFoo;
}
```

##### export from

`export from` statements must not be line wrapped and are therefore an exception to the 80-column limit.
This applies to both `export from` flavors.

```js
export { specificName } from './other.js';
export * from './another.js';
```

##### Avoid Circular Dependencies in ES modules

Do not create cycles between ES modules, even though the ECMAScript specification allows this.
Note that it is possible to create cycles with both the import and export statements.

```js
// a.js
import './b.js';

//----------------------
// b.js
import './a.js';

// `export from` can cause circular dependencies too!
export {x} from './c.js';

//----------------------
// c.js
import './b.js';

export let x;
```

## Formatting

**Terminology Note**: block-like construct refers to the body of a class,
function, method, or brace-delimited block of code.
Note that, by Array literals and Object literals, any array or
object literal may optionally be treated as if it were a block-like construct.

### Braces

#### Braces are used for all control structures

Braces are required for all control structures
(i.e. `if`, `else`, `for`, `do`, `while`, as well as any others),
even if the body contains only a single statement.
The first statement of a non-empty block must begin on its own line.

Disallowed:

```js
if (someVeryLongCondition())
  doSomething();

for (let i = 0; i < foo.length; i++) bar(foo[i]);
```

#### Nonempty blocks: K&R style

Braces follow the Kernighan and Ritchie style
([Egyptian brackets](https://blog.codinghorror.com/new-programming-jargon/))
for nonempty blocks and block-like constructs:

- No line break before the opening brace.
- Line break after the opening brace.
- Line break before the closing brace.
- Line break after the closing brace if that brace terminates a statement or
the body of a function or class statement, or a class method.
Specifically, there is no line break after the brace if it is followed by
else, catch, while, or a comma, semicolon, or right-parenthesis.

Example:

```js
class InnerClass {
  constructor() {}

  /**
   * @description some method
   * @param {number} foo
   */
  method(foo) {
    if (condition(foo)) {
      try {
        // Note: this might fail.
        something();
      } catch (err) {
        recover();
      }
    }
  }
}
```

#### Empty blocks: may be concise

An empty block or block-like construct may be closed immediately after it is opened,
with no characters, space, or line break in between (i.e. `{}`), unless it is a part of a multi-block statement
(one that directly contains multiple blocks: `if`/`else` or `try`/`catch`/`finally`).

Example:

```js
function doNothing() {}
```

Disallowed:

```js
if (condition) {
  // …
} else if (otherCondition) {} else {
  // …
}

try {
  // …
} catch (e) {}
```

### Indentation

Indentation for Javascript files must be 2 spaces.

#### Array literals: optionally "block-like"

Any array literal may optionally be formatted as if it were a "block-like construct."
For example, the following are all valid (not an exhaustive list):

```js
const a = [
  0,
  1,
  2,
];

const b =
    [0, 1, 2];

const c = [0, 1, 2];

someMethod(foo, [
  0, 1, 2,
], bar);
```

Other combinations are allowed, particularly when emphasizing semantic groupings between elements,
but should not be used only to reduce the vertical size of larger arrays.

#### Object literals: optionally "block-like"

Any object literal may optionally be formatted as if it were a "block-like construct."
The same examples apply as Array literals: optionally block-like.
For example, the following are all valid (not an exhaustive list):

```js
const a = {
  a: 0,
  b: 1,
};

const b =
    {a: 0, b: 1};

const c = {a: 0, b: 1};

someMethod(foo, {
  a: 0, b: 1,
}, bar);
```

#### Class literals

Class literals (whether declarations or expressions) are indented as blocks.
Do not add semicolons after methods, or after the closing brace of a class declaration
(statements—such as assignments—that contain class expressions are still terminated with a semicolon).
Use the `extends` keyword, but not the `@extends` JSDoc annotation unless the class extends a templatized type.

Example:

```js
class Foo {
  constructor() {
    /** @type {number} */
    this.x = 42;
  }

  /**
   * @return {number}
   */
  method() {
    return this.x;
  }
}
Foo.Empty = class {};
```

```js
/** @extends {Foo<string>} */
foo.Bar = class extends Foo {
  /** @override */
  method() {
    return super.method() / 2;
  }
};

/** @interface */
class Frobnicator {
  /**
   * @description frobnicate function
   * @param {string} message
   */
  frobnicate(message) {}
}
```

#### Function expressions

When declaring an anonymous function in the list of arguments for a function call,
the body of the function is indented two spaces more than the preceding indentation depth.

Example:

```js
prefix.something.reallyLongFunctionName('whatever', (a1, a2) => {
  // Indent the function body +2 relative to indentation depth
  // of the 'prefix' statement one line above.
  if (a1.equals(a2)) {
    someOtherLongFunctionName(a1);
  } else {
    andNowForSomethingCompletelyDifferent(a2.parrot);
  }
});

some.reallyLongFunctionCall(arg1, arg2, arg3)
    .thatsWrapped()
    .then((result) => {
      // Indent the function body +2 relative to the indentation depth
      // of the '.then()' call.
      if (result) {
        result.use();
      }
    });
```

#### Switch statements

As with any other block, the contents of a switch block are indented +2.

After a switch label, a newline appears, and the indentation level is increased +2,
exactly as if a block were being opened. An explicit block may be used if required by lexical scoping.
The following switch label returns to the previous indentation level, as if a block had been closed.

A blank line is optional between a `break` and the following case.

Example:

```js
switch (animal) {
  case Animal.BANDERSNATCH:
    handleBandersnatch();
    break;

  case Animal.JABBERWOCK:
    handleJabberwock();
    break;

  default:
    throw new Error('Unknown animal');
}
```

### Statements

#### One statement per line

Each statement is followed by a line-break.

#### Semicolons are required

Every statement must be terminated with a semicolon. Relying on automatic semicolon insertion is forbidden.

### Column limit: 80

JavaScript code has a column limit of 80 characters. Except as noted below,
any line that would exceed this limit must be line-wrapped, as explained in 4.5 Line-wrapping.

**Exceptions:**

- ES module `import` and `export` from statements (see Imports and export from).
- Lines where obeying the column limit is not possible or would hinder discoverability. Examples include:
  - A long URL which should be clickable in source.
  - A shell command intended to be copied-and-pasted.
  - A long string literal which may need to be copied or searched for wholly (e.g., a long file path).

### Line-wrapping

**Terminology Note**: Line wrapping is breaking a chunk of code into multiple lines to obey column limit,
where the chunk could otherwise legally fit in a single line.

There is no comprehensive, deterministic formula showing exactly how to line-wrap in every situation.
Very often there are several valid ways to line-wrap the same piece of code.

{{< panel status="success" title="Note" >}}While the typical reason for line-wrapping is to avoid overflowing the column limit,
even code that would in fact fit within the column limit may be line-wrapped at the author's discretion.{{</panel>}}

{{< panel status="warning" title="Tip" >}}Extracting a method or
local variable may solve the problem without the need to line-wrap.{{</panel>}}

#### Where to break

The prime directive of line-wrapping is: prefer to break at a higher syntactic level.

Preferred:

```js
currentEstimate =
    calc(currentEstimate + x * currentEstimate) /
        2.0;
```

Discouraged:

```js
currentEstimate = calc(currentEstimate + x *
    currentEstimate) / 2.0;
```

In the preceding example, the syntactic levels from highest to lowest are as follows:
assignment, division, function call, parameters, number constant.

Operators are wrapped as follows:

- When a line is broken at an operator the break comes after the symbol.
(Note that this is not the same practice used in Google style for Java.)
  - This does not apply to the dot (`.`), which is not actually an operator.
- A method or constructor name stays attached to the open parenthesis (() that follows it.
- A comma (`,`) stays attached to the token that precedes it.

{{< panel status="success" title="Note" >}}The primary goal for line wrapping is to have clear code,
not necessarily code that fits in the smallest number of lines.{{</panel>}}

#### Indent continuation lines at least +4 spaces

When line-wrapping, each line after the first (each continuation line)
is indented at least +4 from the original line, unless it falls under the rules of block indentation.

When there are multiple continuation lines, indentation may be varied beyond +4 as appropriate.
In general, continuation lines at a deeper syntactic level are indented by larger multiples of 4,
and two lines use the same indentation level if and only if they begin with syntactically parallel elements.

Horizontal alignment: discouraged addresses the discouraged practice of using a
variable number of spaces to align certain tokens with previous lines.

### Whitespace

#### Vertical whitespace

A single blank line appears:

- Between consecutive methods in a class or object literal
  - Exception: A blank line between two consecutive properties definitions
  in an object literal (with no other code between them) is optional.
  Such blank lines are used as needed to create logical groupings of fields.

- Within method bodies, sparingly to create logical groupings of statements.
Blank lines at the start or end of a function body are not allowed.

- Optionally before the first or after the last method in a class
or object literal (neither encouraged nor discouraged).

- As required by other sections of this document.

Multiple consecutive blank lines are permitted, but never required (nor encouraged).

#### Horizontal whitespace

Use of horizontal whitespace depends on location, and falls into three broad categories:
leading (at the start of a line), trailing (at the end of a line), and internal.
Leading whitespace (i.e., indentation) is addressed elsewhere.
Trailing whitespace is forbidden.

Beyond where required by the language or other style rules, and apart
from literals, comments, and JSDoc, a single internal ASCII space
also appears in the following places only.

- Separating any reserved word (such as `if`, `for`, or `catch`)
except for `function` and `super`, from an open parenthesis (`(`) that follows it on that line.

- Separating any reserved word (such as `else` or `catch`) from a closing curly brace (`}`)
that precedes it on that line.

- Before any open curly brace (`{`), with two exceptions:
  - Before an object literal that is the first argument
  of a function or the first element in an array literal (e.g. `foo({a: [{c: d}]})`).
  - In a template expansion, as it is forbidden by the language
  (e.g. valid: ``ab${1 + 2}cd``, invalid: ``xy$ {3}z``).

- On both sides of any binary or ternary operator.

- After a comma (`,`) or semicolon (`;`). Note that spaces are never allowed before these characters.

- After the colon (`:`) in an object literal.

- On both sides of the double slash (`//`) that begins an end-of-line comment.
Here, multiple spaces are allowed, but not required.

- After an open-block comment character and on both sides of close characters
(e.g. for short-form type declarations, casts, and parameter name comments:
`this.foo = /** @type {number} */ (bar);` or `function(/** string */ foo) {; or baz(/* buzz= */ true)`).

#### Horizontal alignment: discouraged

Terminology Note: Horizontal alignment is the practice of adding a variable number of additional spaces in your code with the goal of making certain tokens appear directly below certain other tokens on previous lines.

This practice is permitted, but it is generally discouraged by Google Style. It is not even required to maintain horizontal alignment in places where it was already used.

Here is an example without alignment, followed by one with alignment. Both are allowed, but the latter is discouraged:

```js
{
  tiny: 42, // this is great
  longer: 435, // this too
};

{
  tiny:   42,  // permitted, but future edits
  longer: 435, // may leave it unaligned
};
```

{{< panel status="warning" title="Tip" >}}Alignment can aid readability,
but it creates problems for future maintenance.
Consider a future change that needs to touch just one line. This change may leave
the formerly-pleasing formatting mangled, and that is allowed.
More often it prompts the coder (perhaps you) to adjust whitespace on nearby lines as well,
possibly triggering a cascading series of reformattings. That one-line change now has a blast radius.
This can at worst result in pointless busywork, but at best it still corrupts version history information,
slows down reviewers and exacerbates merge conflicts.{{</panel>}}

#### Function Arguments

Prefer to put all function arguments on the same line as the function name.
If doing so would exceed the 80-column limit, the arguments must be line-wrapped in a readable way.
To save space, you may wrap as close to 80 as possible,
or put each argument on its own line to enhance readability.
Indentation should be four spaces. Aligning to the parenthesis is allowed, but discouraged.
Below are the most common patterns for argument wrapping:

```js
// Arguments start on a new line, indented four spaces. Preferred when the
// arguments don't fit on the same line with the function name (or the keyword
// "function") but fit entirely on the second line. Works with very long
// function names, survives renaming without reindenting, low on space.
doSomething(
    descriptiveArgumentOne, descriptiveArgumentTwo, descriptiveArgumentThree) {
  // …
}

// If the argument list is longer, wrap at 80. Uses less vertical space,
// but violates the rectangle rule and is thus not recommended.
doSomething(veryDescriptiveArgumentNumberOne, veryDescriptiveArgumentTwo,
    tableModelEventHandlerProxy, artichokeDescriptorAdapterIterator) {
  // …
}

// Four-space, one argument per line.  Works with long function names,
// survives renaming, and emphasizes each argument.
doSomething(
    veryDescriptiveArgumentNumberOne,
    veryDescriptiveArgumentTwo,
    tableModelEventHandlerProxy,
    artichokeDescriptorAdapterIterator) {
  // …
}
```

### Grouping parentheses: recommended

Optional grouping parentheses are omitted only when the author
and reviewer agree that there is no reasonable chance that the
code will be misinterpreted without them, nor would they have made the code easier to read.
It is not reasonable to assume that every reader has the entire operator precedence table memorized.

Do not use unnecessary parentheses around the entire expression
following `delete`, `typeof`, `void`, `return`, `throw`, `case`, `in`, `of`, or `yield`.

Parentheses are required for type casts: `/** @type {Foo} */ (foo)`.

### Comments

This section addresses implementation comments. JSDoc is addressed separately in JSDoc.

#### Block comment style

Block comments are indented at the same level as the surrounding code.
They may be in `/* … */` or `//`-style. For multi-line `/* … */` comments,
subsequent lines must start with * aligned with the * on the previous line,
to make comments obvious with no extra context.

```js
/*
 * This is
 * okay.
 */

// And so
// is this.

/* This is fine, too. */
```

Comments are not enclosed in boxes drawn with asterisks or other characters.

Do not use JSDoc (`/** … */`) for implementation comments.

#### Parameter Name Comments

"Parameter name" comments should be used whenever the value and
method name do not sufficiently convey the meaning, and refactoring
the method to be clearer is infeasible.
Their preferred format is before the value with "=":

```js
someFunction(obviousParam, /* shouldRender= */ true, /* name= */ 'hello');
```

For consistency with surrounding code you may put them after the value without =:

```js
someFunction(obviousParam, true /* shouldRender */, 'hello' /* name */);
```

## Language features

JavaScript includes many dubious (and even dangerous) features.
This section delineates which features may or may not be used,
and any additional constraints on their use.

### Local variable declarations

#### Use `const` and `let`

Declare all local variables with either `const` or `let`.
Use `const` by default, unless a variable needs to be reassigned.
The `var` keyword must not be used.

#### One variable per declaration

Every local variable declaration declares only one variable:
declarations such as `let a = 1, b = 2;` are not used.

#### No unused variables

No unused variables

```js
function myFunction () {
  const result = something()   // ✗ avoid
}
```

#### Declared when needed, initialized as soon as possible

Local variables are not habitually declared at the start of
their containing block or block-like construct. Instead, local variables
are declared close to the point they are first used (within reason), to minimize their scope.

#### Declare types as needed

JSDoc type annotations may be added either on the line above the declaration,
or else inline before the variable name if no other JSDoc is present.

Example:

```js
/** @type Array<number> */
const data = [];

/**
 * @description Some description.
 * @type {Array<number>}
 */
const data = [];
```

Mixing inline and JSDoc styles is not allowed:

```js
/** Some description. */
const /** Array<number> */ data = [];
```

{{< panel status="warning" title="Tip">}}There are many cases where the compiler
can infer a templatized type but not its parameters.
This is particularly the case when the initializing literal or constructor
call does not include any values of the template parameter type
(e.g., empty arrays, objects, Maps, or Sets), or if the variable is modified in a closure.
Local variable type annotations are particularly helpful in these cases since otherwise
the compiler will infer the template parameter as unknown.{{</panel>}}

### Array literals

#### Use trailing commas

This is one of the things that we differ from the Google Style Docs.

**Do not include** a trailing comma whenever there is a line break
between the final element and the closing bracket.

Example:

```js
const values = [
  'first value',
  'second value'
];
```

#### Do not use the variadic Array constructor

The constructor is error-prone if arguments are added or removed. Use a literal instead.

Disallowed:

```js
const a1 = new Array(x1, x2, x3);
const a2 = new Array(x1, x2);
const a3 = new Array(x1);
const a4 = new Array();
```

This works as expected except for the third case:
if x1 is a whole number then a3 is an array of size x1 where all elements are undefined.
If x1 is any other number, then an exception will be thrown,
and if it is anything else then it will be a single-element array.

Instead, write

```js
const a1 = [x1, x2, x3];
const a2 = [x1, x2];
const a3 = [x1];
const a4 = [];
```

Explicitly allocating an array of a given length using `new Array(length)` is allowed when appropriate.

#### Non-numeric properties

Do not define or use non-numeric properties on an array (other than `length`). Use a `Map` (or `Object`) instead.

#### Destructuring

Array literals may be used on the left-hand side of an assignment
to perform destructuring (such as when unpacking multiple values from a single array or iterable).
A final rest element may be included (with no space between the ... and the variable name).
Elements should be omitted if they are unused.

```js
const [a, b, c, ...rest] = generateResults();
let [, b,, d] = someArray;
```

Destructuring may also be used for function parameters
(note that a parameter name is required but ignored).
Always specify [] as the default value if a destructured array parameter is optional,
and provide default values on the left hand side:

```js
/**
 * @describe this is an optional destructuring function
 * @param {Array<number>=} param1
 */
function optionalDestructuring([a = 4, b = 2] = []) { … };
```

Disallowed:

```js
function badDestructuring([a, b] = [4, 2]) { … };
```

{{< panel status="warning" title="Tip" >}}For (un)packing multiple values
into a function’s parameter or return, prefer object destructuring to array destructuring when possible,
as it allows naming the individual elements and specifying a different type for each.{{</panel>}}

#### Spread operator

Array literals may include the spread operator (`...`)
to flatten elements out of one or more other iterables.
The spread operator should be used instead of more awkward constructs with `Array.prototype`.
There is no space after the `...`.

### Object literals

#### Use trailing commas

This is one of the things that we differ from the Google Style Docs.

Same as the Array trailing commas, Do not include a trailing comma whenever
there is a line break between the final property and the closing brace.

#### Do not use the `Object` constructor

While `Object` does not have the same problems as `Array`,
it is still disallowed for consistency. Use an object literal (`{}` or `{a: 0, b: 1, c: 2}`) instead.

#### Do not mix quoted and unquoted keys

Object literals may represent either structs
(with unquoted keys and/or symbols) or dicts (with quoted and/or computed keys).
Do not mix these key types in a single object literal.

Disallowed:

```js
{
  width: 42, // struct-style unquoted key
  'maxWidth': 43, // dict-style quoted key
}
```

This also extends to passing the property name to functions, like hasOwnProperty.
In particular, doing so will break in compiled code because
the compiler cannot rename/obfuscate the string literal.

Disallowed:

```js
/** @type {{width: number, maxWidth: (number|undefined)}} */
const o = {width: 42};
if (o.hasOwnProperty('maxWidth')) {
  ...
}
```

This is best implemented as:

```js
/** @type {{width: number, maxWidth: (number|undefined)}} */
const o = {width: 42};
if (o.maxWidth != null) {
  ...
}
```

#### Computed property names

Computed property names (e.g., `{['key' + foo()]: 42}`) are allowed,
and are considered dict-style (quoted) keys (i.e., must not be mixed with non-quoted keys)
unless the computed property is a symbol (e.g., `[Symbol.iterator]`).
Enum values may also be used for computed keys, but should not be mixed with non-enum keys in the same literal.

#### Method shorthand

Methods can be defined on object literals using the method shorthand
(`{method() {… }}`) in place of a colon immediately followed by a function or arrow function literal.

Example:

```js
return {
  stuff: 'candy',
  method() {
    return this.stuff;  // Returns 'candy'
  },
};
```

Note that this in a method shorthand or function refers to the object literal itself whereas this in an arrow function refers to the scope outside the object literal.

Example:

```js
class {
  getObjectLiteral() {
    this.stuff = 'fruit';
    return {
      stuff: 'candy',
      method: () => this.stuff,  // Returns 'fruit'
    };
  }
}
```

#### Shorthand properties

Shorthand properties are allowed on object literals.

Example:

```js
const foo = 1;
const bar = 2;
const obj = {
  foo,
  bar,
  method() { return this.foo + this.bar; },
};
assertEquals(3, obj.method());
```

#### Destructuring

Object destructuring patterns may be used on the left-hand side of an assignment
to perform destructuring and unpack multiple values from a single object.

Destructured objects may also be used as function parameters,
but should be kept as simple as possible: a single level of unquoted shorthand properties.
Deeper levels of nesting and computed properties may not be used in parameter destructuring.
Specify any default values in the left-hand-side of the destructured parameter
(`{str = 'some default'} = {}`, rather than `{str} = {str: 'some default'})`,
and if a destructured object is itself optional, it must default to {}.
The JSDoc for the destructured parameter may be given any name (the name is unused but is required by the compiler).

Example:

```js
/**
 * @param {string} ordinary
 * @param {{num: (number|undefined), str: (string|undefined)}=} param1
 *     num: The number of times to do something.
 *     str: A string to do stuff to.
 */
function destructured(ordinary, { num, str = 'some default' } = {})
```

Disallowed:

```js
/** @param {{x: {num: (number|undefined), str: (string|undefined)}}} param1 */
function nestedTooDeeply({x: {num, str}}) {};

/** @param {{num: (number|undefined), str: (string|undefined)}=} param1 */
function nonShorthandProperty({num: a, str: b} = {}) {};

/** @param {{a: number, b: number}} param1 */
function computedKey({a, b, [a + b]: c}) {};

/** @param {{a: number, b: string}=} param1 */
function nontrivialDefault({a, b} = {a: 2, b: 4}) {};
```

#### Enums

Enumerations are defined by adding the @enum annotation to an object literal.
Additional properties may not be added to an enum after it is defined.
Enums must be constant, and all enum values must be deeply immutable.

```js
/**
 * Supported temperature scales.
 * @enum {string}
 */
const TemperatureScale = {
  CELSIUS: 'celsius',
  FAHRENHEIT: 'fahrenheit',
};

/**
 * An enum with two options.
 * @enum {number}
 */
const Option = {
  /** The option used shall have been the first. */
  FIRST_OPTION: 1,
  /** The second among two options. */
  SECOND_OPTION: 2,
};
```

### Classes

#### Constructors

Constructors are optional. Subclass constructors must call `super()`
before setting any fields or otherwise accessing this.
Interfaces should declare non-method properties in the constructor.

#### Fields

Set all of a concrete object’s fields (i.e. all properties other than methods) in the constructor.
Annotate fields that are never reassigned with `@const` (these need not be deeply immutable).
Annotate non-public fields with the proper visibility annotation (`@private`, `@protected`, `@package`),
and end all `@private` fields' names with an underscore. Fields are never set on a concrete class' prototype.

Example:

```js
class Foo {
  constructor() {
    /** @private @const {Bar} */
    this.bar_ = computeBar();

    /** @protected @const {Baz} */
    this.baz = computeBaz();
  }
}
```

{{< panel status="warning" title="Tip">}}Properties should never be added to or
removed from an instance after the constructor is finished,
since it significantly hinders VMs’ ability to optimize.
If necessary, fields that are initialized later should be explicitly
set to `undefined` in the constructor to prevent later shape changes.
Adding `@struct` to an object will check that undeclared properties are not added/accessed.
Classes have this added by default. {{</panel>}}

#### Computed properties

Computed properties may only be used in classes when the property is a symbol.
Dict-style properties (that is, quoted or computed non-symbol keys,
as defined in Do not mix quoted and unquoted keys) are not allowed.
A `[Symbol.iterator]` method should be defined for any classes that are logically iterable.
Beyond this, `Symbol` should be used sparingly.

{{< panel status="warning" title="Tip">}}be careful of using any other built-in symbols
(e.g., Symbol.isConcatSpreadable) as they are not polyfilled
by the compiler and will therefore not work in older browsers.{{</panel>}}

#### Static methods

Where it does not interfere with readability,
prefer module-local functions over private static methods.

Static methods should only be called on the base class itself.
Static methods should not be called on variables containing
a dynamic instance that may be either the constructor or
a subclass constructor (and must be defined with `@nocollapse` if this is done),
and must not be called directly on a subclass that doesn’t define the method itself.

Disallowed:

```js
class Base { /** @nocollapse */ static foo() {} }
class Sub extends Base {}
function callFoo(cls) { cls.foo(); }  // discouraged: don't call static methods dynamically
Sub.foo();  // Disallowed: don't call static methods on subclasses that don't define it themselves
```

#### Old-style class declarations

While ES6 classes are preferred, there are cases where ES6 classes may not be feasible.
For example:

- If there exist or will exist subclasses, including frameworks that create subclasses,
that cannot be immediately changed to use ES6 class syntax. If such a class were to use ES6 syntax,
all downstream subclasses not using ES6 class syntax would need to be modified.

- Frameworks that require a known `this` value before calling the superclass constructor,
since constructors with ES6 super classes do not have access to the instance `this` value until the call to `super` returns.

In all other ways the style guide still applies to this code:
`let`, `const`, default parameters, rest, and arrow functions should all be used when appropriate.

#### Do not manipulate `prototype`s directly

The `class` keyword allows clearer and more readable class definitions than defining `prototype` properties.
Ordinary implementation code has no business manipulating these objects,
though they are still useful for defining classes as defined in Old-style class declarations.
Mixins and modifying the prototypes of builtin objects are explicitly forbidden.

**Exception**: Framework code (such as Polymer, or Angular) may need to use `prototype`s,
and should not resort to even-worse workarounds to avoid doing so.

#### Getters and Setters

Do not use [JavaScript getter and setter properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get).
They are potentially surprising and difficult to reason about,
and have limited support in the compiler. Provide ordinary methods instead.

**Exception**: there are situations where defining a getter or setter is unavoidable
(e.g. data binding frameworks such as Angular and Polymer,
or for compatibility with external APIs that cannot be adjusted).
In these cases only, getters and setters may be used with caution,
provided they are defined with the get and set shorthand method keywords
or `Object.defineProperties` (not `Object.defineProperty`, which interferes with property renaming).
Getters must not change observable state.

Disallowed:

```js
class Foo {
  get next() { return this.nextId++; }
}
```

#### Overriding `toString`

The `toString` method may be overridden, but must always succeed and never have visible side effects.

{{< panel status="warning" title="Tip">}}Beware, in particular, of calling other methods from toString,
since exceptional conditions could lead to infinite loops.{{</panel>}}

#### Interfaces

Interfaces may be declared with `@interface` or `@record`.
Interfaces declared with `@record` can be explicitly (i.e. via `@implements`)
or implicitly implemented by a class or object literal.

All non-static method bodies on an interface must be empty blocks.
Fields must be declared as uninitialized members in the class constructor.

Example:

```js
/**
 * Something that can frobnicate.
 * @record
 */
class Frobnicator {
  constructor() {
    /** @type {number} The number of attempts before giving up. */
    this.attempts;
  }

  /**
   * Performs the frobnication according to the given strategy.
   * @param {FrobnicationStrategy} strategy
   */
  frobnicate(strategy) {}
}
```

#### Abstract Classes

Use abstract classes when appropriate. Abstract classes and methods must be annotated with `@abstract`.

### Functions

#### Top-level functions

Top-level functions may be defined directly on the `exports` object, or else declared locally and optionally exported.

Examples:

```js
/**
 * @description process string
 * @param {string} str
 */
exports.processString = (str) => {
  // Process the string.
};

/**
 * @description process string
 * @param {string} str
 */
const processString = (str) => {
  // Process the string.
};

exports = { processString };
```

#### Nested functions and closures

Functions may contain nested function definitions.
If it is useful to give the function a name, it should be assigned to a local `const`.

#### Arrow functions

Arrow functions provide a concise function syntax and simplify scoping this for nested functions.
Prefer arrow functions over the function keyword, particularly for nested functions. (See Method shorthand)

Prefer arrow functions over other this scoping approaches such as `f.bind(this)` and `const self = this`.
Arrow functions are particularly useful for calling into callbacks as they permit
explicitly specifying which parameters to pass to the callback whereas binding will blindly pass along all parameters.

The left-hand side of the arrow contains zero or more parameters.
Parentheses around the parameters are optional if there is only a single non-destructured parameter.
When parentheses are used, inline parameter types may be specified (see Method and function comments).

{{< panel status="warning" title="Tip">}}Always using parentheses even for single-parameter
arrow functions can avoid situations where adding parameters, but forgetting to add parentheses,
may result in parseable code which no longer works as intended.{{</panel>}}

The right-hand side of the arrow contains the body of the function.
By default the body is a block statement (zero or more statements surrounded by curly braces).
The body may also be an implicitly returned single expression if either:
the program logic requires returning a value, or the `void` operator precedes
a single function or method call (using `void` ensures `undefined` is returned,
prevents leaking values, and communicates intent).
The single expression form is preferred if it improves readability (e.g., for short or simple expressions).

Examples:

```js
/**
 * @description Arrow functions can be documented just like normal functions.
 * @param {number} numParam A number to add.
 * @param {string} strParam Another number to add that happens to be a string.
 * @return {number} The sum of the two parameters.
 */
const moduleLocalFunc = (numParam, strParam) => numParam + Number(strParam);

// Uses the single expression syntax with `void` because the program logic does
// not require returning a value.
getValue((result) => void alert(`Got ${result}`));

class CallbackExample {
  constructor() {
    /** @private {number} */
    this.cachedValue_ = 0;

    // For inline callbacks, you can use inline typing for parameters.
    // Uses a block statement because the value of the single expression should
    // not be returned and the expression is not a single function call.
    getNullableValue((/** ?number */ result) => {
      this.cachedValue_ = result == null ? 0 : result;
    });
  }
}
```

Disallowed:

```js
/**
 * A function with no params and no returned value.
 * This single expression body usage is illegal because the program logic does
 * not require returning a value and we're missing the `void` operator.
 */
const moduleLocalFunc = () => anotherFunction();
```

#### Generators

Generators enable a number of useful abstractions and may be used as needed.

When defining generator functions, attach the * to the function keyword when present, and separate it with a space from the name of the function. When using delegating yields, attach the * to the yield keyword.

Example:

```js
/** @return {Iterator<number>} */
function* gen1() {
  yield 42;
}

/** @return {Iterator<number>} */
const gen2 = function*() {
  yield* gen1();
}

class SomeClass {
  /** @return {Iterator<number>} */
  * gen() {
    yield 42;
  }
}
```

#### Parameter and return types

Function parameters and return types should usually be documented with JSDoc annotations.
See Method and function comments for more information.

##### Default parameters

Optional parameters are permitted using the equals operator in the parameter list.
Optional parameters must include spaces on both sides of the equals operator,
be named exactly like required parameters (i.e., not prefixed with `opt_`),
use the `=` suffix in their JSDoc type, come after required parameters,
and not use initializers that produce observable side effects.
All optional parameters for concrete functions must have default values,
even if that value is `undefined`. In contrast to concrete functions,
abstract and interface methods must omit default parameter values.

Example:

```js
/**
 * @description some description
 * @param {string} required This parameter is always needed.
 * @param {string=} optional This parameter can be omitted.
 * @param {Node=} node Another optional parameter.
 */
function maybeDoSomething(required, optional = '', node = undefined) {}

/** @interface */
class MyInterface {
  /**
   * Interface and abstract methods must omit default parameter values.
   * @param {string=} optional
   */
  someMethod(optional) {}
}
```

Use default parameters sparingly. Prefer destructuring (as in Destructuring)
to create readable APIs when there are more than a small handful of optional parameters that do not have a natural order.

{{< panel status="success" title="Note" >}}Unlike Python's default parameters,
it is okay to use initializers that return new mutable objects
(such as `{}` or `[]`) because the initializer is evaluated each time the default value is used,
so a single object won't be shared across invocations.{{</panel>}}

{{< panel status="warning" title="Tip" >}}While arbitrary expressions
including function calls may be used as initializers,
these should be kept as simple as possible.
Avoid initializers that expose shared mutable state,
as that can easily introduce unintended coupling between function calls.{{</panel>}}

##### Rest parameters

Use a rest parameter instead of accessing `arguments`.
Rest parameters are typed with a `...` prefix in their JSDoc.
The rest parameter must be the last parameter in the list.
There is no space between the `...` and the parameter name.
Do not name the rest parameter `var_args`.
Never name a local variable or parameter arguments, which confusingly shadows the built-in name.

Example:

```js
/**
 * @param {Array<string>} array This is an ordinary parameter.
 * @param {...number} numbers The remainder of arguments are all numbers.
 */
function variadic(array, ...numbers) {}
```

#### Spread operator

Function calls may use the spread operator (`...`).
Prefer the spread operator to `Function.prototype.apply` when an array or
iterable is unpacked into multiple parameters of a variadic function.
There is no space after the `...`.

Example:

```js
function myFunction(...elements) {}
myFunction(...array, ...iterable, ...generator());
```

### String literals

#### Use single quotes

Ordinary string literals are delimited with single quotes (`'`), rather than double quotes (`"`).

{{< panel status="warning" title="Tip" >}}if a string contains a single quote character,
consider using a template string to avoid having to escape the quote.{{</panel>}}

Ordinary string literals may not span multiple lines.

#### Template literals

Use template literals (delimited with `) over complex string concatenation,
particularly if multiple string literals are involved.
Template literals may span multiple lines.

If a template literal spans multiple lines,
it does not need to follow the indentation of the enclosing block,
though it may if the added whitespace does not matter.

Example:

```js
function arithmetic(a, b) {
  return `Here is a table of arithmetic operations:
${a} + ${b} = ${a + b}
${a} - ${b} = ${a - b}
${a} * ${b} = ${a * b}
${a} / ${b} = ${a / b}`;
}
```

#### No line continuations

Do not use line continuations (that is, ending a line inside a string literal with a backslash)
in either ordinary or template string literals. Even though ES5 allows this,
it can lead to tricky errors if any trailing whitespace comes after the slash, and is less obvious to readers.

Disallowed:

```js
const longString = 'This is a very long string that far exceeds the 80 \
    column limit. It unfortunately contains long stretches of spaces due \
    to how the continued lines are indented.';
```

Instead, write

```js
const longString = 'This is a very long string that far exceeds the 80 ' +
    'column limit. It does not contain long stretches of spaces since ' +
    'the concatenated strings are cleaner.';
```

### Number literals

Numbers may be specified in decimal, hex, octal, or binary.
Use exactly `0x`, `0o`, and `0b` prefixes, with lowercase letters,
for hex, octal, and binary, respectively.
Never include a leading zero unless it is immediately followed by `x`, `o`, or `b`.

### Control structures

#### For loops

With ES6, the language now has three different kinds of `for` loops.
All may be used, though `for`-`of` loops should be preferred when possible.

`for`-`in` loops may only be used on dict-style objects
(see Do not mix quoted and unquoted keys),
and should not be used to iterate over an array.
`Object.prototype.hasOwnProperty` should be used in `for`-`in` loops to exclude unwanted prototype properties.
Prefer `for`-`of` and `Object.keys` over `for`-`in` when possible.

#### Exceptions

Exceptions are an important part of the language and should be used whenever exceptional cases occur.
Always throw `Errors` or subclasses of `Error`: never throw string literals or other objects.
Always use `new` when constructing an `Error`.

This treatment extends to `Promise` rejection values as
`Promise.reject(obj)` is equivalent to `throw obj`; in async functions.

Custom exceptions provide a great way to convey additional error information from functions.
They should be defined and used wherever the native `Error` type is insufficient.

Prefer throwing exceptions over ad-hoc error-handling approaches
(such as passing an error container reference type, or returning an object with an error property).

##### Empty catch blocks

It is very rarely correct to do nothing in response to a caught exception.
When it truly is appropriate to take no action whatsoever in a catch block,
the reason this is justified is explained in a comment.

```js
try {
  return handleNumericResponse(response);
} catch (ok) {
  // it's not numeric; that's fine, just continue
}
return handleTextResponse(response);
```

Disallowed:

```js
  try {
    shouldFail();
    fail('expected an error');
  } catch (expected) {
  }
```

{{< panel status="warning" title="Tip" >}}Unlike in some other languages,
patterns like the above simply don’t work since this will catch the error thrown by `fail`.
Use `assertThrows()` instead.{{</panel>}}

#### Switch statements

**Terminology Note**: Inside the braces of a switch block are one or more statement groups.
Each statement group consists of one or more switch labels (either `case FOO:` or `default:`),
followed by one or more statements.

##### Fall-through: commented

Within a switch block, each statement group either terminates abruptly
(with a `break`, `return` or `thrown` exception), or is marked with a comment
to indicate that execution will or might continue into the next statement group.
Any comment that communicates the idea of fall-through is sufficient (typically `// fall through`).
This special comment is not required in the last statement group of the switch block.

Example:

```js
switch (input) {
  case 1:
  case 2:
    prepareOneOrTwo();
  // fall through
  case 3:
    handleOneTwoOrThree();
    break;
  default:
    handleLargeNumber(input);
}
```

##### The `default` case is present

Each switch statement includes a `default` statement group,
even if it contains no code. The `default` statement group must be last.

### `this`

Only use `this` in class constructors and methods,
in arrow functions defined within class constructors and methods,
or in functions that have an explicit `@this` declared in the immediately-enclosing function’s JSDoc.

Never use `this` to refer to the global object, the context of an `eval`,
the target of an event, or unnecessarily `call()`ed or `apply()`ed functions.

### Equality Checks

Use identity operators (`===`/`!==`) except in the cases documented below.

#### Exceptions Where Coercion is Desirable

Catching both `null` and `undefined` values:

```js
if (someObjectOrPrimitive == null) {
  // Checking for null catches both null and undefined for objects and
  // primitives, but does not catch other falsy values like 0 or the empty
  // string.
}
```

### Disallowed features

#### `with`

Do not use the `with` keyword. It makes your code harder to understand and has been banned in strict mode since ES5.

#### Dynamic code evaluation

Do not use `eval` or the `Function(...string)` constructor (except for code loaders).
These features are potentially dangerous and simply do not work in CSP environments.

#### Automatic semicolon insertion

Always terminate statements with semicolons (except function and class declarations, as noted above).

#### Non-standard features

Do not use non-standard features. This includes old features that have been removed (e.g., WeakMap.clear),
new features that are not yet standardized (e.g., the current TC39 working draft, proposals at any stage,
or proposed but not-yet-complete web standards), or proprietary features that are only implemented in some browsers.
Use only features defined in the current ECMA-262 or WHATWG standards.
(Note that projects writing against specific APIs, such as Chrome extensions or Node.js, can obviously use those APIs).
Non-standard language “extensions” (such as those provided by some external transpilers) are forbidden.

##### Exceptions

- [Javascript Decorators](https://github.com/tc39/proposal-decorators)
- [Javascript Class Properties](https://github.com/tc39/proposal-class-fields)

#### Wrapper objects for primitive types

Never use new on the primitive object wrappers (`Boolean`, `Number`, `String`, `Symbol`), nor include them in type annotations.

Disallowed:

```js
const /** Boolean */ x = new Boolean(false);
if (x) alert(typeof x);  // alerts 'object' - WAT?
```

The wrappers may be called as functions for coercing (which is preferred over using + or concatenating the empty string) or creating symbols.

Example:

```js
const /** boolean */ x = Boolean(0);
if (!x) alert(typeof x);  // alerts 'boolean', as expected
```

#### Modifying builtin objects

Never modify builtin types, either by adding methods to their constructors or to their prototypes.
Avoid depending on libraries that do this.

Do not add symbols to the global object unless absolutely necessary (e.g. required by a third-party API).

#### Omitting `()` when invoking a constructor

Never invoke a constructor in a new statement without using parentheses `()`.

Disallowed:

```js
new Foo;
```

Use instead:

```js
new Foo();
```

Omitting parentheses can lead to subtle mistakes. These two lines are not equivalent:

```js
new Foo().Bar();
new Foo.Bar();
```

## Naming

### Rules common to all identifiers

Identifiers use only ASCII letters and digits, and, in a small number of cases noted below,
underscores and very rarely (when required by frameworks like Angular) dollar signs.

Give as descriptive a name as possible, within reason.
Do not worry about saving horizontal space as it is far more important
to make your code immediately understandable by a new reader.
Do not use abbreviations that are ambiguous or unfamiliar to readers outside your project,
and do not abbreviate by deleting letters within a word.

```js
errorCount          // No abbreviation.
dnsConnectionIndex  // Most people know what "DNS" stands for.
referrerUrl         // Ditto for "URL".
customerId          // "Id" is both ubiquitous and unlikely to be misunderstood.
```

Disallowed:

```js
n                   // Meaningless.
nErr                // Ambiguous abbreviation.
nCompConns          // Ambiguous abbreviation.
wgcConnections      // Only your group knows what this stands for.
pcReader            // Lots of things can be abbreviated "pc".
cstmrId             // Deletes internal letters.
kSecondsPerDay      // Do not use Hungarian notation.
```

### Rules by identifier type

#### Package names

Package names are all `lowerCamelCase`. For example, `my.exampleCode.deepSpace`,
but not `my.examplecode.deepspace` or `my.example_code.deep_space`.

#### Class names

Class, interface, record, and typedef names are written in `UpperCamelCase`.
Unexported classes are simply locals: they are not marked `@private` and therefore are not named with a trailing underscore.

Type names are typically nouns or noun phrases. For example, `Request`, `ImmutableList`, or `VisibilityMode`.
Additionally, interface names may sometimes be adjectives or adjective phrases instead (for example, `Readable`).

#### Method names

Method names are written in `lowerCamelCase`. Names for `@private` methods must end with a trailing underscore.

Method names are typically verbs or verb phrases. For example, `sendMessage` or `stop_`.
Getter and setter methods for properties are never required,
but if they are used they should be named `getFoo`
(or optionally `isFoo` or `hasFoo` for booleans), or `setFoo(value)` for setters.

Underscores may also appear in JsUnit test method names to separate logical components of the name.
One typical pattern is `test<MethodUnderTest>_<state>_<expectedOutcome>`, for example `testPop_emptyStack_throws`.
There is no One Correct Way to name test methods.

#### Enum names

Enum names are written in `UpperCamelCase`, similar to classes,
and should generally be singular nouns. Individual items within the enum are named in `CONSTANT_CASE`.

#### Constant names

Constant names use `CONSTANT_CASE`: all uppercase letters, with words separated by underscores.
There is no reason for a constant to be named with a trailing underscore,
since private static properties can be replaced by (implicitly private) module locals.

##### Definition of “constant”

Every constant is a `@const` static property or a module-local const declaration,
but not all @const static properties and module-local consts are constants.
Before choosing constant case, consider whether the field really feels like a deeply immutable constant.
For example, if any of that instance's observable state can change,
it is almost certainly not a constant. Merely intending to never mutate the object is generally not enough.

Examples:

```js
// Constants
const NUMBER = 5;
/** @const */ exports.NAMES = ImmutableList.of('Ed', 'Ann');
/** @enum */ exports.SomeEnum = { ENUM_CONSTANT: 'value' };

// Not constants
let letVariable = 'non-const';
class MyClass { constructor() { /** @const {string} */ this.nonStatic = 'non-static'; } };
/** @type {string} */ MyClass.staticButMutable = 'not @const, can be reassigned';
const /** Set<string> */ mutableCollection = new Set();
const /** ImmutableSet<SomeMutableType> */ mutableElements = ImmutableSet.of(mutable);
const Foo = goog.require('my.Foo');  // mirrors imported name
const logger = log.getLogger('loggers.are.not.immutable');
```

Constants’ names are typically nouns or noun phrases.

##### Local aliases

Local aliases should be used whenever they improve readability over fully-qualified names.

Examples:

```js
const staticHelper = importedNamespace.staticHelper;
const CONSTANT_NAME = ImportedClass.CONSTANT_NAME;
const {assert, assertInstanceof} = asserts;
```

####  Non-constant field names

Non-constant field names (static or otherwise) are written in `lowerCamelCase`,
with a trailing underscore for private fields.

These names are typically nouns or noun phrases. For example, `computedValues` or `index_`.

#### Parameter names

Parameter names are written in `lowerCamelCase`. Note that this applies even if the parameter expects a constructor.

One-character parameter names should not be used in public methods.

**Exception**: When required by a third-party framework,
parameter names may begin with a `$`. This exception does not apply to any other identifiers
(e.g. local variables or properties).

#### Local variable names

Local variable names are written in `lowerCamelCase`,
except for module-local (top-level) constants, as described above.
Constants in function scopes are still named in `lowerCamelCase`.
Note that `lowerCamelCase` is used even if the variable holds a constructor.

#### Template parameter names

Module-local names that are not exported are implicitly private.
They are not marked `@private` and do not end in an underscore.
This applies to classes, functions, variables, constants, enums, and other module-local identifiers.

### Camel case: defined

Sometimes there is more than one reasonable way to convert an
English phrase into camel case, such as when acronyms or unusual constructs like IPv6 or iOS are present.
To improve predictability, This style specifies the following (nearly) deterministic scheme.

Beginning with the prose form of the name:

- Convert the phrase to plain ASCII and remove any apostrophes.
For example, Müller's algorithm might become Muellers algorithm.

- Divide this result into words, splitting on spaces and any remaining punctuation (typically hyphens).
  - Recommended: if any word already has a conventional camel case appearance in common usage,
  split this into its constituent parts (e.g., AdWords becomes ad words).
  Note that a word such as iOS is not really in camel case per se;
  it defies any convention, so this recommendation does not apply.

- Now lowercase everything (including acronyms), then uppercase only the first character of:
  - … each word, to yield upper camel case, or
  - … each word except the first, to yield lower camel case
- Finally, join all the words into a single identifier.

Note that the casing of the original words is almost entirely disregarded.

Examples:

| Prose form | Correct | Incorrect |
|:-:|:-:|:-:|
| "XML HTTP request" | XmlHttpRequest	| XMLHTTPRequest |
| new customer ID |	newCustomerId	| newCustomerID |
| inner stopwatch	| innerStopwatch | innerStopWatch |
| supports IPv6 on iOS?	| supportsIpv6OnIos | supportsIPv6OnIOS |
| YouTube importer | YouTubeImporter | YoutubeImporter* |

*Acceptable, but not recommended.

{{< panel status="success" title="Note" >}}Some words are ambiguously hyphenated
in the English language: for example nonempty and non-empty are both correct,
so the method names checkNonempty and checkNonEmpty are likewise both correct.{{</panel>}}

## JSDoc

[JSDoc](https://jsdoc.app/) is used on all classes, fields, and methods.

This is used to use the [Typescript for Javascript](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html).
This allows us to make sure our code is a bit more predictable by using predictable types.

### General form

The basic formatting of JSDoc blocks is as seen in this example:

```js
/**
 * @description Multiple lines of JSDoc text are written here,
 * wrapped normally.
 * @param {number} arg A number to do something to.
 */
function doSomething(arg) { … }
```

or in this single-line example:

```js
/** @const @private {Foo} A short bit of JSDoc. */
this.foo_ = foo;
```

If a single-line comment overflows into multiple lines,
it must use the multi-line style with /** and */ on their own lines.

Many tools extract metadata from JSDoc comments to perform code validation and optimization.
As such, these comments must be well-formed.

### Markdown

JSDoc is written in Markdown, though it may include HTML when necessary.

### JSDoc tags

Google style allows a subset of JSDoc tags. See JSDoc tag reference for the complete list.
Most tags must occupy their own line, with the tag at the beginning of the line.

Disallowed:

```js
/**
 * The "param" tag must occupy its own line and may not be combined.
 * @param {number} left @param {number} right
 */
function add(left, right) { ... }
```

Simple tags that do not require any additional data (such as `@private`, `@const`, `@final`, `@export`)
may be combined onto the same line, along with an optional type when appropriate.

```js
/**
 * Place more complex annotations (like "implements" and "template")
 * on their own lines.  Multiple simple tags (like "export" and "final")
 * may be combined in one line.
 * @export @final
 * @implements {Iterable<TYPE>}
 * @template TYPE
 */
class MyClass {
  /**
   * @param {ObjType} obj Some object.
   * @param {number=} num An optional number.
   */
  constructor(obj, num = 42) {
    /** @private @const {Array<ObjType|number>} */
    this.data_ = [obj, num];
  }
}
```

There is no hard rule for when to combine tags, or in which order, but be consistent.

### Line wrapping

Line-wrapped block tags are indented four spaces.
Wrapped description text may be lined up with the description on previous lines,
but this horizontal alignment is discouraged.

```js
/**
 * @description Illustrates line wrapping for long param/return descriptions.
 * @param {string} foo This is a param with a description too long to fit in
 *     one line.
 * @return {number} This returns something that has a description too long to
 *     fit in one line.
 */
exports.method = function(foo) {
  return 5;
};
```

Do not indent when wrapping a `@description` or `@fileoverview` description.

### Top/file-level comments

A file may have a top-level file overview. A copyright notice, author information,
and default visibility level are optional. File overviews are generally recommended
whenever a file consists of more than a single class definition.
The top level comment is designed to orient readers unfamiliar with the code to what is in this file.
If present, it may provide a description of the file's contents and any dependencies or compatibility information.
Wrapped lines are not indented.

Example:

```js
/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @package
 */
```

### Class comments

Classes, interfaces and records must be documented with a description and any template parameters,
implemented interfaces, visibility, or other appropriate tags.
The class description should provide the reader with enough information to know how and when to use the class,
as well as any additional considerations necessary to correctly use the class.
Textual descriptions may be omitted on the constructor.
`@constructor` and `@extends` annotations are not used with the `class` keyword unless
the class is being used to declare an `@interface` or it extends a generic class.

```js
/**
 * A fancier event target that does cool things.
 * @implements {Iterable<string>}
 */
class MyFancyTarget extends EventTarget {
  /**
   * @param {string} arg1 An argument that makes this more interesting.
   * @param {Array<number>} arg2 List of numbers to be processed.
   */
  constructor(arg1, arg2) {
    // ...
  }
};

/**
 * Records are also helpful.
 * @extends {Iterator<TYPE>}
 * @record
 * @template TYPE
 */
class Listable {
  /** @return {TYPE} The next item in line to be returned. */
  next() {}
}
```

### Enum and typedef comments

All enums and typedefs must be documented with appropriate JSDoc tags
(`@typedef` or `@enum`) on the preceding line. Public enums and typedefs must also have a description.
Individual enum items may be documented with a JSDoc comment on the preceding line.

```js
/**
 * A useful type union, which is reused often.
 * @typedef {Bandersnatch|BandersnatchType}
 */
let CoolUnionType;


/**
 * Types of bandersnatches.
 * @enum {string}
 */
const BandersnatchType = {
  /** This kind is really frumious. */
  FRUMIOUS: 'frumious',
  /** The less-frumious kind. */
  MANXOME: 'manxome',
};
```

Typedefs are useful for defining short record types, or aliases for unions, complex functions, or generic types.
Typedefs should be avoided for record types with many fields, since they do not allow documenting individual fields,
nor using templates or recursive references. For large record types, prefer `@record`.

### Method and function comments

In methods and named functions, parameter and return types must be documented,
except in the case of same-signature `@override`s, where all types are omitted.
The `this` type should be documented when necessary.
Return type may be omitted if the function has no non-empty `return` statements.

Method, parameter, and return descriptions (but not types)
may be omitted if they are obvious from the rest of the method’s JSDoc or from its signature.

Method descriptions begin with a verb phrase that describes what the method does.
This phrase is not an imperative sentence, but instead is written in the third person,
as if there is an implied This method ... before it.

If a method overrides a superclass method, it must include an `@override` annotation.
Overridden methods inherit all JSDoc annotations from the super class method (including visibility annotations)
and they should be omitted in the overridden method. However, if any type is refined in type annotations,
all @param and @return annotations must be specified explicitly.

```js
/** A class that does something. */
class SomeClass extends SomeBaseClass {
  /**
   * @description Operates on an instance of MyClass and returns something.
   * @param {MyClass} obj An object that for some reason needs detailed
   *     explanation that spans multiple lines.
   * @param {OtherClass} obviousOtherClass
   * @return {boolean} Whether something occurred.
   */
  someMethod(obj, obviousOtherClass) { ... }

  /** @override */
  overriddenMethod(param) { ... }
}

/**
 * @description Demonstrates how top-level functions follow the same rules.  This one
 * makes an array.
 * @param {TYPE} arg
 * @return {Array<TYPE>}
 * @template TYPE
 */
function makeArray(arg) { ... }
```

If you need descriptions or tags, use a single JSDoc comment above the method.
For example, methods which return values need a @return tag.

```js
class MyClass {
  /**
   * @param {number} arg
   * @return {string}
   */
  bar(arg) {...}
}
```

```js
// Illegal inline JSDocs.

class MyClass {
  /** @return {string} */ foo() {...}
}

/** Function description. */ bar() {...}
```

In anonymous functions annotations are a must. If you cannot create a function and use an anonymous function,
the automatic type inference is insufficient or explicit annotation improves readability,
then annotate param and return types like this:

```js
promise.then(
    /**
     * @param {item}
     * @return {string}
     */
    (items) => {
      doSomethingWith(items);
      return items[0];
    });
```

### Property comments

Property types must be documented. The description may be omitted for private properties,
if name and type provide enough documentation for understanding the code.

Publicly exported constants are commented the same way as properties.

```js
/** My class. */
class MyClass {
  /** @param {string=} someString */
  constructor(someString = 'default string') {
    /** @private @const {string} */
    this.someString_ = someString;

    /** @private @const {OtherType} */
    this.someOtherThing_ = functionThatReturnsAThing();

    /**
     * Maximum number of things per pane.
     * @type {number}
     */
    this.someProperty = 4;
  }
}

/**
 * The number of times we'll try before giving up.
 * @const {number}
 */
MyClass.RETRY_COUNT = 33;
```

### Type annotations

Type annotations are found on `@param`, `@return`, `@this`, and `@type` tags,
and optionally on `@const`, `@export`, and any visibility tags.
Type annotations attached to JSDoc tags must always be enclosed in braces.

#### Nullability

The type system defines modifiers `!` and `?` for non-null and nullable, respectively.
These modifiers must precede the type.

Nullability modifiers have different requirements for different types, which fall into two broad categories:

- Type annotations for primitives (`string`, `number`, `boolean`, `symbol`, `undefined`, `null`)
and literals (`{function(...): ...}` and `{{foo: string...}}`) are always non-nullable by default.
Use the `?` modifier to make it nullable, but omit the redundant `!`.

- Reference types (generally, anything in `UpperCamelCase`, including `some.namespace.ReferenceType`)
refer to a class, enum, record, or typedef defined elsewhere. Since these types may or may not be nullable,
it is impossible to tell from the name alone whether it is nullable or not.
Always use explicit `?` and `!` modifiers for these types to prevent ambiguity at use sites.

Bad:

```js
const /** MyObject */ myObject = null; // Non-primitive types must be annotated.
const /** number */ someNum = 5; // Primitives are non-nullable by default.
const /** number? */ someNullableNum = null; // ? should precede the type.
const /** {foo: string, bar: number} */ record = ...; // Already non-nullable.
const /** MyTypeDef */ def = ...; // Not sure if MyTypeDef is nullable.

// Not sure if object (nullable), enum (non-nullable, unless otherwise
// specified), or typedef (depends on definition).
const /** SomeCamelCaseName */ n = ...;
```

Good:

```js
const /** ?MyObject */ myObject = null;
const /** number */ someNum = 5;
const /** ?number */ someNullableNum = null;
const /** {foo: string, bar: number} */ record = ...;
const /** MyTypeDef */ def = ...;
const /** ?SomeCamelCaseName */ n = ...;
```

#### Type Casts

In cases where the compiler doesn't accurately infer the type of an expression,
it is possible to tighten the type by adding a type annotation comment and enclosing the expression in parentheses.
Note that the parentheses are required.

```js
(/** @type {number} */ (x))
```

#### Template Parameter Types

Always specify template parameters. This way compiler can do a
better job and it makes it easier for readers to understand what code does.

Bad:
```js
const /** Object */ users = {};
const /** Array */ books = [];
const /** Promise */ response = ...;
```

Good:

```js
const /** Object<string, User> */ users = {};
const /** Array<string> */ books = [];
const /** Promise<Response> */ response = ...;

const /** Promise<undefined> */ thisPromiseReturnsNothingButParameterIsStillUseful = ...;
const /** Object<string, *> */ mapOfEverything = {};
```

Cases when template parameters should not be used:

- `Object` is used for type hierarchy and not as map-like structure.

#### Function type expressions

**Terminology Note**: function type expression refers to a type annotation for
function types with the keyword `function` in the annotation (see examples below).

Where the function definition is given, do not use a function type expression.
Specify parameter and return types with `@param` and `@return`, or with inline annotations (see Method and function comments).
This includes anonymous functions and functions defined and assigned to a const
(where the function jsdoc appears above the whole assignment expression).

Function type expressions are needed, for example, inside `@typedef`, `@param` or `@return`.
Use it also for variables or properties of function type, if they are not immediately initialized with the function definition.

```js
/** @private {function(string): string} */
  this.idGenerator_ = googFunctions.identity;
```

When using a function type expression, always specify the return type explicitly.
Otherwise the default return type is unknown (?), which leads to strange and unexpected behavior,
and is rarely what is actually desired.

Bad - type error, but no warning given:

```js
/** @param {function()} generateNumber */
function foo(generateNumber) {
  const /** number */ x = generateNumber();  // No compile-time type error here.
}

foo(() => 'clearly not a number');
```

Good:

```js
/**
 * @param {function(): *} inputFunction1 Can return any type.
 * @param {function(): undefined} inputFunction2 Definitely doesn't return
 *      anything.
 * NOTE: the return type of `foo` itself is safely implied to be {undefined}.
 */
function foo(inputFunction1, inputFunction2) {...}
```

#### Whitespace

Within a type annotation, a single space or line break is required after each comma or colon.
Additional line breaks may be inserted to improve readability or avoid exceeding the column limit.
These breaks should be chosen and indented following the applicable guidelines
(e.g. 4.5 Line-wrapping and 4.2 Block indentation: +2 spaces).
No other whitespace is allowed in type annotations.

Good:

```js
/** @type {function(string): number} */

/** @type {{foo: number, bar: number}} */

/** @type {number|string} */

/** @type {!Object<string, string>} */

/** @type {function(this: Object<string, string>, number): string} */

/**
 * @type {function(
 *     !SuperDuperReallyReallyLongTypedefThatForcesTheLineBreak,
 *     !OtherVeryLongTypedef): string}
 */

/**
 * @type {!SuperDuperReallyReallyLongTypedefThatForcesTheLineBreak|
 *     !OtherVeryLongTypedef}
 */
```

Bad:

```js
// Only put a space after the colon
/** @type {function(string) : number} */

// Put spaces after colons and commas
/** @type {{foo:number,bar:number}} */

// No space in union types
/** @type {number | string} */
```

### Visibility annotations

Visibility annotations (`@private`, `@package`, `@protected`)
may be specified in a `@fileoverview` block, or on any exported symbol or property.
Do not specify visibility for local variables, whether within a function or at the top level of a module.
All `@private` names must end with an underscore.

## Policies

### Issues unspecified by this Style: Be Consistent!

For any style question that isn't settled definitively by this specification,
prefer to do what the other code in the same file is already doing.
If that doesn't resolve the question, consider emulating the other files in the same package.

### Warnings on Lintings

#### How to handle a warning

Before doing anything, make sure you understand exactly what the warning is telling you.
If you're not positive why a warning is appearing, ask for help .

Once you understand the warning, attempt the following solutions in order:

- **First, fix it or work around it.** Make a strong attempt to actually address the warning,
or find another way to accomplish the task that avoids the situation entirely.

- **Otherwise, determine if it's a false alarm.** If you are convinced that the warning is
invalid and that the code is actually safe and correct,
add a comment to convince the reader of this fact and apply the `@suppress` annotation.

- **Otherwise, leave a TODO comment.** This is a last resort. If you do this, do not suppress the warning.
The warning should be visible until it can be taken care of properly.

#### Suppress a warning at the narrowest reasonable scope

Warnings are suppressed at the narrowest reasonable scope,
usually that of a single local variable or very small method.
Often a variable or method is extracted for that reason alone.

Example

```js
/** @suppress {uselessCode} Unrecognized 'use asm' declaration */
function fn() {
  'use asm';
  return 0;
}
```

Even a large number of suppressions in a class is still better than blinding the entire class to this type of warning.

### Deprecation

Mark deprecated methods, classes or interfaces with `@deprecated` annotations.
A deprecation comment must include simple, clear directions for people to fix their call sites.

### Code not in This Style

You will occasionally encounter files in your codebase that are not in proper This Style.
These may have come from an acquisition, or may have been written before This Style took a position on some issue,
or may be in non-Google Style for any other reason.

#### Reformatting existing code

When updating the style of existing code, follow these guidelines.

- It is not required to change all existing code to meet current style guidelines.
Reformatting existing code is a trade-off between code churn and consistency.
Style rules evolve over time and these kinds of tweaks to maintain compliance would create unnecessary churn.
However, if significant changes are being made to a file it is expected that the file will be in This Style.

- Be careful not to allow opportunistic style fixes to muddle the focus of a CL.
If you find yourself making a lot of style changes that aren’t critical to the central focus of a CL, promote those changes to a separate CL.

#### Newly added code: use This Style

Brand new files use This Style, regardless of the style choices of other files in the same package.

When adding new code to a file that is not in This Style, reformatting the existing code first is recommended,
subject to the advice in Reformatting existing code.

If this reformatting is not done, then new code should be as consistent as possible
with existing code in the same file, but must not violate the style guide.

### Local style rules

Teams and projects may adopt additional style rules beyond those in this document,
but must accept that cleanup changes may not abide by these additional rules,
and must not block such cleanup changes due to violating any additional rules.
Beware of excessive rules which serve no purpose.
The style guide does not seek to define style in every possible scenario and neither should you.

### Generated code: mostly exempt

Source code generated by the build process is not required to be in This Style.
However, any generated identifiers that will be referenced from hand-written source code must follow the naming requirements.
As a special exception, such identifiers are allowed to contain underscores,
which may help to avoid conflicts with hand-written identifiers.

## Appendices

### JSDoc tag reference

JSDoc serves multiple purposes in JavaScript.
In addition to being used to generate documentation it is also used to control tooling.
It is used to make sure that data types are being followed.

#### Documentation annotations

##### `@author` or `@owner` - Not recommended.

**Not recommended.**

##### `@bug`

Syntax: `@bug bugnumber`

```js
/** @bug 1234567 */
function testSomething() {
  // …
}

/**
 * @bug 1234568
 * @bug 1234569
 */
function testTwoBugs() {
  // …
}
```

Indicates what bugs the given test function regression tests.

Multiple bugs should each have their own @bug line, to make searching for regression tests as easy as possible.
