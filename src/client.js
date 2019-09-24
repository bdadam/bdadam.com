import * as sapper from '@sapper/app';

import { setup } from './helpers/tracking';

setup({ tid: 'UA-111111111111' });

sapper.start({
    target: document.querySelector('#app'),
});
