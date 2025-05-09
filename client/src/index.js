import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { SnackbarProvider } from 'notistack';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <SnackbarProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);


