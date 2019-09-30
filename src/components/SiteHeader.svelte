<script>
    export let segment;
    let menuOpen = false;

    const openMenu = () => {
        menuOpen = !menuOpen;
    };
</script>

<style lang="less">
    header {
        border-bottom: 1px solid #ddd;
        margin-bottom: 24px;
        /* overflow-x: hidden; */
        /* background-image: url(/background2.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center; */

        /* background: rgb(131, 58, 180);
        background: linear-gradient(
            90deg,
            rgba(131, 58, 180, 1) 0%,
            rgba(253, 29, 29, 1) 50%,
            rgba(252, 176, 69, 1) 100%
        ); */

        /* background: rgb(194, 23, 95);
        background: linear-gradient(180deg, rgba(194, 23, 95, 1) 0%, rgba(89, 26, 26, 1) 100%); */

        /* background-color: #222;
        background-color: #0b0c09;
        background-color: #611;
        background-color: #161616; */

        border-bottom: 6px solid orange;
    }

    nav {
        display: flex;
        flex-direction: row;
        max-width: 1148px;
        margin: 0 auto;
        position: relative;

        /* &::after {
            content: '';
            display: block;
            position: absolute;
            bottom: -3px;
            width: calc(100% - 48px);
            left: 24px;
            border-bottom: 6px solid orange;
        } */
    }

    a {
        padding: 16px 24px;
        display: block;
        position: relative;
        display: block;
        text-decoration: none;
        color: #333;
        /* color: #f1f1f1; */
        font-variant: small-caps;
        font-size: 1.125em;

        &.selected {
            color: orange;
            /* &::after {
                content: '';
                display: block;
                position: absolute;
                // bottom: -1px;
                bottom: -3px;
                width: calc(100% - 48px);
                left: 24px;
                border-bottom: 6px solid orange;
            } */
        }
    }

    small.code {
        display: block;
        font-size: 0.8rem;
        color: #777;
        color: #ccc;
        color: #b9a8a8;
        font-family: monospace;
        font-variant: normal;

        &::before {
            content: '$';
            padding-right: 4px;
        }
    }

    button {
        position: absolute;
        position: relative;
        transition: 0.2s ease;
        border: 0;
        background-color: transparent;
        outline: 0;
        padding: 8px 0;
        /* margin-top: 1px; */
        max-height: 36px;
        /* font-size: 1em; */
        color: #fff;

        align-self: center;
        margin-left: auto;
        margin-right: 24px;

        span {
            vertical-align: middle;
            margin-right: 8px;
            margin-left: 8px;
            position: relative;
            display: inline-block;
            width: 24px;
            height: 3px;
            background-color: #fff;
            transition: background-color 0.1s;

            &.active {
                background: transparent;
            }

            &.active::before {
                /* transform-origin:  */
                /* transform: rotate(45deg) translate(3px, 5px); */
                /* transform: rotate(45deg) translate(3px, 5px); */
                transform-origin: center top;
                transform: translateY(8px) rotate(45deg);
                transform: translateY(8px);

                background: #ff7500;
                /* left: 2px; */
            }

            &.active::after {
                /* transform: rotate(-45deg) translate(3px, -6px); */
                transform-origin: center top;
                transform: translateY(-8px) rotate(-45deg);
                transform: translateY(-8px);
                background: #ff7500;
                /* left: 2px; */
            }

            &::before {
                transition: 0.2s ease-in-out;
                position: absolute;
                background: #fff;
                content: '';
                width: 100%;
                height: 3px;
                left: 0;
                top: -8px;
            }

            &::after {
                transition: 0.2s ease-in-out;
                position: absolute;
                background: #fff;
                content: '';
                width: 100%;
                height: 3px;
                left: 0;
                bottom: -8px;
            }
        }
    }
</style>

<header>
    <nav>
        <a class:selected={segment === undefined} href="/">
            <!-- BDAdam.com -->
            bdadam.com
            <small class="code" aria-hidden="true">cd ~</small>
        </a>
        <!-- <a class:selected={segment === 'blog'} href="/blog/">
            Articles
            <small class="code" aria-hidden="true">tree</small>
        </a> -->

        <!-- <a class:selected={segment === 'blog'} href="/blog/">
            Articles
            <small class="code" aria-hidden="true">tree</small>
        </a> -->

        <a class:selected={segment === 'about'} href="/about/">
            about
            <small class="code" aria-hidden="true">whoami</small>
        </a>

        <!-- <a class:selected={segment === 'aws'} href="/aws/">
            AWS series
            <small class="code" aria-hidden="true">ls aws</small>
        </a>

        <a class:selected={segment === 'aws'} href="/gcp/">
            Google Cloud series
            <small class="code" aria-hidden="true">ls gcp</small>
        </a> -->

        <button on:click={openMenu}>
            <!-- Menu -->
            <span class:active={menuOpen} />
        </button>

        <!-- <button on:click={() => document.body.classList.toggle('dark')}>Dark</button> -->
    </nav>
</header>
