---
title: "Basic Commands"
date: 2022-02-08T01:28:26.898Z
draft: false
TableOfContents: true
weight: 100
---

## create:file

This is the most basic way of creating a file.
This allows you to create a file with a standard license snippet (for the usual files
like js, py, etc...)

To run

```bash
npm run create:file
```

or

```bash
npx plop create:file
```

You can also add the path immediately

```bash
npx plop create:file path/to/folder/filename.ext
```

Take note that creation of file will always be relative to the project's directory location.

If you didn't supply the path, it will ask for the following:
- destination path (required)
- filename (required)
- description of the file

If you supplied the path, it will only ask the following:
- description of the file

Although the description is not required, it would be best to describe what the file is.
This will help others who will be working on the project know what the file is and how it
works. Make it concise and have your code do the describing (by doing proper naming conventions).

* * *

## create:doc

This is the most basic way of creating a documentation page that will be shown on the repo's page.
This allows you to create a documenation page with a working template.

It will ask you on where to position the document based on chapters, so make sure you put it on a right
chapter or subchapter.

You can run by typing:

```bash
npm run create:doc
```

or

```bash
npx plop create:doc
```

It will ask for three different things,

- Destination path (required)
- Page Title (required)
- If it is an Index (required)
- order

Path will be the path of the file, and will be based on the current directory list of the documentation.

Page title can be with spaces, and will be transformed into kebabCase/dashCase/slugify for the filename of the file.
Treat the page title as a way to title the page and not as a filename, as this will be show up on the table of contents
on the left side of the documentation page.

If you chose a path, it will ask you if the page is the index or will be a subpage to a particular folder (chapter).
But if you chose the path to be the root folder of the docs, then it will automatically treat the page as the index page.

Order allows you to order the page in the documentation list.
