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

function validateFields(inputs, disabled) {

    inputs.forEach(input => {

        input.addEventListener("blur", (e) => {
            console.log(input.value);
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
                registrationDate: `${day}/0${month}/${year}`
            });
            console.log("Documento creado exitosamente.");
            return {
                localUser: username,
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
        }else{

        }
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: error
        }
    }
}


export default {
    registerUser, validateFields, passNotMatch, userTaked
}

