// import fs from 'fs-extra';

export async function get(req, res, next) {
    const data = {
        latestArticles: [
            {
                title: 'Displaying icons with custom elements',
                abstract:
                    'I created a technique for using SVG icons without pain with a simple gulp task. Since HTTP/2 is not widely supported yet, it has always been a pain to use icons on web pages. There are many ways to include icons and all of them have some tradeoffs. This interesting technique shows a way to include SVG-icons in a cross-browser way with using custom elements.',
                date: '14th October 2015',
                url: '/blog/displaying-icons-with-custom-elements/',
            },
            {
                title: 'Plain JavaScript event delegation',
                abstract:
                    "Event delegation is a powerful concept of event handling. If you are using jQuery, you might know it as jQuery.on(). Since I don't use jQuery anymore, I had to write a similar function myself. If you are wondering how the code looks like, read on.",
                date: '26th January 2015',
                url: '/blog/plain-javascript-event-delegation/',
            },
            {
                title: 'After the first year of blogging - what happened on my blog in 2014?',
                abstract:
                    "I wish you all a happy new year and much fun and success for 2015! Let's have a quick review of the past 365 days.",
                date: '1st January 2015',
                url: '/blog/first-year-of-blogging/',
            },
            {
                title: 'Better webfont loading with using localStorage and providing WOFF2 support',
                abstract:
                    'In my previous [article about webfont loading](/blog/loading-webfonts-with-high-performance.html) I showed a technique about how to load webfonts without blocking page rendering and without annoying the users with flickering text on all pageloads. This time I show you an optimized version of the script and provide a solution for WOFF2 support for the newest browsers.',
                date: '18th December 2014',
                url: '/blog/better-webfont-loading-with-localstorage-and-woff2/',
            },
            {
                title: 'Worth watching: Douglas Crockford speaking about the new good parts of JavaScript in 2014',
                abstract:
                    'At the Nordic.js 2014 Douglas Crockford was giving a talk about what he considers to be "the good parts" of JavaScript in 2014. He talks about ECMAScript6, what parts of it he could already identify as the new good parts, and of which he thinks, that they are going to be the new bad parts. Read on for my summary or just whatch the video.',
                date: '20th October 2014',
                url: '/blog/video-douglas-crockford-about-the-new-good-parts/',
            },
        ],
    };

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}
