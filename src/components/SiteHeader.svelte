<script>
    export let segment;
</script>

<style lang="less">
    header {
        border-bottom: 1px solid #ddd;
        nav {
            display: flex;
            flex-direction: row;
            max-width: 1148px;
            margin: 0 auto;
        }
        a {
            padding: 16px 24px;
            display: block;
            position: relative;
            display: block;
            text-decoration: none;
            color: #333;

            &.selected {
                /* border: 1px solid red; */
                color: orange;
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    bottom: -1px;
                    width: calc(100% - 48px);
                    left: 24px;
                    border-bottom: 2px solid orange;
                }
            }
        }
    }

    .home-link {
        font-variant: small-caps;
    }
</style>

<header>
    <nav>
        <a class:selected={segment === undefined} class="home-link" href="/">BDAdam.com</a>
        <a class:selected={segment === 'about'} href="/about/">About</a>
    </nav>
</header>
