# Harmonide

Harmonide is a HTML presentation framework that supports to convert a markedown file to a html file. Also all JavaScript code blocks in the presentation are runnable.
All JavaScript codes are written in ES6 that are compiled by traceur compiler. Harmonide is still in a development so it might have bugs and lack of features.

## Getting started

### Preparation

Install Grunt and modules

```sh
npm install -g grunt-cli
npm install
```

Create `drafts` directory and put markdown files

```sh
mkdir drafts
vi drafts/sample.md
```

### Markedown formats

```md
backgroundColor: #000

-----
-----

# Slide1 title

- content1
- content2

-----
backgroundImage: test.jpg
-----

# Slide2 title

\`\`\`js
var test = 'test';
console.log(test);
\`\`\`
```


