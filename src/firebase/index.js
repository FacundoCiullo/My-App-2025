// src/firebase/index.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Configuración
const firebaseConfig = {
  apiKey: "AIzaSyAu3U_xPtFlPsBj3Tl1orwknVShNPh1WDs",
  authDomain: "my-app-e22f5.firebaseapp.com",
  projectId: "my-app-e22f5",
  storageBucket: "my-app-e22f5.appspot.com",
  messagingSenderId: "62161871115",
  appId: "1:62161871115:web:130c5942ea26858c13420e"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Auth
export const auth = getAuth(app);

// Provider de Google con parámetros que EVITAN el cierre del popup
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});
