import firebase from './back/firebase.js'

const params = new URLSearchParams(window.location.search);
const score = params.get('score');
const newScore = params.get('newScore');
const allowSeach = params.get('allowSeach');
console.log(newScore)

// newScore == 'true' ? firebase.registerUserScore(localStorage.getItem("localnick"), score) : console.log("noNewScore");


// const scores = await firebase.getUserScores(localStorage.getItem("localnick"))

// scores.forEach((doc) => {
//     const data = doc.data();
//     const timestamp = data.date.toDate();
//     const formattedDate = `${timestamp.toLocaleDateString()}-${timestamp.toLocaleTimeString()}`;
//     console.log(doc.id, "=>", "nickname:", data.nickname, ", score:", data.score, ", date:", formattedDate);
// });