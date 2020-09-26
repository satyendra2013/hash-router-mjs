//import dependencies
import Router from 'routes';
import url from 'url';
import location from 'global/document';
import EventEmitter from 'events';
import extend from 'xtend/mutable';

//import from util.mjs
import { getDefaultRoute, setDefaultRoute } from './util.mjs';

const hashRouterJs = (val) => {
  const router = Router();
  val = val || {};
  let setRoute = val.setRoute || setDefaultRoute;
  let getRoute = val.getRoute || getDefaultRoute;

  const onApplyChange = (e) => {
    let hash = getRoute();
    let newHashVal = hash;
    let oldHashVal = '#/';

    if (e && 'newURL' in e && 'oldURL' in e) {
      let newUrl = url.parse(e.newURL);
      if (newUrl && newUrl.hash) {
        newHashVal = newUrl.hash;
      }

      let oldUrl = url.parse(e.oldURL);
      if (oldUrl && oldUrl.hash) {
        oldHashVal = oldUrl.hash;
      }
    }

    let route = router.match(hash);
    if (route) {
      route.fn(hash, {
        params: route.params,
        splats: route.splats,
        newUrl: newHashVal,
        oldUrl: oldHashVal,
      });
    }

    onApplyChange.emit('hash', hash, {
      newUrl: newHashVal,
      oldUrl: oldHashVal,
    });
  };

  onApplyChange.go = setRoute;
  onApplyChange.get = getRoute;
  onApplyChange.addRoute = router.addRoute.bind(router);

  extend(onApplyChange, EventEmitter.prototype);
  EventEmitter.call(onApplyChange);

  return onApplyChange;
};

export default hashRouterJs;
