-----
align: middle
type: title
-----

# Harmonide
## Slideshows for JS hackers

<iframe src="http://ghbtns.com/github-btn.html?user=chikathreesix&repo=harmonide&type=watch&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="80" height="20" style="display: inline-block"></iframe>
<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://harmonide.com" data-text="HTML slide for JS Hackers" data-via="chikathreesix">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>


-----
-----

# What is Harmonide?
- HTML slideshows
- Generates slides from Markedown
- Runs JS code on the slide (also ES6)


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

-----
type: title
-----

# Let's harmonide!

## More documents on [Github](https://github.com/chikathreesix/harmonide)

[Ryo Chikazawa](http://ryochikazawa.com) [@chikathreesix](https://twitter.com/chikathreesix)
