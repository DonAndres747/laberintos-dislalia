import { registerUser } from '../services/auth.service.js';
import { validateFields, passNotMatch, userTaken } from '../ui/form.js';
import { ERROR_SHADOW } from '../back/constants.js';

const regForm = document.getElementById('regForm');
const btn = document.querySelector('button');

document.querySelector('button').addEventListener('click', async (e) => {
    e.preventDefault();

    const username = regForm["username"].value.trim();
    const nickname = regForm["nickname"].value.trim();
    const tutor    = regForm["tutor"].value.trim();
    const age      = Number(regForm["age"].value);
    const password = regForm["password"].value;
    const repPass  = regForm["repPass"].value;

    if (isNaN(age) || age <= 0 || age > 120) {
        regForm["age"].setAttribute("style", ERROR_SHADOW);
        return;
    }

    btn.disabled = true;
    btn.innerText = 'Registrando...';

    const { statusCode } = await registerUser(username, nickname, tutor, String(age), password, repPass);

    if (statusCode === 200) {
        regForm.reset();
        window.parent.document.querySelector('a-scene').removeAttribute('style');
        window.parent.document.getElementById('login-container').remove();
    } else if (statusCode === 1062) {
        btn.disabled = false;
        btn.innerText = 'Registrar';
        userTaken(regForm["nickname"]);
    } else if (statusCode === 8008) {
        btn.disabled = false;
        btn.innerText = 'Registrar';
        passNotMatch(regForm["password"], regForm["repPass"]);
    } else {
        btn.disabled = false;
        btn.innerText = 'Registrar';
    }
});

document.getElementById('volver').addEventListener('click', () => {
    window.parent.document.querySelector('iframe').setAttribute("src", "./pages/login.html");
});

validateFields(document.querySelectorAll('input'), true);
