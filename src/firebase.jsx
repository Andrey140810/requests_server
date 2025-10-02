import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCBcBeuEusgu3YmOb37MAa_fZEqehHZYMo",
  authDomain: "todoapp-2f6b7.firebaseapp.com",
  databaseURL: "https://todoapp-2f6b7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todoapp-2f6b7",
  storageBucket: "todoapp-2f6b7.firebasestorage.app",
  messagingSenderId: "735636880065",
  appId: "1:735636880065:web:b2339b71cbe61f7fb2b240"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
