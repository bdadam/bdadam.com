import nunjucks from 'nunjucks';
import fs from 'fs-extra';
// import svelte from 'svelte';

export default async () => {
    // svelte.
    // nunjucks.ren;
    const x = nunjucks.precompileString(fs.readFileSync('templates/home.html', 'utf-8'), { name: 'home' });

    console.log(x);
};
