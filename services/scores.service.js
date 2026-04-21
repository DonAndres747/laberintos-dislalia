import { collection, addDoc, getDocs, query, where, orderBy, limit, Timestamp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from '../back/firebase.js';
import { Session } from '../back/session.js';
import { PAGINATION_SIZE } from '../back/constants.js';

export const registerUserScore = async (score, answered, correct) => {
    await addDoc(collection(db, "UserScores"), {
        nickname: Session.getNick(),
        score,
        answered: Number(answered) || 0,
        correct: Number(correct) || 0,
        tutor: Session.getTutor(),
        date: Timestamp.fromDate(new Date()),
    });
};

export const getUserScores = async (user) => {
    const nick = user ?? Session.getNick();
    const q = query(
        collection(db, "UserScores"),
        where("nickname", "==", nick),
        orderBy("date", "desc"),
        limit(PAGINATION_SIZE)
    );
    return getDocs(q);
};

export const getTutorsPlayers = async (tutor) => {
    const localTutor = tutor ?? Session.getTutor();
    const q = query(
        collection(db, "Users"),
        where("tutor", "==", localTutor),
        orderBy("registrationDate", "desc")
    );
    return getDocs(q);
};
