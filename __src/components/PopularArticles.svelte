<style lang="less">
    .most-popular-box {
        background-color: #f1f1f1;
        padding: 6px 0 6px 24px;
        /* display: flex; */
        /* flex-direction: row; */
        /* align-items: center; */
        /* justify-content: center; */
        /* padding: 12px 24px; */ /* padding-left: 24px; */ /* padding-right: 24px; */
        /* overflow-x: auto; */ /* position: relative; */
        @media (min-width: 1148px) {
            padding-left: calc((100% - 1100px) / 2);
            padding-right: calc((100% - 1100px) / 2);
        }

        a:first-of-type {
            margin-left: 6px;
        }

        a {
            /* display: block; */
            /* float: left; */
            display: inline-block;
            /* padding-top: 6px; */
            /* padding-bottom: 6px; */
            /* margin-left: 6px; */
            /* margin-right: 6px; */
        }
    }

    /* a:not(:first-of-type)::before {
        content: '\b7';
        padding: 0 12px;
        display: inline-block;
    } */
</style>

<div class="most-popular-box">
    Popular:
    <a href="/blog/better-webfont-loading-with-localstorage-and-woff2/">Webfont loading</a>
    &nbsp;&middot;&nbsp;
    <a href="/blog/finding-a-random-document-in-mongodb/">Mongodb random element</a>
    &nbsp;&middot;&nbsp;
    <!-- &middot; -->
    <a href="/blog/automatically-adapting-the-height-textarea/">Textarea auto height</a>
</div>
