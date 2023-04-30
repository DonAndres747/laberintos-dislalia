var Div = window.parent.document.querySelector('iframe');


document.querySelector("button").addEventListener("click",(e)=>{
    window.parent.document.querySelector('a-scene').removeAttribute('style')
    window.parent.document.querySelector('div').remove()
})

document.getElementById("queryBtn").addEventListener("click",(e)=>{
    Div.setAttribute("src", "./puntuacion.html")
})

document.getElementById("registryBtn").addEventListener("click",(e)=>{
    Div.setAttribute("src", "./registry.html")
})