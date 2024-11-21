import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './Store/store';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
  const domain = process.env.REACT_APP_DOMAIN as string;
  const clientId = process.env.REACT_APP_CLIENT_ID as string;

root.render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}>
        <Provider store={store}>
            <App />
        </Provider>
    </Auth0Provider>
    </PersistGate>
  </React.StrictMode>
);

reportWebVitals();
