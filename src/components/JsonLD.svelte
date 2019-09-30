<script>
    export let data;

    const script = ['<script ', 'type="application/ld+json">', JSON.stringify(data), '<', '/', 'script>'].join('');
</script>

{@html script}
