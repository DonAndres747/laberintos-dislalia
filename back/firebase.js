import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, getDocs, addDoc, collection, query, where, orderBy, limit, Timestamp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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


const timestamp = new Date();

function validateFields(inputs, disabled) {

    inputs.forEach(input => {

        input.addEventListener("blur", (e) => {
            if (input.value == "") {
                input.setAttribute("style", "  box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.01), 0px 0px 8px #E55451");
                disabled == true ? disableButton() : "";

            } else {
                input.removeAttribute("style")
                let count = 0
                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].value == "") {
                        count += 1
                    }
                }
                count == 0 ? resetButton() : "";

            }
        })

    })
}

function disableButton() {
    document.querySelector("button").classList.add("disabled1"),
        document.querySelector("button").disabled = 'true',
        document.querySelector("button").style.cursor = "default"
}


function resetButton() {
    document.querySelector("button").classList.remove("disabled1"),
        document.querySelector("button").style.cursor = "pointer",
        document.querySelector('button').disabled = false;
    if (document.querySelector('p')) {
        document.querySelector('p').remove();
        document.querySelector("button").removeAttribute("style")
    }
}

const passNotMatch = (pass, pass2) => {
    pass.setAttribute("style", "  box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.01), 0px 0px 8px #E55451");
    pass2.setAttribute("style", "  box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.01), 0px 0px 8px #E55451");
    document.getElementById('repPassAlert').innerHTML = "<p>Contraseñas no coinciden</p>"
    document.querySelector('button').setAttribute("style", "margin-top: 0px;")
    pass.addEventListener("blur", (e) => {
        if (pass.value == pass2.value) {
            pass.removeAttribute("style")
            pass2.removeAttribute("style")
        }
    })
    pass2.addEventListener("blur", (e) => {
        if (pass.value == pass2.value) {
            pass.removeAttribute("style")
            pass2.removeAttribute("style")
        }
    })
}
const userTaked = (user) => {
    user.setAttribute("style", "  box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.01), 0px 0px 8px #E55451");
    document.getElementById('nickPassAlert').innerHTML = "<p>cadete ya registrado</p>"
    user.addEventListener("change", (e) => {
        user.removeAttribute("style")
        document.querySelector('p').remove();
    })
}



const registerUser = async (username, nickname, tutor, age, password, repPass) => {
    const documentRef = doc(db, "Users", nickname);

    try {
        const docSnapshot = await getDoc(documentRef);

        if (!docSnapshot.exists() && password === repPass && username !== "" && nickname !== "" && tutor !== "" && age !== "" && password !== "" && repPass !== "") {
            await setDoc(documentRef, {
                username,
                nickname,
                tutor,
                age,
                password,
                registrationDate: Timestamp.fromDate(timestamp),
            });
            localStorage.setItem('localnick', nickname)
            localStorage.setItem('localtutor', tutor)
            return {
                statusCode: 500
            }
        }
        else if (docSnapshot.exists()) {
            console.log("El documento ya existe.");
            return {
                statusCode: 1062
            }
        } else if (password !== repPass) {
            return {
                statusCode: 8008
            }
        } else {

        }
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: error
        }
    }
}



const registerUserScore = async (score) => {

    const playerNick = localStorage.getItem("localnick")
    const localTutor = localStorage.getItem("localtutor")

    const docRef = await addDoc(collection(db, "UserScores"), {
        nickname: playerNick,
        score,
        tutor: localTutor,
        date: Timestamp.fromDate(timestamp),
    });

}

const getUserScores = async (user) => {

    let playerNick = localStorage.getItem("localnick")
    console.log('playerNick', playerNick)
    playerNick = playerNick ? playerNick : user;

    const scores = query(collection(db, "UserScores"), where("nickname", "==", playerNick), orderBy("date", "desc"), limit(4));
    const querySnapshot = await getDocs(scores);

    return querySnapshot
}

const getTutorsPlayers = async (tutor) => {

    let localTutor = localStorage.getItem("localtutor")
    console.log('localTutor', localTutor)
    localTutor = localTutor ? localTutor : tutor;

    const players = query(collection(db, "Users"), where("tutor", "==", localTutor), orderBy("registrationDate", "desc"));
    const querySnapshot = await getDocs(players);

    return querySnapshot
}

const authLogin = async (username, password) => {

    try {
        const documentRef = doc(db, "Users", username);
        const docSnapshot = await getDoc(documentRef);
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (data.password === password) {
                localStorage.setItem('localnick', data.nickname)
                localStorage.setItem('localtutor', data.tutor)
                return {
                    status: 500
                }
            } else {
                return {
                    status: 406
                }
            }
        } else {
            return {
                status: 406
            }
        }
    } catch (error) {
        return {
            status: 406
        }
    }
}



export default {
    registerUser, validateFields, passNotMatch, userTaked, registerUserScore, getUserScores, getTutorsPlayers, authLogin
}

