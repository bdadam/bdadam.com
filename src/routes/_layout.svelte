<script>
  import SiteHeader from "../components/SiteHeader.svelte";
  import SiteFooter from "../components/SiteFooter.svelte";

  export let segment;
</script>

<style lang="less">
  :global(html, body, article, p, div, form) {
    padding: 0;
    margin: 0;
  }
  :global(*, *::before, *::after) {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  :global(html) {
    box-sizing: border-box;
    font-size: 100%;
  }

  :global(body) {
    overflow-x: hidden;
    min-height: 100%;
    -webkit-font-smoothing: antialiased;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif;
    font-size: calc(1rem + 0.25vw);
    line-height: 1.38;
    /* font-family:  */
  }

  :global(#app) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  :global(.page-container) {
    max-width: 1148px;
    padding: 24px;
    margin: 0 auto;
    flex: 1;
  }
</style>

<SiteHeader {segment} />

<slot />

<SiteFooter />
