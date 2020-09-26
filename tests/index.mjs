//import dependecies
import test from 'tape';
import bind from 'function-bind';

//index.mjs for test execution
import hashRouterJs from '../index.mjs';

//importing the implementation of function.prototype.bind
Function.prototype.bind = bind;

test('hashRouterJs is a function.', function (assert) {
  assert.equal(typeof hashRouterJs, 'function');
  assert.end();
});

test("hashRouterJs set's route", function (assert) {
  const location = LocationShim();
  let router = hashRouterJs(location);

  router.go('#/baz');

  assert.equal(location.getRoute(), '#/baz');
  assert.end();
});

test('hashRouterJs broadcasts initial route when called', function (assert) {
  const location = LocationShim();
  let router = hashRouterJs(location);

  router.addRoute('#/', function (hash, val) {
    assert.equal(hash, '#/');
    assert.deepEqual(val, {
      params: {},
      splats: [],
      newUrl: '#/',
      oldUrl: '#/',
    });

    assert.end();
  });
  router();
});

test('hashRouterJs broadcasts deltas in routes', function (assert) {
  const location = LocationShim('#/baz');
  let router = hashRouterJs(location);

  router.addRoute('#/bar', function (hash, val) {
    assert.equal(hash, '#/bar');
    assert.deepEqual(val, {
      params: {},
      splats: [],
      newUrl: '#/bar',
      oldUrl: '#/baz',
    });

    assert.end();
  });

  router();
  location.setRoute('#/bar');
  router({
    newURL: '/#/bar',
    oldURL: '/#/baz',
  });
});

test('hashRouterJs deals with no hash in previous route', function (assert) {
  const location = LocationShim('#/baz');
  let router = hashRouterJs(location);

  router.addRoute('#/bar', function (hash, val) {
    assert.equal(hash, '#/bar');
    assert.deepEqual(val, {
      params: {},
      splats: [],
      newUrl: '#/bar',
      oldUrl: '#/',
    });

    assert.end();
  });

  router();
  location.setRoute('#/bar');
  router({
    newURL: '/#/bar',
    oldURL: '',
  });
});

test('hashRouterJs deals with no hash in new route', function (assert) {
  const location = LocationShim('#/baz');
  let router = hashRouterJs(location);

  router.addRoute('*', function (hash, val) {
    if (hash === '#/baz') {
      return;
    }

    assert.equal(hash, '#/');
    assert.deepEqual(val, {
      params: {},
      splats: ['#/'],
      newUrl: '#/',
      oldUrl: '#/baz',
    });

    assert.end();
  });

  router();
  location.setRoute('#/');
  router({
    newURL: '',
    oldURL: '/#/baz',
  });
});

const LocationShim = (uri) => {
  uri = uri || '#/';
  const getRoute = () => {
    return uri;
  };
  const setRoute = (value) => {
    uri = value;
  };

  return { setRoute: setRoute, getRoute: getRoute };
};
