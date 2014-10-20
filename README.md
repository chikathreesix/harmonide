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

Generate html from markedown

```sh
grunt parse
```
It will generate html files in the build directory from all markedown files in the drafts directory.
In this case, you will get `build/sample.html`.
Now you can upload `buid` directory to your webserver!


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

#### Defining the slides

You can put two lines of `-----` in front of the slide you are going to define. For example if you want to define two slides, the markdown will be as follows.

```md
-----
-----
# Slide1

-----
-----
# Slide2
```

#### Setting options
- Global options
The options set at the beginning of the file will be global options.
```md
backgroundColor: white

-----
-----
# Slide1
```

- Slide options
The options set in between two lines of `-----` will be options for the slide.
```md
-----
backgroundColor: white
align: middle
-----

# Slide1
```
