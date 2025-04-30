import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import { initializeApp } from "firebase/app";
// Configuración de Firebase de app web
const firebaseConfig = {
  apiKey: "AIzaSyAu3U_xPtFlPsBj3Tl1orwknVShNPh1WDs",
  authDomain: "my-app-e22f5.firebaseapp.com",
  projectId: "my-app-e22f5",
  storageBucket: "my-app-e22f5.appspot.com",
  messagingSenderId: "62161871115",
  appId: "1:62161871115:web:130c5942ea26858c13420e"
};

// Inicializar Firebase
initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
