<script>
    import { onMount } from 'svelte';

    export let slug;
    let commentsLoading = false;
    let commentsLoaded = false;

    function loadComments() {
        commentsLoading = true;
        // commentsLoaded = true;
        window.disqus_shortname = 'bdadamcom';
        window.disqus_config = function() {
            this.page.title = document.title;
            this.page.identifier = `http://bdadam.com/blog/${slug}.html`;
            this.page.url = `http://bdadam.com/blog/${slug}.html`;
        };

        if (window.DISQUS) {
            window.DISQUS.reset({ reload: true });
            return;
        }

        const dqurl = 'https://bdadamcom.disqus.com/embed.js';
        const s = document.createElement('script');
        s.src = 'https://bdadamcom.disqus.com/embed.js';
        s.onload = () => (commentsLoaded = true);
        document.head.appendChild(s);
    }

    onMount(() => {
        if (location.hash.startsWith('#comment-')) {
            loadComments();
        }
    });
</script>

<style lang="less">
    button {
        display: block;
        width: 60%;
        padding: 1em;
        text-align: center;
        margin: 0 auto;
        background-color: #ececec;
        border: 2px solid #aaa;
        border-radius: 0.3em;

        &:hover {
            background-color: darken(#ececec, 10%);
        }
        &:focus {
            background-color: darken(#ececec, 15%);
        }

        small {
            display: block;
            font-size: 0.875em;
            color: #434343;
        }
    }
</style>

{#if !commentsLoaded}
    <button on:click={loadComments} disabled={commentsLoading}>
        Load Comments
        <small>(from Disqus)</small>
    </button>
{/if}
<div id="disqus_thread" />
