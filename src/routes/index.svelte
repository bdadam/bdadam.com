<script context="module">
    export async function preload() {
        const res = await this.fetch(`/index.json`);
        const data = await res.json();

        return { data };
    }
</script>

<script>
    import ArticleItemList from '../components/ArticleItemList.svelte';
    import PopularArticles from '../components/PopularArticles.svelte';
    export let data;
</script>

<style lang="less">

</style>

<svelte:head>
    <title>Adam Beres-Deak</title>
    <meta
        name="description"
        content="My devblog about web development, cloud architecture, JavaScript, NodeJS, CSS, less" />
</svelte:head>

<PopularArticles />
<div class="page-container">

    <h2>Latest articles</h2>

    <ArticleItemList articles={data.latestArticles} />

    <!-- <a href="/blog/">Read more articles</a> -->

    <a href="/sitemap.xml" style="display: none;">sitemap.xml</a>
    <a href="/rss.xml" style="display: none;">rss.xml</a>
</div>
