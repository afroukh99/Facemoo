import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from "./context/authContext.js";
import { DarkModeContextProvider } from "./context/darkModeContext.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DarkModeContextProvider>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
</DarkModeContextProvider>
);


