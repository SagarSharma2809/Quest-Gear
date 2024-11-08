import * as React from "react";
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { store } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import App from './App';
import './index.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

let persistor = persistStore(store);

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
  );
}
else {
  console.log("Root Element not found")
}

