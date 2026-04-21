export const Session = {
    setNick: (v) => localStorage.setItem('localnick', v),
    getNick: () => localStorage.getItem('localnick'),
    setTutor: (v) => localStorage.setItem('localtutor', v),
    getTutor: () => localStorage.getItem('localtutor'),
    clear: () => localStorage.clear(),
};
