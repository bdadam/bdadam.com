import { getSession } from './session';

type Event = {
    /** Pageview */
    pv: '1';

    /** Session start */
    st: '0' | '1';

    /** document.title */
    dt: string;

    /** window.location.href */
    dl: string;

    /** document.referrer */
    dr: string;

    /** screen resolution */
    sr: string;

    /** navigator.language */
    ul: string;
};

export function pageview() {
    const [sid, isNewSession] = getSession();
    const event: Event = {
        pv: '1',
        st: isNewSession ? '1' : '0',
        dt: document.title,
        dl: location.href,
        dr: document.referrer,
        sr: window.screen ? `${window.screen.width}x${window.screen.height}` : '',
        ul: navigator.language.toLowerCase(),
    };

    sendEvent(sid, event);
}

function sendEvent(sid: string, event: Event) {
    requestIdleCallback(() => {
        if (location.href.startsWith('https://')) {
            const query = new URLSearchParams({
                sid,
                ...event,
            });

            navigator.sendBeacon('/flamingo/hello?' + query.toString());
        } else {
            console.log({ sid, event });
        }
    });
}
