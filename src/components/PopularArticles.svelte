<style lang="less">
    .most-popular-box {
        background-color: #f1f1f1;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding-left: 24px;
        padding-right: 24px;
        overflow-x: auto;
        align-items: center;

        @media (min-width: 1148px) {
            padding-left: calc((100% - 1100px) / 2);
            padding-right: calc((100% - 1100px) / 2);
        }

        a {
            display: block;
            flex-shrink: 0;
            padding-top: 12px;
            padding-bottom: 12px;
        }

        a {
            margin: 0 6px;
        }
    }
</style>

<div class="most-popular-box">
    Popular:
    <a href="/blog/better-webfont-loading-with-localstorage-and-woff2/">Webfont loading</a>
    &middot;
    <a href="/blog/finding-a-random-document-in-mongodb/">Mongodb random element</a>
    &middot;
    <a href="/blog/automatically-adapting-the-height-textarea/">Textarea auto height</a>
</div>
