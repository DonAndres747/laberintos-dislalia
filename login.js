
import firebase from './back/firebase.js'

var Div = window.parent.document.querySelector('iframe');


// document.querySelector("button").addEventListener("click",(e)=>{
//     window.parent.document.querySelector('a-scene').removeAttribute('style')
//     window.parent.document.querySelector('div').remove()
// })

document.getElementById("queryBtn").addEventListener("click", (e) => {
    Div.setAttribute("src", "./puntuacion.html")
})

document.getElementById("registryBtn").addEventListener("click", (e) => {
    Div.setAttribute("src", "./registry.html")
})

document.querySelector("button").addEventListener("click", async (e) => {
    const username = regForm["username"]
    const password = regForm["password"]

    const status = await firebase.authLogin(username.value, password.value);

    if (status.status == 500) {
        window.parent.document.querySelector('a-scene').removeAttribute('style')
        window.parent.document.querySelector('div').remove()
    } else if (status.status == 406) {

        const button = document.querySelector("button")
        button.setAttribute("style", "background-color:#f74f4a;font-size: 15px;color:white; height:58px")
        button.innerText = 'Nickname o contraseña invalidos'
        setTimeout(() => {
            button.removeAttribute("style")
            button.innerText = 'Log In'
        }, 3000);

    } 

})
