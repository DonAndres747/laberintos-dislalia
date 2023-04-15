function login(){
    let Div = document.querySelector('div')
    // console.log(Div)
    // Div.setAttribute('style','background-color: red')
    document.querySelector('body').removeChild(Div)
    document.querySelector('a-scene').setAttribute('style', 'z-index = 1')

}

function registerView(){
    $(document).ready(function () {
        $('.menuContainer').load('./html/registry.html');
    });
}