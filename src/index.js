import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAc6a9i00AxHPCXzM905glQrmayXrhRpSE",
  authDomain: "mymovielist-7d48b.firebaseapp.com",
  projectId: "mymovielist-7d48b",
  storageBucket: "mymovielist-7d48b.appspot.com",
  messagingSenderId: "22240706211",
  appId: "1:22240706211:web:8904b30c808422bb1c4916",
  measurementId: "G-K3G4EKHYN2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

