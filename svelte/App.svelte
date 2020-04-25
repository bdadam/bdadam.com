<script>
    // import { Router, Link, Route } from 'svelte-routing';

    import Home from './Home.svelte';

    export let abc = 'undefined';
    export let url;

    console.log(url);
    // console.log('abc')
</script>

<style>
    div {
        background-color: #333;
    }
</style>

<svelte:head>
    <title>Test Title from App.svelte</title>
</svelte:head>

<div>
    <h1>Hello from {abc}</h1>

    <button on:click={() => console.log('abc')}>Click</button>
</div>

<!-- <Router {url}>
    <Route path="/">
        <Home />
    </Route>
</Router> -->
