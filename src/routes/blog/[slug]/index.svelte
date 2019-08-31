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

    export let slug;
    export let title;
    export let abstract;
    export let content;

    onMount(() => {
        Prism.highlightAll();
    });
</script>

<div class="page-container">
    <h1>{title}</h1>

    <div class="abstract">
        {@html abstract}
    </div>

    <div class="content">
        {@html content}
    </div>
</div>

<!-- Hello {JSON.stringify(data)} -->
