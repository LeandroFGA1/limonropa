import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import MainLayout from './layout/MainLayout';
import Router from './router/Router';
import store, { persistor } from './store/store';

// export const BASE_URL = "https://ecosustentable.azurewebsites.net/";
export const BASE_URL = "http://localhost:8000/";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <MainLayout>
            <Router />
          </MainLayout>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
