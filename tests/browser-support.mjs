//import dependecies
import test from 'tape';
import location from 'global/document';

//index.mjs for test execution
import hashRouterJs from '../index.mjs';
import './index.mjs';

test("hashRouterJs set's hash", function (assert) {
  const router = hashRouterJs();
  router.go('/baz');
  assert.equal(location.hash, '#/baz');
  assert.end();
});

//Note: This file is for future tests development.
