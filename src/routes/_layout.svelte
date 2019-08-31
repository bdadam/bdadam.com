<script>
    import SiteHeader from '../components/SiteHeader.svelte';
    import SiteFooter from '../components/SiteFooter.svelte';

    export let segment;
</script>

<style lang="less" global>
    @import '../styles/global.less';
</style>

<SiteHeader {segment} />

<slot />

<SiteFooter />
