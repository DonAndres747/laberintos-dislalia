import firebase from './back/firebase.js'

const regForm = document.getElementById('regForm');

document.querySelector('button').addEventListener('click', async (e) => {
    e.preventDefault();

    const username = regForm["username"]
    const nickname = regForm["nickname"]
    const tutor = regForm["tutor"]
    const age = regForm["age"]
    const password = regForm["password"]

    const status = await firebase.registerUser(username.value, nickname.value, tutor.value, age.value, password.value);
    if (status.statusCode == 500) {
        localStorage.setItem('localnick', nickname.value)
        regForm.reset();
        window.parent.document.querySelector('a-scene').setAttribute('style', 'z-index = 1')
        window.parent.document.querySelector('iframe').remove()
    } else {
        alert("Error")
        console.log(statusCode)
    }
})


document.getElementById('volver').addEventListener('click', () => {
    var Div = window.parent.document.querySelector('iframe');
    Div.setAttribute("src", "./login.html")

})

