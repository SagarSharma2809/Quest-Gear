import * as React from "react";
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
}
else {
  console.log("Root Element not found")
}

