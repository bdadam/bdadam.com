<template>
    <footer class="site-footer">
        <p>Adam Beres-Deak &copy; 2019</p>

        <p>
            <a href="mailto:me@bdadam.com" title="Send me an e-mail">
                <font-awesome-icon :icon="['fas', 'envelope']" />&nbsp;E-mail
            </a>

            <a
                rel="external noopener"
                target="_blank"
                href="https://github.com/bdadam"
                title="View my GitHub profile"
            >
                <font-awesome-icon :icon="['fab', 'github']" />&nbsp;GitHub
            </a>
            <a
                rel="external noopener"
                target="_blank"
                href="https://twitter.com/bdadamm"
                title="Follow me on Twitter"
            >
                <font-awesome-icon :icon="['fab', 'twitter']" />&nbsp;Twitter
            </a>

            <a
                rel="external noopener"
                target="_blank"
                href="https://www.linkedin.com/in/bdadam"
                title="Find me on Linked In"
            >
                <font-awesome-icon :icon="['fab', 'linkedin']" />&nbsp;LinkedIn
            </a>
            <a
                rel="external noopener"
                target="_blank"
                href="https://www.xing.com/profile/Adam_BeresDeak"
                title="Find me on Xing"
            >
                <font-awesome-icon :icon="['fab', 'xing']" />&nbsp;Xing
            </a>
        </p>

        <p>
            <a href="http://feeds.feedburner.com/bdadamcom">
                <font-awesome-icon :icon="['fas', 'rss']" />&nbsp;RSS Feed
            </a>
        </p>
    </footer>
</template>

<style lang="less" scoped>
footer {
    padding: 24px 0;
    border-top: 1px solid #cdcdcd;
    background-color: #f1f1f1;
    text-align: center;
}

p {
    margin-bottom: 10px;
}

a {
    text-decoration: none;
    margin: 0 8px;
}
</style>