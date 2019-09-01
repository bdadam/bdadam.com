<script>
    export let articles;
</script>

<style lang="less">
    .article-list {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            margin-bottom: 24px;
        }
    }

    .title-link {
        color: #333;
        font-size: 1.25em;
        font-weight: 700;
        display: block;
        margin-bottom: 8px;
        /* text-decoration: none; */

        /* &:hover {
            text-decoration: underline;
        } */
    }

    .date {
        color: #555;
        font-size: 0.875em;
        margin-bottom: 8px;
    }
</style>

<ul class="article-list">
    {#each articles as article}
        <li>
            <a class="title-link" href={article.url}>{article.title}</a>
            <p class="date">{article.dateFormatted} &middot; {article.tags.join(', ')}</p>
            <div class="abstract">
                {@html article.abstract}
            </div>
            <a href={article.url}>Read more...</a>
        </li>
    {/each}
</ul>
