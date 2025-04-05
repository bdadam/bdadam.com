import { getSession } from './session';

export type Event = {
    /** Event name */
    en: 'page_view' | 'share';

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

export type EventParams = Record<string, string>;

export function pageview() {
    const [sid, isNewSession] = getSession();
    const event: Event = {
        st: isNewSession ? '1' : '0',
        dt: document.title,
        dl: location.href,
        dr: document.referrer,
        sr: window.screen ? `${window.screen.width}x${window.screen.height}` : '',
        ul: navigator.language.toLowerCase(),
        en: 'page_view',
    };

    sendEvent(sid, event);
}

export function shareEvent(method: string, url: string) {
    const [sid, isNewSession] = getSession();
    const event: Event = {
        st: isNewSession ? '1' : '0',
        dt: document.title,
        dl: location.href,
        dr: document.referrer,
        sr: window.screen ? `${window.screen.width}x${window.screen.height}` : '',
        ul: navigator.language.toLowerCase(),
        en: 'share',
    };

    const params: EventParams = {
        method,
        url,
    };

    sendEvent(sid, event, params);
}

function sendEvent(sid: string, event: Event, params?: EventParams) {
    requestIdleCallback(() => {
        const query = new URLSearchParams({
            sid,
            ...event,
        });

        if (params) {
            Object.keys(params).forEach((key) => {
                query.append(`epn.${key}`, params[key] ?? '');
            });
        }

        if (location.hostname === 'bdadam.com') {
            navigator.sendBeacon('/flamingo/hello?' + query.toString());
        }
    });
}
