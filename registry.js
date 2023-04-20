import {registerUser} from './firebase.js'

const regForm = document.getElementById('regForm');

export function registrar(e){
    e.preventDefault();

    const username = regForm["username"].value
    const nickname = regForm["nickname"].value
    const tutor = regForm["tutor"].value
    const age = regForm["age"].value
    const password = regForm["password"].value

   
    registerUser(username, nickname, tutor, age, password);
}


export function loginView() {
    var Div = window.parent.document.querySelector('iframe');
    Div.setAttribute("src", "./login.html")
}


    // const fecha = new Date();
    // const horaActual = fecha.toLocaleString('es-ES', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '');
    // console.log(horaActual);

