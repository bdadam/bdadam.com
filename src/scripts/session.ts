const sessionStorageKey = 's';

const sidFromSessionStorage = sessionStorage.getItem(sessionStorageKey);
const sid = sidFromSessionStorage || crypto.randomUUID();
const isNewSession = !sidFromSessionStorage;

export function getSession(): [sid: string, isNewSession: boolean] {
    return [sid, isNewSession];
}

export function saveSession(): void {
    sessionStorage.setItem(sessionStorageKey, sid);
}

export function manageSession(): void {
    window.addEventListener('visibilitychange', (e) => {
        if (document.hidden) {
            sessionStorage.setItem(sessionStorageKey, sid);
        } else {
            sessionStorage.removeItem(sessionStorageKey);
        }
    });
}
