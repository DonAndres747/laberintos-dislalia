import firebase from './back/firebase.js'

const params = new URLSearchParams(window.location.search);
const score = params.get('score');
const newScore = params.get('newScore');
const table = document.querySelector("table")
var Div = window.parent.document.querySelector('iframe');

const playerNick = localStorage.getItem("localnick")
const localTutor = localStorage.getItem("localtutor")


document.querySelector("button").innerText = (newScore == 'true' ? ("Reiniciar") : ("Volver"))
document.querySelector("button").addEventListener("click", (e) => {
    e.preventDefault();
    (newScore == 'true' ?
        (
            window.parent.location.reload()
        ) :
        (
            Div.setAttribute("src", "./login.html")
        )
    )
})

newScore == 'true' ? (
    firebase.registerUserScore(playerNick, score, localTutor),
    document.getElementById("search").setAttribute("style", "display:none"),
    getPlayerScore(playerNick)
) : console.log("noNewScore");

document.getElementById("nicknameInput").addEventListener("blur", (e) => {
    const provNick = e.target.value;
    getPlayerScore(provNick)
})

document.getElementById("tutorInput").addEventListener("blur", (e) => {
    const provTutor = e.target.value;
    getTutorsPlayers(provTutor)
})


async function getPlayerScore(playerNick) {
    const scores = await firebase.getUserScores(playerNick)

    table.innerHTML = ""
    table.innerHTML += `<tr>
    <th>Nickname</th>
    <th>Score</th>
    <th>Tutor</th>
    <th>Fecha</th>
    </tr>`

    scores.forEach((doc) => {
        const data = doc.data();
        const timestamp = data.date.toDate();
        const formattedDate = `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes() < 10 ? '0' + timestamp.getMinutes() : timestamp.getMinutes()}`;

        const row = document.createElement('tr');
        row.innerHTML = `<td>${data.nickname}</td>
          <td>${data.score}</td>
          <td>${data.tutor}</td>
          <td>${formattedDate}</td>`;

        table.appendChild(row);
    });
}

async function getTutorsPlayers(tutorName) {
    const scores = await firebase.getTutorsPlayers(tutorName)

    table.innerHTML = ""
    table.innerHTML += `<tr>
    <th>Tutor</th>
    <th>Jugador</th>
    <th>Nickname</th>
    <th>Registro</th>
    </tr>`

    scores.forEach((doc) => {
        const data = doc.data();
        const timestamp = data.registrationDate.toDate();
        const formattedDate = `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes() < 10 ? '0' + timestamp.getMinutes() : timestamp.getMinutes()}`;

        const row = document.createElement('tr');
        row.innerHTML = `<td>${data.tutor}</td>
          <td>${data.username}</td>
          <td>${data.nickname}</td>
          <td>${formattedDate}</td>`

        table.appendChild(row);
    });
}