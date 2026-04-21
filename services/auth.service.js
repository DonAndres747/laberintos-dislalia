import { doc, setDoc, getDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { db } from '../back/firebase.js';
import { Session } from '../back/session.js';
import { hashPassword } from '../back/crypto.js';

export const registerUser = async (username, nickname, tutor, age, password, repPass) => {
    if (!username || !nickname || !tutor || !age || !password || !repPass) {
        return { statusCode: 422 };
    }
    if (password !== repPass) return { statusCode: 8008 };

    try {
        const docRef = doc(db, "Users", nickname);
        const snap = await getDoc(docRef);
        if (snap.exists()) return { statusCode: 1062 };

        const hashedPassword = await hashPassword(password);
        await setDoc(docRef, {
            username, nickname, tutor, age,
            password: hashedPassword,
            registrationDate: Timestamp.fromDate(new Date()),
        });
        Session.setNick(nickname);
        Session.setTutor(tutor);
        return { statusCode: 200 };
    } catch (error) {
        return { statusCode: error.code };
    }
};

export const authLogin = async (nickname, password) => {
    try {
        const docSnap = await getDoc(doc(db, "Users", nickname));
        if (!docSnap.exists()) return { statusCode: 406 };

        const data = docSnap.data();
        const inputHash = await hashPassword(password);
        if (inputHash !== data.password) return { statusCode: 406 };

        Session.setNick(data.nickname);
        Session.setTutor(data.tutor);
        return { statusCode: 200 };
    } catch {
        return { statusCode: 406 };
    }
};
