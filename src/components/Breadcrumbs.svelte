<script>
    import JsonLD from '../components/JsonLD.svelte';

    export let links;

    const jsonld = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: links.map((l, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: l.name,
            item: l.href,
        })),
    };
</script>

<style lang="less">
    ol {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        font-size: 0;
    }

    li {
        a {
            font-size: 1rem;
        }

        &:not(:first-of-type)::before {
            font-size: 1rem;
            content: '»';
            padding: 0 4px;
        }
    }
</style>

<ol>
    {#each links as link}
        <li>
            <a href={link.href}>{link.name}</a>
        </li>
    {/each}
</ol>

<JsonLD data={jsonld} />
