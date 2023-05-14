import firebase from './back/firebase.js'

const params = new URLSearchParams(window.location.search);
const score = params.get('score');
const newScore = params.get('newScore');
const table = document.querySelector("table")
let start = 0
let start2
let proTutorL = ''
var Div = window.parent.document.querySelector('iframe');


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
    firebase.registerUserScore(score),
    document.getElementById("search").setAttribute("style", "display:none"),
    getPlayerScore()
) : console.log("noNewScore");

document.getElementById("nicknameInput").addEventListener("blur", (e) => {
    const provNick = e.target.value;
    try {
        getPlayerScore(provNick)
    } catch (error) {

    }
})

document.getElementById("tutorInput").addEventListener("blur", (e) => {
    const provTutor = e.target.value;
    getTutorsPlayers(provTutor)
})



async function getPlayerScore(provNick) {
    document.getElementById('back').setAttribute("hidden", "true")
    document.getElementById('next').setAttribute("hidden", "true")
    document.getElementById("title").innerHTML = 'Puntuaciones'
    const scores = await firebase.getUserScores(provNick)

    table.innerHTML = ""
    const headerRow = document.createElement('thead')
    headerRow.innerHTML += `<tr>
    <th>Nickname</th>
    <th>Score</th>
    <th>Tutor</th>
    <th>Fecha</th>
    </tr>`
    table.appendChild(headerRow);

    let bodyrow = document.createElement("tbody")
    scores.forEach((doc) => {
        const data = doc.data();
        const timestamp = data.date.toDate();
        const formattedDate = `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes() < 10 ? '0' + timestamp.getMinutes() : timestamp.getMinutes()}`;

        const row = document.createElement('tr');
        row.innerHTML = `<td>${data.nickname}</td>
          <td>${data.score}</td>
          <td>${data.tutor}</td>
          <td>${formattedDate}</td>`;

        bodyrow.appendChild(row);
    });
    table.appendChild(bodyrow);
}

async function getTutorsPlayersData(provTutor) {
    const scores = await firebase.getTutorsPlayers(provTutor)
    let data1 = []
    scores.forEach((doc) => {
        data1.push(doc.data());
    });
    return data1
}

function addTutorRow(data) {
    const timestamp = data.registrationDate.toDate();
    const formattedDate = `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes() < 10 ? '0' + timestamp.getMinutes() : timestamp.getMinutes()}`;

    const row = document.createElement('tr');
    row.innerHTML = `<td>${data.tutor}</td>
        <td>${data.username}</td>
        <td>${data.nickname}</td>
        <td>${formattedDate}</td>`;

    return row

}



async function getTutorsPlayers(provTutor) {
    document.getElementById('back').removeAttribute("hidden")
    document.getElementById('next').removeAttribute("hidden")
    document.getElementById("title").innerHTML = 'Jugadores'
    proTutorL = provTutor
    start = 0
    let data1 = []
    data1 = await getTutorsPlayersData(provTutor)

    table.innerHTML = ""
    const headerRow = document.createElement('thead')
    headerRow.innerHTML += `<tr>
    <th>Tutor</th>
    <th>Jugador</th>
    <th>Nickname</th>
    <th>Registro</th>
    </tr>`
    table.appendChild(headerRow);

    let bodyrow = document.createElement("tbody")
    for (let i = 0; i < 4; i++) {
        const data = data1[i];
        let row = addTutorRow(data);
        bodyrow.appendChild(row);
    }
    table.appendChild(bodyrow)
    start = 4
}

document.getElementById("next").addEventListener("click", async (e) => {
    let data1 = []
    data1 = await getTutorsPlayersData(proTutorL)

    if (start < data1.length) {
        const bodyrow = document.querySelector('tbody')
        try {
            bodyrow.innerHTML = ''

            try {
                for (let i = 0; i < 4; i++) {
                    const data = data1[start + i];
                    let row = addTutorRow(data);
                    bodyrow.appendChild(row);
                }
            } catch (error) {

            }
            start = start + 4
            table.appendChild(bodyrow)
        } catch (error) {

        }
    }
})

document.getElementById("back").addEventListener("click", async (e) => {
    let data1 = []
    data1 = await getTutorsPlayersData(proTutorL)

    if (start > 4) {
        const bodyrow = document.querySelector('tbody')
        try {
            bodyrow.innerHTML = ''
            try {
                for (let i = 0; i < 4; i++) {
                    const data = data1[start - 8 + i];
                    let row = addTutorRow(data);
                    bodyrow.appendChild(row);
                }
            } catch (error) {

            }
            start = ((start - 4) == 0 ? 4 : (start - 4));
            table.appendChild(bodyrow)
        } catch (error) {

        }
    }
})

