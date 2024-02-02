import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom';
import Context from './Context/Context.jsx';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZQRmyCjJmIZ7HRgwQ8P3qnBP0uhKSu4Y",
  authDomain: "ramsaludmental-d6d49.firebaseapp.com",
  projectId: "ramsaludmental-d6d49",
  storageBucket: "ramsaludmental-d6d49.appspot.com",
  messagingSenderId: "71224065048",
  appId: "1:71224065048:web:1a4d2e995471a8e169976d",
  measurementId: "G-YVXJQYSDLG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Context>
      <NextUIProvider>

        <App />
      </NextUIProvider>

    </Context>

  </BrowserRouter>


)
