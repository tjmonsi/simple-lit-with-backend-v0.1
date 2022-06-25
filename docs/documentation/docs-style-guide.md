---
title: "Docs Style Guide"
date: 2022-02-08T01:28:26.898Z
draft: false
TableOfContents: true
weight: 100
---

# Pre-requisite format

Every documentation should be put inside `docs` folder.

The convention of the `docs` folder follows the `hugo` `techdoc` format.

Every documentation should start with a table to allow `hugo` to detect the title, date of creation, table of contents, and order.

```
---
title: "Docs Style Guide"
date: 2020-03-23T05:23:39.125Z
draft: false
TableOfContents: true
weight: 100
---
```

Although creating the necessary pre-requisites above is easy, it could also be done using `create:doc` command

```
npx plop create:doc
```

# Adding Headers

Adding headers, like any markdown, should be preceded with `#` with a space after (so as not to be confused with hashtagging).

To create structure, add subheadings if necessary to create sub-topics.

When adding headings, it automatically creates a link in the table of contents.

The only pages with no table of contents if it is an `_index` or main page of the folder chapter.

# Main Page Chapter

The main page chapter is the `_index` of a folder. Make sure that the main page is discussing the summary of the chapter.

Create other pages under that folder chapter to describe in more detail the documentation that you want to talk about.
