<style lang="less">
    .most-popular-box {
        background-color: #f1f1f1;
        padding-top: 12px;
        padding-bottom: 12px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding-left: 24px;
        padding-right: 24px;
        overflow-x: auto;

        @media (min-width: 1148px) {
            padding-left: calc((100% - 1100px) / 2);
            padding-right: calc((100% - 1100px) / 2);
        }

        span,
        a {
            display: inline-block;
            margin-right: 12px;
            flex-shrink: 0;
        }

        span {
            font-variant: small-caps;
        }
    }
</style>

<div class="most-popular-box">
    <span>Popular</span>
    <a href="/blog/better-webfont-loading-with-localstorage-and-woff2/">Webfont loading</a>
    <a href="/blog/finding-a-random-document-in-mongodb/">Mongodb random element</a>
    <a href="/blog/automatically-adapting-the-height-textarea/">Textarea auto height</a>
</div>
