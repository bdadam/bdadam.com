<template>
    <div class="sidebar">
        <div class="box">
            <p class="bold">
                Adam Beres-Deak
                <br />
                <nuxt-link to="/about.html" style="font-weight: normal;">about me</nuxt-link>
            </p>

            <div style="width: 64px; height: 64px; background-color: #ccc; margin-bottom: 12px;"></div>
            <p class="social-links">
                <a href="mailto:me@bdadam.com" title="Send me an email">
                    <font-awesome-icon :icon="['fas', 'envelope']" />
                </a>
                <a
                    rel="external noopener"
                    target="_blank"
                    href="https://github.com/bdadam"
                    title="View my GitHub profile"
                >
                    <font-awesome-icon :icon="['fab', 'github']" />
                </a>
                <a
                    rel="external noopener"
                    target="_blank"
                    href="https://twitter.com/bdadamm"
                    title="Follow me on Twitter"
                >
                    <font-awesome-icon :icon="['fab', 'twitter']" />
                </a>
                <a
                    rel="external noopener"
                    target="_blank"
                    href="https://www.linkedin.com/in/bdadam"
                    title="Find me on Linked In"
                >
                    <font-awesome-icon :icon="['fab', 'linkedin']" />
                </a>
                <a
                    rel="external noopener"
                    target="_blank"
                    href="https://www.xing.com/profile/Adam_BeresDeak"
                    title="Find me on Xing"
                >
                    <font-awesome-icon :icon="['fab', 'xing']" />
                </a>
            </p>
        </div>

        <div class="box">
            <p class="bold">Interesting Topics</p>
            <ul>
                <li>
                    <a href="/">Articles</a>
                </li>
                <li>
                    <a href="/">Today I learned</a>
                </li>
                <li>
                    <a href="/">Worth watching</a>
                </li>
                <li>
                    <a href="/">JavaScript</a>
                </li>
                <li>
                    <a href="/">Cloud</a>
                </li>
            </ul>
        </div>

        <div class="box">
            <p class="bold">Other Tags</p>
            <nuxt-link to="/tags/tag" class="tag-link">JavaScript</nuxt-link>
            <nuxt-link to="/tags/tag" class="tag-link">CSS</nuxt-link>
            <nuxt-link to="/tags/tag" class="tag-link">AWS</nuxt-link>
            <nuxt-link to="/tags/tag" class="tag-link">GCP</nuxt-link>
            <nuxt-link to="/tags/tag" class="tag-link">Lambda</nuxt-link>
            <nuxt-link to="/tags/tag" class="tag-link">CI/CD</nuxt-link>
            <nuxt-link to="/tags/tag" class="tag-link">Node.js</nuxt-link>
            <nuxt-link to="/tags/tag" class="tag-link">Express</nuxt-link>
            <nuxt-link to="/tags/tag" class="tag-link">Mongo DB</nuxt-link>
            <nuxt-link to="/tags/tag" class="tag-link">SQLite</nuxt-link>
        </div>

        <!-- <p class="bold">Most read articles</p>
        <ul>
            <li>
                <a href="/">Labore ut magna irure culpa voluptate</a>
            </li>
            <li>
                <a href="/">Laborum irure ullamco fugiat est nisi Lorem</a>
            </li>
            <li>
                <a href="/">Magna irure culpa voluptate laborum irure ullamco fugiat est nisi Lorem</a>
            </li>
        </ul>-->

        <!-- <p>
            <a href="mailto:me@bdadam.com">
                <font-awesome-icon :icon="['fas', 'envelope']" />&nbsp;E-mail
            </a>

            <a rel="external noopener" target="_blank" href="https://github.com/bdadam">
                <font-awesome-icon :icon="['fab', 'github']" />&nbsp;GitHub
            </a>
            <a rel="external noopener" target="_blank" href="https://twitter.com/bdadamm">
                <font-awesome-icon :icon="['fab', 'twitter']" />&nbsp;Twitter
            </a>

            <a rel="external noopener" target="_blank" href="https://www.linkedin.com/in/bdadam">
                <font-awesome-icon :icon="['fab', 'linkedin']" />&nbsp;LinkedIn
            </a>
            <a
                rel="external noopener"
                target="_blank"
                href="https://www.xing.com/profile/Adam_BeresDeak"
            >
                <font-awesome-icon :icon="['fab', 'xing']" />&nbsp;Xing
            </a>
        </p>-->

        <!-- <p>
            <a href="http://feeds.feedburner.com/bdadamcom">
                <font-awesome-icon :icon="['fas', 'rss']" />&nbsp;RSS Feed
            </a>
        </p>-->
    </div>
</template>

<style lang="less" scoped>
.sidebar {
    padding-right: 24px;
}

.box {
    margin-bottom: 12px;

    & > p:first-child {
        font-weight: bold;
        margin-bottom: 6px;
    }
}

.social-links {
    display: flex;
    flex-direction: row;

    a {
        margin-right: 12px;
    }
    // justify-content: space-between;
    // justify-content: space-evenly;
}

.tag-link {
    display: inline-block;
    border: 1px solid #ddd;
    padding: 4px 8px;
    border-radius: 3px;
    margin-bottom: 4px;
}
</style>