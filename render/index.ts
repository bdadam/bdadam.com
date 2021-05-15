import { spawn } from 'child_process';

(async function run() {
    const server = spawn(process.execPath, ['-r', 'ts-node/register', 'render/server.ts'], {
        env: { NODE_ENV: 'production' },
    });

    server.stdout!.pipe(process.stdout);
    server.stderr!.pipe(process.stderr);

    await waitForReady();

    const wget = spawn(
        'wget',
        ['--mirror', '-P', 'out', '--page-requisites', '--no-parent', '-nH', 'http://localhost:3000'],
        { stdio: 'inherit' }
    );

    wget.on('exit', () => {
        console.log('wget exit');
        server.kill('SIGINT');
    });
})();

import http from 'http';

async function waitForReady() {
    return new Promise((resolve, reject) => {
        const int = setInterval(() => {
            http.get('http://localhost:3000', (res) => {
                if (res.statusCode === 200) {
                    clearInterval(int);
                    resolve(null);
                } else {
                    console.log('not yet');
                }
            }).on('error', (e) => {
                // console.log(e);
            });
        });
    });
}
