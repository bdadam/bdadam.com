<script>
    import { fade } from 'svelte/transition';

    export let title = '';
    export let url = '';
    export let tags = [];

    let copiedToClipboard = false;
    let copyToClipboardTimeout;

    const fburl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`;
    // const twurl = `http://twitter.com/share?url=${encodeURIComponent(url)}`;
    const twurl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(
        'https://bdadam.com/blog/displaying-icons-with-custom-elements.html'
    )}&via=bdadamm&hashtags=${tags.join(',').replace(/ /g, '')}`;
    const mailto = `mailto:`;
    const waurl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;

    const copyToClipboard = () => {
        copiedToClipboard = true;
        clearTimeout(copyToClipboardTimeout);

        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style =
            'position:fixed;top:0;left:0;width:2em;height:2em;padding:0;border:0;outline:0;box-shadow:none;background:transparent;';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (err) {}

        document.body.removeChild(textArea);

        copyToClipboardTimeout = setTimeout(() => {
            copiedToClipboard = false;
        }, 2000);
    };
</script>

<style lang="less">
    div {
        padding: 12px 0;
        display: grid;
        grid-gap: 12px 12px;
        justify-content: stretch;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }

    a,
    button {
        line-height: 1;
        display: flex;
        align-items: center;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 12px 16px;
        white-space: nowrap;

        &:hover,
        &:active {
            text-decoration: none;
        }

        &::after {
            content: '';
        }
    }

    svg {
        margin-right: 8px;
    }

    .mail {
        background-color: #d44638;

        &:hover {
            background-color: darken(#d44638, 10%);
        }

        &:active {
            background-color: darken(#d44638, 15%);
        }
    }

    .tw {
        background-color: #00aced;

        &:hover {
            background-color: darken(#00aced, 10%);
        }

        &:active {
            background-color: darken(#00aced, 15%);
        }
    }

    .fb {
        background-color: #3b5998;

        &:hover {
            background-color: darken(#3b5998, 10%);
        }

        &:active {
            background-color: darken(#3b5998, 15%);
        }
    }

    .wa {
        background-color: #25d366;

        &:hover {
            background-color: darken(#25d366, 10%);
        }

        &:active {
            background-color: darken(#25d366, 15%);
        }
    }

    .cp {
        background-color: #222;

        &:hover {
            background-color: darken(#222, 20%);
        }

        &:focus {
            background-color: darken(#222, 30%);
        }
    }

    svg[viewBox='0 0 512 512'] {
        width: 16px;
    }

    svg[viewBox='0 0 448 512'] {
        width: 14px;
    }

    /* svg[viewBox='0 0 384 512'] {
        width: 12px;
    } */

    svg[viewBox='0 0 320 512'] {
        width: 10px;
    }
</style>

<div>
    <a href={twurl} class="tw" rel="external nofollow" target="_blank">
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                fill="currentColor"
                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452
                0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568
                130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0
                18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431
                13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3
                105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934
                30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366
                44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
        </svg>
        Twitter
    </a>
    <a href={fburl} class="fb" rel="external nofollow" target="_blank">
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
                fill="currentColor"
                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36
                0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
        </svg>
        Facebook
    </a>
    <a href={mailto} class="mail" target="_blank">
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                fill="currentColor"
                d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49
                48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841
                13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067
                48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134
                55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401
                104.947-82.653V400H48z" />
        </svg>
        E-mail
    </a>
    <a href={waurl} class="wa" rel="external nofollow" target="_blank">
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                fill="currentColor"
                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0
                480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157
                341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7
                82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9
                184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6
                21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3
                1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7
                0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2
                15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
        Whatsapp
    </a>
    <button class="cp" on:click|preventDefault={copyToClipboard}>
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                fill="currentColor"
                d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24
                24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24
                24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0
                0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z" />
        </svg>
        {#if copiedToClipboard}Link copied{:else}Copy link{/if}
    </button>
</div>
