import { ERROR_SHADOW } from '../back/constants.js';

function disableButton() {
    const btn = document.querySelector("button");
    btn.classList.add("disabled1");
    btn.disabled = true;
    btn.style.cursor = "default";
}

function resetButton() {
    const btn = document.querySelector("button");
    btn.classList.remove("disabled1");
    btn.style.cursor = "pointer";
    btn.disabled = false;
    const p = document.querySelector('p');
    if (p) {
        p.remove();
        btn.removeAttribute("style");
    }
}

export function validateFields(inputs, disabled) {
    inputs.forEach(input => {
        input.addEventListener("blur", () => {
            if (input.value === "") {
                input.setAttribute("style", ERROR_SHADOW);
                if (disabled) disableButton();
            } else {
                input.removeAttribute("style");
                const hasEmpty = [...inputs].some(i => i.value === "");
                if (!hasEmpty) resetButton();
            }
        });
    });
}

let _passMatchAbort = null;

export const passNotMatch = (pass, pass2) => {
    if (_passMatchAbort) _passMatchAbort.abort();
    _passMatchAbort = new AbortController();
    const { signal } = _passMatchAbort;

    pass.setAttribute("style", ERROR_SHADOW);
    pass2.setAttribute("style", ERROR_SHADOW);
    document.getElementById('repPassAlert').innerHTML = "<p>Contraseñas no coinciden</p>";
    document.querySelector('button').setAttribute("style", "margin-top: 0px;");

    const clearIfMatch = () => {
        if (pass.value === pass2.value) {
            pass.removeAttribute("style");
            pass2.removeAttribute("style");
        }
    };
    pass.addEventListener("blur", clearIfMatch, { signal });
    pass2.addEventListener("blur", clearIfMatch, { signal });
};

export const userTaken = (user) => {
    user.setAttribute("style", ERROR_SHADOW);
    document.getElementById('nickPassAlert').innerHTML = "<p>cadete ya registrado</p>";
    user.addEventListener("change", () => {
        user.removeAttribute("style");
        document.querySelector('p')?.remove();
    });
};
