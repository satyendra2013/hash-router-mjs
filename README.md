# hash-router-mjs

A lightweight javascript utility for building hash routing in your front-end application.The first hash routing library written by following .mjs extention. Looking forward for more contributions in improving this library. For bugs, please report to satyendrapandit2018@gmail.com until issue tracker page be ready.

## Installation

`npm install hash-router-mjs`

## Example

```js
import hashRouterJs from 'hash-router-mjs';

const router = hashRouterJs();
router.addRoute('#/', renderHomePage);
router.addRoute('#/signup', openSignupDialog);

router.on('hash', function (hash, e) {
  console.log('hash changed!', hash);
});

window.addEventListener('hashchange', router);
router(); // call to start the router
```

### Documentation

```ocaml
type RouteHandler := (hash: String, val: {
    params: Object,
    splats: Array<String>,
    newUrl: String,
    oldUrl: String
}) => void

hash-router-mjs := (val?: {
    setRoute?: (String) => void,
    getRoute?: () => String
}) => EventEmitter & {
    (HashChangeEvent?) => void,
    go: (String) => void,
    get: () => String,
    addRoute: (pattern: String | RegExp, handler: RouteHandler) => void
}
```

## Tests

We are using [`tape`] for the testing this utility library.
To run tests, run:

```sh
npm run test
```

For convenience, during development you can use:

```sh
npm run watch
```

and watch the test be re-run at every save.

## Contributors

- Satyendra Pandit

## MIT Licenced

This project is licensed under the terms of the MIT license.
