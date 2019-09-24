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

    import ShareButtons from '../../../components/ShareButtons.svelte';
    import ArticleComments from '../../../components/ArticleComments.svelte';
    import * as tracking from '../../../helpers/tracking';

    export let url;
    export let slug;
    export let title;
    export let date;
    export let dateFormatted;
    export let reviewedAt;
    export let reviewedAtFormatted;
    export let deprecation;
    export let description;
    export let abstract;
    export let content;
    export let tags;
    export let commentsLoaded = false;

    const canonical = `https://bdadam.com${url}`;

    function resizeIframesInside(node) {
        const iframes = [...node.querySelectorAll('iframe[srcdoc]')];

        const resize = iframe => {
            const html = iframe.contentWindow.document.documentElement;
            const body = iframe.contentWindow.document.body;

            const height = Math.max(
                body.scrollHeight,
                body.offsetHeight
                // html.clientHeight,
                // html.scrollHeight,
                // html.offsetHeight
            );

            iframe.style.height = `${height}px`;
        };

        iframes.forEach(iframe => {
            resize(iframe);
            iframe.contentWindow.addEventListener('resize', () => resize(iframe));
            iframe.contentWindow.addEventListener('load', () => resize(iframe));
        });
    }

    onMount(() => {
        tracking.trackPageview();
        import('../../../helpers/prism.js').then(Prism => Prism.default.highlightAll());
    });
</script>

<style>
    .article-meta {
        color: #555;
        margin-bottom: 8px;
        font-size: 0.875em;
    }

    .deprecation-note {
        padding: 20px;
        background-color: #fdb;
        margin-bottom: 12px;
        border-radius: 4px;
    }

    .article-abstract {
        margin-bottom: 12px;
    }

    .share-buttons {
        margin: 24px 0;
    }

    /* .comments {
    } */
</style>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <!-- <meta name="og:description" content={abstra} /> -->
    <link rel="canonical" href={canonical} />
</svelte:head>

<div class="page-container">
    <h1 class="page-title">{title}</h1>

    <p class="article-meta">
        {#if reviewedAtFormatted}
            Reviewed {reviewedAtFormatted}, first published {dateFormatted}
        {:else}Published {dateFormatted}{/if}
        | {tags.join(', ')}
    </p>

    {#if deprecation}
        <div class="deprecation-note">
            {@html deprecation}
        </div>
    {/if}

    <div class="article-abstract">
        {@html abstract}
    </div>

    <div class="article-content" use:resizeIframesInside>
        {@html content}
    </div>

    <div class="share-buttons">
        <!-- <p class="h3">Share this article</p> -->
        <ShareButtons url={canonical} {title} {tags} />
    </div>

    <div class="comments">
        <ArticleComments {slug} />
    </div>

</div>
