import { registerUserScore, getUserScores, getTutorsPlayers } from '../services/scores.service.js';
import { renderTableHeader, renderTutorRows, renderScoreRows } from '../ui/table.js';
import { PAGINATION_SIZE } from '../back/constants.js';

const params = new URLSearchParams(window.location.search);
const score = params.get('score');
const answered = params.get('answered');
const correct = params.get('correct');
const newScore = params.get('newScore') === 'true';
const table = document.querySelector("table");

let paginator = null;

const btn = document.querySelector("button");
btn.innerText = newScore ? "Reiniciar" : "Volver";
btn.addEventListener("click", (e) => {
    e.preventDefault();
    newScore
        ? window.parent.location.reload()
        : window.parent.document.querySelector('iframe').setAttribute("src", "./pages/login.html");
});

if (newScore) {
    registerUserScore(score, answered, correct);
    document.getElementById("search").setAttribute("style", "display:none");
    loadPlayerScores();
}

document.getElementById("nicknameInput").addEventListener("blur", (e) => {
    if (e.target.value) loadPlayerScores(e.target.value);
});

document.getElementById("tutorInput").addEventListener("blur", (e) => {
    if (e.target.value) loadTutorPlayers(e.target.value);
});


class Paginator {
    constructor(data) {
        this.data = data;
        this.page = 0;
    }

    get current() {
        const start = this.page * PAGINATION_SIZE;
        return this.data.slice(start, start + PAGINATION_SIZE);
    }

    next() {
        if ((this.page + 1) * PAGINATION_SIZE < this.data.length) { this.page++; return true; }
        return false;
    }

    back() {
        if (this.page > 0) { this.page--; return true; }
        return false;
    }
}

function setPaginationVisible(visible) {
    document.getElementById('back').hidden = !visible;
    document.getElementById('next').hidden = !visible;
}

async function loadPlayerScores(provNick) {
    setPaginationVisible(false);
    document.getElementById("title").innerHTML = 'Puntuaciones';

    const snapshot = await getUserScores(provNick);
    table.innerHTML = "";
    table.appendChild(renderTableHeader(['Nickname', 'Score', 'Aciertos', 'Tutor', 'Fecha']));
    table.appendChild(renderScoreRows(snapshot));
}

async function loadTutorPlayers(provTutor) {
    setPaginationVisible(true);
    document.getElementById("title").innerHTML = 'Jugadores';

    const snapshot = await getTutorsPlayers(provTutor);
    paginator = new Paginator(snapshot.docs.map(d => d.data()));
    renderTutorPage();
}

function renderTutorPage() {
    table.innerHTML = "";
    table.appendChild(renderTableHeader(['Tutor', 'Jugador', 'Nickname', 'Registro']));
    table.appendChild(renderTutorRows(paginator.current));
}

document.getElementById("next").addEventListener("click", () => {
    if (paginator?.next()) renderTutorPage();
});

document.getElementById("back").addEventListener("click", () => {
    if (paginator?.back()) renderTutorPage();
});
