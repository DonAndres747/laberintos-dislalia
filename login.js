function login(){
    window.parent.document.querySelector('a-scene').setAttribute('style', 'z-index = 1')
    window.parent.document.querySelector('iframe').remove()
}

function registerView(){
    var Div = window.parent.document.querySelector('iframe');
    Div.setAttribute("src", "./registry.html")
}