import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { notification } from 'antd';

import { configureStore } from 'app/store/configure-store';
import DahsboardThemeProvider from 'styles/DahsboardThemeProvider';

const Hmr = React.lazy(() => (
  import(/* webpackChunkName: "Hmr" */ 'hmr')
));
const GlobalStyle = React.lazy(() => (
  import(/* webpackChunkName: "GlobalStyle" */ 'styles/styles-global')
));

notification.config({ top: 50 });
window.notification = notification;
// document.body.style.zoom = '0.9';

const storeInit = configureStore();

const App: React.FC<{}> = () => {
  return (
    <ReduxProvider store={storeInit.store}>
      <PersistGate loading={<div></div>} persistor={storeInit.persistor}>
        <DahsboardThemeProvider>
          <React.Suspense fallback="Загрузка...">
            <GlobalStyle />
            <Hmr />
          </React.Suspense>
        </DahsboardThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;

