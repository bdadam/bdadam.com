import { getSession } from './session';

type Event = {
    /** Pageview */
    pv: 1;

    /** Session start */
    st: 0 | 1;

    /** document.title */
    ti: string;

    /** window.location.href */
    lo: string;

    /** document.referrer */
    re: string;

    /** screen resolution */
    sr: string;
};

export function pageview() {
    const [sid, isNewSession] = getSession();
    const event: Event = {
        pv: 1,
        st: isNewSession ? 1 : 0,
        ti: document.title,
        lo: location.href,
        re: document.referrer,
        sr: window.screen ? `${window.screen.width}x${window.screen.height}` : '',
    };

    sendEvent(sid, event);
}

function sendEvent(sid: string, event: Event) {
    requestIdleCallback(() => {
        if (location.href.startsWith('https://')) {
            navigator.sendBeacon(`/flamingo/hello`, JSON.stringify({ s: sid, e: [event] }));
        } else {
            console.log({ s: sid, e: [event] });
        }
    });
}
