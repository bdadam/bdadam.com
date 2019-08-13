<script>
  import SiteHeader from "../components/SiteHeader.svelte";

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
    /* display: flex; */
    -webkit-font-smoothing: antialiased;
    font-size: calc(1rem + 0.25vw);
    line-height: 1.38;
    /* font-family:  */
  }
</style>

<SiteHeader {segment} />

<slot />

<footer>FOOTER</footer>
