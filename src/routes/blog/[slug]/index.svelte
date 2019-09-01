<script context="module">
    export async function preload(page, session) {
        const { slug } = page.params;
        const res = await this.fetch(`/blog/${slug}/data.json`);
        const data = await res.json();

        return { ...data, slug };
    }
</script>

<script>
    import { onMount } from 'svelte';

    import Prism from 'prismjs';
    import 'prismjs/components/prism-markup-templating';
    import 'prismjs/components/prism-handlebars';

    export let url;
    export let slug;
    export let title;
    export let date;
    export let dateFormatted;
    export let description;
    export let abstract;
    export let content;
    export let tags;
    export let commentsLoaded = false;

    function loadComments() {
        commentsLoaded = true;
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
        s.onload = () => console.log('load');
        document.head.appendChild(s);
    }

    onMount(() => {
        Prism.highlightAll();

        if (location.hash.startsWith('#comment-')) {
            loadComments();
        }
    });
</script>

<style lang="less">
    .article-meta {
        color: #555;
        margin-bottom: 8px;
        font-size: 0.875em;
    }

    .article-abstract {
        margin-bottom: 12px;
    }
</style>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <!-- <meta name="og:description" content={abstra} /> -->
    <link rel="canonical" href={`https://bdadam.com${url}`} />
</svelte:head>

<div class="page-container">
    <h1 class="page-title">{title}</h1>

    <p class="article-meta">{dateFormatted} | {tags.join(', ')}</p>

    <div class="article-abstract">
        {@html abstract}
    </div>

    <div class="article-content">
        {@html content}
    </div>

    {#if !commentsLoaded}
        <button on:click={loadComments}>Load Comments...</button>
    {/if}
    <div id="disqus_thread" />
</div>
