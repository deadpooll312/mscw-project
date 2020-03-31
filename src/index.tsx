import * as React from 'react';
import * as ReactDOM  from 'react-dom';

const AppContainer = React.lazy(() => (
  import(/* webpackChunkName: "AppContainer" */ 'AppContainer')
));

ReactDOM.render(
  <React.Suspense fallback={<div></div>}>
    <AppContainer />
  </React.Suspense>,
  document.querySelector('#root'),
);
