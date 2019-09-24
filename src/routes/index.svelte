<script context="module">
    export async function preload() {
        const res = await this.fetch(`/index.json`);
        const data = await res.json();

        return { data };
    }
</script>

<script>
    import { onMount } from 'svelte';
    import ArticleItemList from '../components/ArticleItemList.svelte';
    import PopularArticles from '../components/PopularArticles.svelte';
    import SmallAboutBox from '../components/SmallAboutBox.svelte';

    import * as tracking from '../helpers/tracking';

    export let data;

    onMount(() => {
        tracking.trackPageview();
    });
</script>

<svelte:head>
    <title>Adam Beres-Deak</title>
    <meta name="description" content="Devblog about Web Development, Cloud Architecture, JavaScript, Node.js, CSS" />
</svelte:head>

<!-- <PopularArticles />

<SmallAboutBox /> -->

<div class="page-container">

    <h2>Latest articles</h2>

    <ArticleItemList articles={data.latestArticles} hideTags={true} />

    <!-- <a href="/blog/">Read more articles</a> -->

    <a href="/sitemap.xml" style="display: none;">sitemap.xml</a>
    <a href="/rss.xml" style="display: none;">rss.xml</a>
</div>
