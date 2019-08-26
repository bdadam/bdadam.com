<script context="module">
    export async function preload() {
        const res = await this.fetch(`/index.json`);
        const data = await res.json();

        // console.log(data);

        return { data };

        // ...
    }
</script>

<script>
    export let data;
</script>

<style>
    .latest-articles {
        list-style: none;
    }
</style>

<div class="page-container">
    <h2>Latest articles</h2>
    <ul class="latest-articles">
        {#each data.latestArticles as article}
            <li>
                <a href={article.url}>{article.title}</a>
                <p>{article.date}</p>
                <p>{article.abstract}</p>
            </li>
        {/each}
    </ul>

    <a href="/blog/">Read more articles</a>
</div>
