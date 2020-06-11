// let referrer = (typeof document === 'object' && document.referrer) || '';

// see: https://gist.github.com/DavidKuennen/443121e692175d6fc145e1efb0284ec9

// const tid = 'UA-XXXXXXXX';

const defaults = { aip: 1 };

let firstPageView = true;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const getcid = () => {
    const cid = localStorage.cid || uuidv4();
    localStorage.setItem('cid', cid);
    return cid;
};

const generateParams = (type) => {
    const doc = document;
    const screen = window.screen;

    return {
        ...defaults,
        z: Math.random(),
        v: 1,
        ds: 'web',
        t: type,
        sd: `${screen.colorDepth}-bits`,
        dt: doc.title,
        dl: doc.location.origin + doc.location.pathname + doc.location.search,
        ul: navigator.language.toLowerCase(),
        de: doc.characterSet,
        sr: (screen && `${screen.width}x${screen.height}`) || '',
        vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
        ...(type === 'pageview' && firstPageView && { dr: document.referrer }),
        cid: getcid(),
    };
};

const serialize = (obj) => {
    return Object.keys(obj)
        .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
        .join('&');
};

const send = (payload) => {
    const url = 'https://www.google-analytics.com/collect';
    if (navigator.sendBeacon) {
        var contentType = 'application/x-www-form-urlencoded';
        var requestBlob = new Blob([payload], { type: contentType });
        navigator.sendBeacon(url, requestBlob);
    } else {
        // TODO
        new Image().src = `${url}?payload`;
    }
};

const removeUTMParamsFromUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramsToDelete = [...searchParams]
        .filter(([name, value]) => name.startsWith('utm_') || name === 'gclid')
        .map((p) => p[0]);

    paramsToDelete.forEach((p) => searchParams.delete(p));

    const q = searchParams.toString();
    const query = q ? `?${q}` : '';

    history.replaceState(null, null, window.location.pathname + query);
};

export const trackPageview = () => {
    const params = generateParams('pageview');
    firstPageView = false;

    if (window.location.hostname === 'bdadam.com') {
        send(serialize(params));
    } else {
        console.log('Pageview', params);
    }

    removeUTMParamsFromUrl();
};

export const trackEvent = () => {
    // TODO: implement event tracking
    console.log('EVENT');
};

export const setup = (options) => {
    // console.log('SETUP', defaults);
    Object.keys(options).forEach((key) => (defaults[key] = options[key]));
};
