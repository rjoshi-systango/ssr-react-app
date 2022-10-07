import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
// import { routes } from '../shared/sharedRoutes';
// import initRedux from '../shared/init-redux.es6';
import HTML from '../components/html';

export default function renderView(req, res, next) {
  const matchOpts = {
    routes: routes(),
    location: req.url
  };
  const handleMatchResult = (error, redirectLocation, renderProps) => {
    if (!error && !redirectLocation && renderProps) {
      const store = initRedux();
      let actions = renderProps.components.map((component) => {
        if (component) {
          if (component.displayName &&
            component.displayName.toLowerCase().indexOf('connect') > -1
          ) {
            if (component.WrappedComponent.loadData) {
              return component.WrappedComponent.loadData();
            }
          } else if (component.loadData) {
            return component.loadData();
          }
        }
        return [];
      });

      actions = actions.reduce((flat, toFlatten) => {
        return flat.concat(toFlatten);
      }, []);

      const promises = actions.map((initialAction) => {
        return store.dispatch(initialAction());
      });
      Promise.all(promises).then(() => {
        const serverState = store.getState();
        const stringifiedServerState = JSON.stringify(serverState);
        // console.log("renderProps", renderProps);
        const app = renderToString(
          // <Provider store={store}>
            <RouterContext routes={routes} {...renderProps} />
          // </Provider>
        );
        const html = renderToString(
          <HTML html={app} serverState={stringifiedServerState} />
        );
        return res.send(`<!DOCTYPE html>${html}`);
      }).catch(() => {
        return next();
      });
    } else {
      next();
    }
  };
  match(matchOpts, handleMatchResult);
}


const routes = (onChange = () => {}) => {
  return (
    <Route path="/" component={App} onChange={onChange}>
      
    </Route>
  );
};
