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
    .about {
        background-color: #224477;
        background-color: #135;
        background-color: #247;
        color: #fff;
        padding: 24px;
        padding-left: calc((100% - 1100px) / 2);
        padding-right: calc((100% - 1100px) / 2);

        a {
            color: #fff;
            text-decoration: underline;
        }
    }
</style>

<svelte:head>
    <title>Adam Beres-Deak</title>
    <meta
        name="description"
        content="My devblog about web development, cloud architecture, JavaScript, NodeJS, CSS, less" />
</svelte:head>

<PopularArticles />

<div class="about">
    <p>Hello and welcome to my blog. I'm Adam Beres-Deak. I'm a software engineer working in Munich, Germany.</p>
    <p>
        I have been professionally working on web projects since 2005.
        <a href="/about/">More about me</a>
        <!-- On this site I write about
        <a href="/tags/code/">code,</a>
        <a href="/tags/architecture/">architecture,</a>
        <a href="/tags/cloud/">cloud,</a>
        <a href="/tags/shell/">shell</a>
        and everything else I learn and want to share with others. -->
    </p>
    <!-- <p>
        If you like my work, you can
        <a href="/about/">hire me</a>
        .
    </p> -->
</div>
<div class="page-container">

    <h2>Latest articles</h2>

    <ArticleItemList articles={data.latestArticles} hideTags={true} />

    <!-- <a href="/blog/">Read more articles</a> -->

    <a href="/sitemap.xml" style="display: none;">sitemap.xml</a>
    <a href="/rss.xml" style="display: none;">rss.xml</a>
</div>
