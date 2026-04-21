import { authLogin } from '../services/auth.service.js';
import { ERROR_FEEDBACK_MS } from '../back/constants.js';

const regForm = document.getElementById('regForm');
const iframe = window.parent.document.querySelector('iframe');

document.getElementById("registryBtn").addEventListener("click", () => {
    iframe.setAttribute("src", "./pages/registry.html");
});

document.getElementById("queryBtn").addEventListener("click", () => {
    iframe.setAttribute("src", "./pages/puntuacion.html");
});

document.querySelector("button").addEventListener("click", async () => {
    const nickname = regForm["username"].value.trim();
    const password = regForm["password"].value;

    if (!nickname || !password) return;

    const btn = document.querySelector("button");
    btn.disabled = true;
    btn.innerText = 'Entrando...';

    const { statusCode } = await authLogin(nickname, password);

    if (statusCode === 200) {
        window.parent.document.querySelector('a-scene').removeAttribute('style');
        window.parent.document.getElementById('login-container').remove();
    } else {
        btn.disabled = false;
        btn.setAttribute("style", "background-color:#f74f4a;font-size:15px;color:white;height:58px");
        btn.innerText = 'Nickname o contraseña inválidos';
        setTimeout(() => {
            btn.removeAttribute("style");
            btn.innerText = 'Log In';
        }, ERROR_FEEDBACK_MS);
    }
});
