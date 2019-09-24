<script>
    import { onMount } from 'svelte';
    import * as tracking from '../helpers/tracking';

    onMount(() => {
        tracking.trackPageview();
    });
</script>

<div class="page-container">
    <!-- <h1>Adam Beres-Deak</h1> -->
    <h1>About me</h1>
    Hi, my name is Adam. I am software engineer.
</div>
