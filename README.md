# Tiered Numbering
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A library for handling tiered numbering, also known as decimal outline notation. This is numbering in the form: 1.1.1.1. Currently, these have to be processed as strings, though it would be much more useful to treat them as arrays, in terms of comparing, iterating, and performing basic mathematical functions on them.
This library exposes a function that takes a string as an input, and returns an object with certain mathematical and comparison properties, and that can return an array representation of the data.

## Install
This is available as an [NPM package here](https://www.npmjs.com/package/tiered-numbering). [Github repo here](https://github.com/rafael-kennedy/tiered-numbering)

``` bash
npm install --save tiered-numbering
```
Then, in node:
``` javascript
var tieredNumbering = require('tiered-numbering')
var obj = tieredNumbering('1.1')
```

## Usage
Pass the function a string to parse into a tiered-numbering object, as well as (optionally) a "type" identifier. This type is used to differentiate various wholly separate uses of tiered numbering. (For instance, you might want to keep track of a version number of a document, as well as using tiered-numbering for all of the chapter headings. Because these will never be compared, and do not relate to eachother, it is unnecessary for them to share depth).

This object has several properties, the most useful of which are array and string.

```javascript
tieredNumbering('1.1.1').array
// [ 1, 1, 1 ]
tieredNumbering('1.1.1').string
// '1.1.1'

tieredNumbering('1.1.1').depth
// 3
tieredNumbering('1.1.1').delim
// '.'
```

### Manipulating Tiered Numbering Objects
You can manipulate the depth and delimiter by using the included acessor functions.

```javascript
var tn = tieredNumbering('1.1.1')
tn.depth = 4
// 4
tn.array
// [ 1, 1, 1, 0 ]

var tn = tieredNumbering('1.1.1')
tn.delim = ':'
// ':'
tn.string
// '1:1:1'
```

There are also several methods that can be used to manipulate the actual content of the object, including increment, decrement, and subincrement methods. The increment and decrement methods accept a parameter indicating the tier number, and default to the depth of the object.

```javascript
// Increment
tn = tieredNumbering('1.1.1').increment().string
// '1.1.2'
tn = tieredNumbering('1.1.1').increment(1).string
// '1.2.1'

// Decrement
tn = tieredNumbering('1.1.1').decrement().string
// '1.1.0'
tn = tieredNumbering('1.1.1').decrement(1).string
// '1.0.1'

// Subincrement
tn = tieredNumbering('1.1.1').subincrement().string
// '1.1.1.1'
```

There are several Math methods as well, though there are significant gotchas that can crop up here. The safest and most useful are the add and subtract methods. Multiply and divide methods exist as well, but you must be very careful as these can result in decimal and fractional entries which are problematic, especially if you are using "." as a delimiter.

```javascript
tieredNumbering('1.1.1').add('1.1').string
// '2.2.1'

tieredNumbering('1.1.1').subtract('1.1').string
// '0.0.1'
```

### Comparing Tiered Numbering Objects
There is also a "compare" method that accepts either a string or a tiered Numbering object and returns a positive number if the object is larger than the parameter it was passed, a negative number if it was smaller, and zero if they are the same (including for instance, 1.1 and 1.1.0). This is especially useful for sorting.


```javascript
tieredNumbering('1.1').compare('1.0')
// 1

var tnArray = ['1.1.1', '2.1', '1.0.1', '2.0.1', '2.0.3']
tnArray.sort(function(a,b){return tieredNumbering(a).compare(b)})
// [ '1.0.1', '1.1.1', '2.0.1', '2.0.3', '2.1' ]
```
