-----
align: middle
backgroundImage: atlantic-sunset.jpg
-----

# ES6 - The future of JavaScript


-----
backgroundImage: samurai.jpg
-----

# Ryo Chikazawa
- Work @ <img height="36px" src="assets/viki-logo.png" style="vertical-align:middle">
- @chikathreesix
- [ryochikazawa.com](http://ryochikazawa.com)


-----
backgroundImage: ryuanim.gif
align: middle
-----

# Not Ryu


-----
backgroundImage: rio2.jpg
align: middle
-----

# Not Rio


-----
align: middle
-----

# Ryo 


-----
align: middle
-----

# Have you ever written JavaScript?


-----
align: middle
-----

# Have you been annoyed with JavaScript?


-----
align: center
-----

<img src='assets/y-u-no-meme-generator-javascript-y-u-no-work-9a0ebb.jpg' style='text-align:center'>


-----
align: center
-----

<img src='assets/Javascript-535.png'>


-----
-----

# Why?
- "this"
- Scope
- lack of APIs
- a lot of writing styles
- so on...


-----
-----

# What is ES6

- ECMAScript 6
- Standard for JavaScipt
- TC39 in ECMA International
- JavaScript is one of its implementation


-----
-----

# Compatibility table
<iframe width="100%" height="300" src="http://kangax.github.io/compat-table/es6/" style="background-color:#fff;"></iframe>


-----
align: middle
-----

#This is written in ES6!

-----
align: center
-----

<img src='assets/You-can-use-467.png'>


-----
-----

# What is ES6

- Function
- Parameters
- Block scope
- Iteration/Generators
- Classes
- Modules
- Promises


-----
backgroundImage: function-keys.jpg
align: middle
-----

# Function


-----
-----

# Before ES6

```js
var square = function(x){
  return x * x;
}
console.log(square(2));
```


-----
-----

# Arrow function

```jses6
var square = x => x * x;
console.log(square(2));
```


-----
-----

# Arrow function

```jses6
var square = (x) => {
  x * x;
}
var key_maker = val => ({key: val});
```


-----
-----

# Lexical binding(ES3)

```js
var obj = {
  init: function(){
    var self = this;
    window.addEventListener('click', function(e){
      console.log(this);
      self.method();
    });
  },
  method: function(){}
}
obj.init();
```


-----
-----

# Lexical binding(ES5)

```js
var obj = {
  init: function(){
    window.addEventListener('click', function(e){
      this.method();
    }.bind(this));
  },
  method: function(){}
}
obj.init();
```


-----
-----

# Lexical binding(ES6)

```jses6
var obj = {
  init: function(){
    window.addEventListener('click', e => this.method());
  },
  method: function(){}
}
```


-----
align: middle
backgroundImage: parameters.jpg
-----

# Parameters


-----
-----

# Default values(ES3)

```js
function add(x, y){
  y = y || 1;
  return x + y;
}
console.log(add(1));
```

-----
-----

# Default values(ES6)

```jses6
function add(x, y = 1){
  return x + y;
}
console.log(add(1));
```


-----
-----

# Rest parameters

```jses6
function sum(base, ...rest){
  rest.forEach(function(arg){
    base += arg
  });
  return base;
}
console.log(sum(1, 2, 3, 4, 5));
```


-----
-----

# Spread operator

```jses6
function sum(a, b, c, d, e){
  return a + b + c + d + e;
}
var arr = [2, 3, 4, 5];
console.log(sum(1, ...arr));
```


-----
backgroundImage: lego.jpg
align: middle
-----

# Block scope


-----
-----

# ES3

```js
if(true){
  var value = 'value';
}
console.log(value);
```


-----
-----

# Let

```jses6
if(true){
  let value = 'value';
}
console.log(value); //ERROR
```

-----
-----

# Const

```jses6
(function(){
  const VALUE = 'value';
  VALUE = 'value2'; //ERROR
});
```


-----
-----

# Block functions

```jses6
if(true){
  function func(){}
}
func(); //ERROR
```


-----
align: middle
backgroundImage: loop.jpg
-----

# Iteration / Generators


-----
-----

# for-of loop

```jses6
var arr = [1, 2, 3];
for(let val of arr) {
  console.log(val);
}
```


-----
-----

# Generators

```jses6
function* helloGen(){
  yield 'Hello';
  yield 'I am';
  yield 'Ryo';
}
var gen = helloGen();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
```

-----
-----

# Generators

```jses6
function* helloGen(){
  yield 'Hello';
  yield 'I am';
  yield 'Ryo';
}
for(var str of helloGen()){
  console.log(str);
}
```


-----
backgroundImage: class.jpg
align: middle
-----

# Classes


-----
-----

# Class

```jses6
class Instrument{
  constructor(name){
    this._name = name;
  }
  play(){
    console.log('play: ' + this._name);
  }
  set name(name){
    this._name = name;
  }
  get name(){
    return this._name;
  }
}
var instrument = new Instrument('piano');

```
 

-----
-----

# Subclass

```jses6
class Guitar extends Instrument{
  constructor(strings) {
    super('guitar');
    this._strings = strings;
  }
  play(){
    console.log(this._strings + 'string ' + this._name);
    super.play();
  }
}
```


-----
-----

# Property method assignment

```jses6
var obj = {
  value: 'value',
  toString() {
    return this.value;
  }
};
console.log(obj.toString());
```


-----
align: middle
backgroundImage: module.jpg
-----

# Modules


-----
-----

# export/import

```jses6
// user.js
export class User{
  constructor(name){
    this._name = name;
  }
}
export var name = 'Ryo';

// user_view.js
import {User, name} from './user';
var user = new User(name);
```


-----
backgroundImage: promise.jpg
align: middle
-----

# Promises


-----
-----

# Promises

```jses6
var timeoutPromise = new Promise((resolve, reject) => {
  setTimeout(resolve, 100);
})
timeoutPromise.then(() => {
  console.log('done');
});
```


-----
-----

# Review

- Function
- Parameters
- Block scope
- Iteration/Generators
- Classes
- Modules
- Promises


-----
align: middle
-----

# How to use them today?


-----
-----

# Traceur Compiler

- [By Google](https://github.com/google/traceur-compiler)
- transcompile from ES6 to ES5
- requires runtime
- [REPL](https://google.github.io/traceur-compiler/demo/repl.html)


-----
-----

# Compile online

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
    <script src="https://google.github.io/traceur-compiler/src/bootstrap.js"></script>
    <script>
      traceur.options.experimental = true;
    </script>
    <script type="module">
      class Instrument{
        constructor(name){
          this._name = name;
        }
      }
      var instrument = new Instrument('piano');
    </script>
  </body>
</html>
```


-----
-----

# Compile offline

Install
```sh
$ npm install traceur -g
$ traceur --out out.js --script source.js
```

HTML
```html
<html>
  <head>
    <script src="bin/traceur-runtime.js"></script>
    <script src="out.js"></script>
  </head>
  <body>
  </body>
</html>
```

-----
-----

# Tools

- [es6-transpiler](https://github.com/termi/es6-transpiler)
- [esnext(Square)](https://github.com/esnext/esnext)
- [es6now](https://github.com/zenparsing/es6now)
- [EchoJS](https://github.com/toshok/echo-js)
- [Closure Compiler](https://github.com/google/closure-compiler)


-----
-----

# ES7 - Beyond ES6

- Object.observe
- Async Function


-----
-----

# Harmonide
- HTML presentation framework
- Written in ES6
- Generate from Markdown
- [Github](https://github.com/chikathreesix/harmonide)


-----
-----

# exe.js
- Run codes in &lt;pre&gt;&lt;code&gt;
- Use with hightlighting library
- Embed in your blog
- [Github](https://github.com/chikathreesix/exe.js)


-----
align: middle
-----

# Thank you!
