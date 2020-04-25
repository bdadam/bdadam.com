const cp = require('child_process');

const CheapWatch = require('cheap-watch');

const watch = new CheapWatch({ dir: 'dist', debounce: 50, filter: ({ path }) => path === 'server.js' });

watch.init();

let p = cp.fork('svelte/test2.js', { silent: false });

watch.on('+', () => {
    console.log('changed');

    if (p) {
        p.kill('SIGINT');
    }
    p = cp.fork('svelte/test2.js', { silent: false });
});
