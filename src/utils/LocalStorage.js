const KEY_USER_ACTIVE = 'userActive';

const KEY_HISTORY = 'resume';


export function isUserActive() {
    return localStorage.getItem(KEY_USER_ACTIVE) !== null;
}

export function isUserInactive(){
    return localStorage.getItem(KEY_USER_ACTIVE) === null;
}


export function setUser(payload) {
    localStorage.setItem(KEY_USER_ACTIVE, JSON.stringify(payload));
}

export function getUser() {
    return JSON.parse(localStorage.getItem(KEY_USER_ACTIVE));
}


export function setHistory(payload) {
    localStorage.setItem(KEY_HISTORY, JSON.stringify(payload));
}

export function getHistory() {
    return JSON.parse(localStorage.getItem(KEY_HISTORY));
}

export function cleanLocalStorage() {
    localStorage.removeItem(KEY_USER_ACTIVE);
    localStorage.removeItem(KEY_HISTORY);
    localStorage.clear();
}
