let referrer = (typeof document === 'object' && document.referrer) || '';

// see: https://gist.github.com/DavidKuennen/443121e692175d6fc145e1efb0284ec9

const generateParams = () => {
    const doc = document;
    const win = window;
    const screen = window.screen;

    return {
        v: 1,
        ds: 'web',
        aip: 1,
        tid: 'UA-XXXXXXXX',
        sd: `${screen.colorDepth}-bits`,
        dt: doc.title,
        dl: doc.location.origin + doc.location.pathname + doc.location.search,
        ul: navigator.language.toLowerCase(),
        de: doc.characterSet,
        sr: (screen && screen.width && screen.height && `${screen.width}x${screen.height}`) || '',
        vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,

        // t: pageview,
    };
};

export const trackPageview = () => {
    console.log('Pageview');
    console.log(referrer);

    referrer = document.location.href;
    console.log(referrer);
};

export const trackEvent = () => {
    console.log('EVENT');
};
