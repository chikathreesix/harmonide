-----
align: middle
type: title
-----

# Harmonide
## Slideshows for JS hackers


-----
-----

# What is Harmonide?
- HTML presentation framework
- Generates slides from Markedown
- Run JS code on the slide (also ES6)


-----
-----

# Getting started

- Installation & build

```sh
$ npm install harmonide
$ harmonide build your-slide.md
```

- Watch the changes

```sh
$ harmonide watch your-slide.md
```

-----
-----

# Writing Markdown

- To define slides, put 2 lines of `-----` in front of the slide

```md
-----
-----
# Title1
## content1

-----
-----
# Title2
- list1
- list2
- list3
```

-----
-----

# Run JavaScript on the slides

- JavaScript code

```js
console.log('Hello Harmonide!');
```

- ES6 is also available

```jses6
var square = (x) => x * x;
console.log(square(2));
```

-----
-----

# Options

- Options can be specified in between 2 line of `-----`.

```md
-----
type: title
backgroundColor: black
-----
# Title1
## content1
```
