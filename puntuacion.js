import firebase from './back/firebase.js'

const params = new URLSearchParams(window.location.search);
const score = params.get('score');
const newScore = params.get('newScore');

newScore == true?firebase.registerUserScore(localStorage.getItem("localnick"), score):false;