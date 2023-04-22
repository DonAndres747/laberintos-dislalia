import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCn_U5Y7TvxAoJGh_fhXUMC7PgX89co_R8",
    authDomain: "laberinto-dislalia.firebaseapp.com",
    projectId: "laberinto-dislalia",
    storageBucket: "laberinto-dislalia.appspot.com",
    messagingSenderId: "914594960550",
    appId: "1:914594960550:web:43a797b04857c9a52c5067"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
let statusCode
const registerUser = async (username, nickname, tutor, age, password, password2) => {
    const documentRef = doc(db, "Users", nickname);

    try {
        const docSnapshot = await getDoc(documentRef);

        if (!docSnapshot.exists()) {
            await setDoc(documentRef, {
                username,
                nickname,
                tutor,
                age,
                password,
                registrationDate: `${day}/0${month}/${year}`
            });
            console.log("Documento creado exitosamente.");
            return {
                localUser: username,
                statusCode: 500
            }
        } else {
            console.log("El documento ya existe.");
            return {
                statusCode: 1062
            }
        }
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: error
        }
    }
}


export default {
    registerUser
}