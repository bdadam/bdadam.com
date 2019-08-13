<script>
  export let segment;
</script>

<style lang="less">
  header {
    nav {
      display: flex;
      flex-direction: row;
    }
    a {
      padding: 16px 24px;
      display: block;

      &.selected {
        /* border: 1px solid red; */
        color: orange;
      }
    }
  }
</style>

<header>
  <nav>
    <a class:selected={segment === undefined} href="/">Home</a>
    <a class:selected={segment === 'about.html'} href="/about.html">About</a>
  </nav>
</header>
