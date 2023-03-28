import { isDomNode } from './utils';

console.log('main');

const u = sessionStorage.getItem('u') || crypto.randomUUID();
sessionStorage.removeItem('u');

console.log('Use u', u);

window.addEventListener('visibilitychange', (e) => {
    if (document.hidden) {
        sessionStorage.setItem('u', u);
    } else {
        sessionStorage.removeItem('u');
    }

    // navigator.sendBeacon(`/events/pageview/${uid}`);
});

window.addEventListener('click', (e) => {
    if (!isDomNode(e.target) || !e.target.closest('a')) {
        return;
    }

    console.log('Click on link');
});
