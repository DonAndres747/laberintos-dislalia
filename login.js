function login(){
    window.parent.document.querySelector('iframe').srcdoc = 'prov.html';
    window.parent.document.querySelector('a-scene').removeAttribute('style')
    window.parent.document.querySelector('iframe').remove()
}

function registerView(){
    var Div = window.parent.document.querySelector('iframe');
    Div.setAttribute("src", "./registry.html")
}