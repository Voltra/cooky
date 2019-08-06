# cooky

`cooky` is a lightweight library that is used as a wrapper around the native JS cookie handling system.

It encapsulates all necessary methods in an handy object instead of using `document.cookie` in that fancily strange manner (aka `document.cookie = "mynewcookie=pingas"` to add a cookie and `document.cookie` to get the whole cookie string).



## How to install ?

First, download the library either from [github](https://github.com/Voltra/cooky) or [npm](https://www.npmjs.com/package/cooky) (`npm i -S cooky`).

Then import/load it :

```js
//es >= 6
import { Cooky } from "cooky"
```

```js
//node
const { Cooky } = require("cooky");
```

```html
<!-- as a script tag -->
<!DOCTYPE html>
<html>
  <head>
    <!-- [...] -->
    <script src="path/to/cooky.js"></script>
  </head>
  <body>
    <!-- [...] -->
  </body>
</html>
```

Then you'll be able to use it (either as `cooky.Cooky` or `Cooky` for in-browser use).



## Functionalities

### has

`Cooky.has(name : String)`

Determines whether or not there's a cookie associated to the given name.

**<u>Warning:</u>** Throws an error if `name` is not a `String`



### getAll

`Cooky.getAll()`

Retrieves the cookies as an array of objects that follow the following pattern:

```js
{
  name: String,
  value: String
}
```

**<u>Warning:</u>** Throws an error if there has been a problem while parsing the cookie string.



### getAllAsObject

`Cooky.getAllAsObject()`

Retrieves the cookies, but instead of returning an array of object, it returns an objects that has the names of the cookies as keys and their respective values as values.



### getAllAsMap

`Cooky.getAllAsMap()`

Retrieves the cookies just like `getAllAsObject` but send back a `Map` insted of a regular `Object` (only if available, otherwise it would throw an error).



### get

`Cooky.get(name : String)`

Retrieves the cookie that has `name` as its name.

**<u>Warning:</u>** Will throw an exception if `name` is not a `String`.



### set

`Cooky.set(name : String, value : String)`

Creates a new cookie that corresponds to `name=value; ` 

**<u>NB:</u>** You can chain `set`



## Compatibility

Since the source code of `cooky` was written using ES6+ syntax and transpiled using `babel` and its preset `env` with default settings, the compatibilities are the one you obtain from transpiling using `env` with its default settings.

## Changes
### v2.0.0
In version 2.1.0, the cookie parsing algorithm has been revisited to allow parsing of object-like cookies and use of `decodeURIComponent` for some backend technologies.