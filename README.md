# Harmonide

Harmonide is a HTML presentation framework that supports to convert a markedown file to a html file. Also all JavaScript code blocks in the presentation are runnable.
All JavaScript codes are written in ES6 that are compiled by traceur compiler. Harmonide is still in a development so it might have bugs and lack of features.

## Getting started

Installation & build

```sh
npm install harmonide
harmonide build your-slide.md
```

Watch the changes

```sh
harmonide watch your-slide.md
```

## Markdown formats

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

### Defining the slides

You can put two lines of `-----` in front of the slide you are going to define. For example if you want to define two slides, the markdown will be as follows.

```md
-----
-----
# Slide1

-----
-----
# Slide2
```

### Setting options

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

## Options

### title
Type: `string`

Title for the slide HTML. Only available in global option.

### layout
Type: `string`

Default: `default`

Name of layout file in `layouts` directory. The file name will be `layouts/layout.html.erb`. Only available in global option.

### backgroundColor
Type: `string`

Background color of the slide. Any type of color string that can be used in css can be specified.

### backgroundImage
Type: `string`

Background image of the slide. If just a file name is specified, that will find the file in `build/assets`. URL can also be specified.

### align
Type: `string`

Align in the slide. Can be `middle`, `bottom` or `center`

### color
Type: `string`

Text color in the slide. Any type of color string that can be used in css can be specified.

### type
Type: `string`

Spefies the type of the slide. Can be `title`.


## Development

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

You can also watch the changes and parse them dynamically
```sh
grunt watch
```

It will generate html files in the `build` directory from all markedown files in the `drafts` directory.
In this case, you will get `build/sample.html`.
Now you can upload `buid` directory to your webserver!
