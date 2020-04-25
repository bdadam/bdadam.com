import App from './App.svelte';

console.log(document.querySelector('#app'));

const app = new App({
    target: document.querySelector('#app'),
    hydrate: true,
    props: {
        abc: 'CLIENT 2',
        url: window.location.pathname,
    },
});
