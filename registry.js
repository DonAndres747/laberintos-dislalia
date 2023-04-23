import firebase from './back/firebase.js'

const regForm = document.getElementById('regForm');


document.querySelector('button').addEventListener('click', async (e) => {
    e.preventDefault();

    const username = regForm["username"]
    const nickname = regForm["nickname"]
    const tutor = regForm["tutor"]
    const age = regForm["age"]
    const password = regForm["password"]
    const repPass = regForm["repPass"]

    const status = await firebase.registerUser(username.value, nickname.value, tutor.value, age.value, password.value, repPass.value);
    if (status.statusCode == 500) {
        localStorage.setItem('localnick', nickname.value)
        regForm.reset();
        window.parent.document.querySelector('a-scene').removeAttribute('style')
        window.parent.document.querySelector('iframe').remove()
    } else if (status.statusCode == 1062) {
        firebase.userTaked(nickname)
    }
    else if (status.statusCode == 8008) {
        firebase.passNotMatch(password, repPass)
    }


})


document.getElementById('volver').addEventListener('click', () => {
    var Div = window.parent.document.querySelector('iframe');
    Div.setAttribute("src", "./login.html")

})


const inputs = document.querySelectorAll('input');
firebase.validateFields(inputs, true)



