<template>
    <div style="padding: 30px; max-width: 1100px; margin: 0 auto;">
        <ul>
            <li v-for="post in posts" :key="post._id">
                <nuxt-link :to="`/posts/${post._id}`" style="margin-bottom: 20px; display: block; color: #333;">
                    <h2>{{ post.title }}</h2>
                    <p>{{ post.date }}</p>
                    <span v-if="!post.published" style="padding: 4px 8px; text-decoration: none; background-color: #fcc; border-radius: 2px; color: #333; line-height: 1;">DRAFT</span>
                    <p>{{ post.abstract }}</p>
                    <p>{{ post.abs2 }}</p>
                </nuxt-link>
            </li>

        </ul>
    </div>
</template>

<script>
export default {
    async asyncData({}) {
        if (process.client) {
            return await fetch('/gql?query=query { posts { _id, date, published, title, abstract } }').then(r => r.json()).then(({ data }) => data);
        }
    }
};
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
}

html {
    box-sizing: border-box;
    line-height: 1.4;
    font-size: 100%;
}

*, *:before, *:after {
    box-sizing: inherit;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

h1, h2, h3 {
    line-height: 1.3;
    padding: 0.3em 0 0.5em;
}

a {
    color: #1a0dab;
}

a:link, a:visited {
    text-decoration: none;
}

a:hover, a:active {
    text-decoration: underline;
}
</style>