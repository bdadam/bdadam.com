<script>
    export let segment;
</script>

<style lang="less">
    header {
        border-bottom: 1px solid #ddd;
    }

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
        font-variant: small-caps;

        &.selected {
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

    small.code {
        display: block;
        font-size: 0.8rem;
        color: #777;
        font-family: monospace;
        font-variant: normal;

        &::before {
            content: '$';
            padding-right: 4px;
        }
    }
</style>

<header>
    <nav>
        <a class:selected={segment === undefined} href="/">
            BDAdam.com
            <small class="code" aria-hidden="true">cd ~</small>
        </a>
        <!-- <a class:selected={segment === 'blog'} href="/blog/">
            Articles
            <small class="code" aria-hidden="true">tree</small>
        </a> -->
        <a class:selected={segment === 'about'} href="/about/">
            About
            <small class="code" aria-hidden="true">whoami</small>
        </a>
    </nav>
</header>
