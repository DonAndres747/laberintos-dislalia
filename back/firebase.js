import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCn_U5Y7TvxAoJGh_fhXUMC7PgX89co_R8",
    authDomain: "laberinto-dislalia.firebaseapp.com",
    projectId: "laberinto-dislalia",
    storageBucket: "laberinto-dislalia.appspot.com",
    messagingSenderId: "914594960550",
    appId: "1:914594960550:web:43a797b04857c9a52c5067"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
