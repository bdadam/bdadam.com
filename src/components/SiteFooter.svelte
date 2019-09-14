<script>
    const year = new Date().getFullYear();
</script>

<style>
    footer {
        padding: 24px;
        border-top: 1px solid #cdcdcd;
        background-color: #f1f1f1;
        text-align: center;
        margin-top: 24px;
    }

    p {
        margin-bottom: 8px;
    }

    .footer-link {
        text-decoration: none;
        margin: 0 8px;
        color: #333;
        display: inline-flex;
        flex-direction: row;
    }

    .footer-link:hover {
        text-decoration: underline;
    }

    svg {
        fill: orange;
        color: orange;
        display: inline-block;
        margin-right: 8px;
    }

    .legal {
        font-size: 0.875em;
        color: #555;
    }
</style>

<footer>
    <p>Adam Beres-Deak &copy; {year}</p>

    <!-- <p>
        <a href="mailto:me@bdadam.com" title="Send me an e-mail">
            <font-awesome-icon :icon="['fas', 'envelope']" />
            &nbsp;E-mail
        </a>

        <a rel="external noopener" target="_blank" href="https://github.com/bdadam" title="View my GitHub profile">
            <font-awesome-icon :icon="['fab', 'github']" />
            &nbsp;GitHub
        </a>
        <a rel="external noopener" target="_blank" href="https://twitter.com/bdadamm" title="Follow me on Twitter">
            <font-awesome-icon :icon="['fab', 'twitter']" />
            &nbsp;Twitter
        </a>

        <a
            rel="external noopener"
            target="_blank"
            href="https://www.linkedin.com/in/bdadam"
            title="Find me on Linked In">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
            &nbsp;LinkedIn
        </a>
        <a
            rel="external noopener"
            target="_blank"
            href="https://www.xing.com/profile/Adam_BeresDeak"
            title="Find me on Xing">
            <font-awesome-icon :icon="['fab', 'xing']" />
            &nbsp;Xing
        </a>
    </p> -->

    <p>
        <a class="footer-link" href="http://feeds.feedburner.com/bdadamcom">
            <svg
                aria-hidden="true"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512">
                <path
                    fill="currentColor"
                    d="M128.081 415.959c0 35.369-28.672 64.041-64.041 64.041S0 451.328 0 415.959s28.672-64.041
                    64.041-64.041 64.04 28.673 64.04 64.041zm175.66
                    47.25c-8.354-154.6-132.185-278.587-286.95-286.95C7.656 175.765 0 183.105 0 192.253v48.069c0 8.415
                    6.49 15.472 14.887 16.018 111.832 7.284 201.473 96.702 208.772 208.772.547 8.397 7.604 14.887 16.018
                    14.887h48.069c9.149.001 16.489-7.655 15.995-16.79zm144.249.288C439.596 229.677 251.465 40.445 16.503
                    32.01 7.473 31.686 0 38.981 0 48.016v48.068c0 8.625 6.835 15.645 15.453 15.999 191.179 7.839 344.627
                    161.316 352.465 352.465.353 8.618 7.373 15.453 15.999 15.453h48.068c9.034-.001 16.329-7.474
                    16.005-16.504z" />
            </svg>
            <span>RSS Feed</span>
        </a>
    </p>

    <hr />

    <p class="legal">
        Except where otherwise noted, content on this site is licensed under a
        <a href="https://creativecommons.org/licenses/by/4.0/" rel="external noopener nofollow" target="_blank">
            Creative Commons Attribution 4.0 International
        </a>
        license.
    </p>

    <p class="legal">
        This site uses some icons from
        <a href="https://fontawesome.com/" rel="external nofollow" target="_blank">Font Awesome</a>
        . Check out their
        <a href="https://fontawesome.com/license" rel="external nofollow" target="_blank">license</a>
        .
    </p>
</footer>
