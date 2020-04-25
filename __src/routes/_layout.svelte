<script>
    import SiteHeader from '../components/SiteHeader.svelte';
    import SiteFooter from '../components/SiteFooter.svelte';

    export let segment;

    // typeof window === 'object' && console.log(window.matchMedia('(max-width: 600px)'));
    // typeof window === 'object' && console.log(window.matchMedia('(prefers-color-scheme: dark)'));
</script>

<style lang="less" global>
    @import '../styles/global.less';
</style>

<SiteHeader {segment} />

<slot />

<SiteFooter />
