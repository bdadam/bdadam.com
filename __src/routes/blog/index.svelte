<script context="module">
    export async function preload(page, session) {
        const res = await this.fetch(`/blog/data.json`);
        const data = await res.json();

        return data;
    }
</script>

<script>
    import ArticleItemList from '../../components/ArticleItemList.svelte';
    // import { onMount } from 'svelte';
    // import Prism from 'prismjs';

    export let articles;

    // onMount(() => {
    //     Prism.highlightAll();
    // });
</script>

<style lang="less">

</style>

<div class="page-container">
    <h1 class="page-title">Articles</h1>
    <ArticleItemList {articles} />
</div>
