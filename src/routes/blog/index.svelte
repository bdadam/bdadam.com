<script context="module">
    export async function preload(page, session) {
        const res = await this.fetch(`/blog/data.json`);
        const data = await res.json();

        return data;
    }
</script>

<script>
    // import { onMount } from 'svelte';
    // import Prism from 'prismjs';

    export let articles;

    // onMount(() => {
    //     Prism.highlightAll();
    // });
</script>

<div class="page-container">
    <h1>Articles</h1>
    <ul>
        {#each articles as article}
            <li>
                <a href={article.url}>{article.title}</a>
                <p>{article.dateFormatted}</p>
                <div>
                    {@html article.abstract}
                </div>
                <a href={article.url}>Read more...</a>
            </li>
        {/each}
    </ul>
</div>
