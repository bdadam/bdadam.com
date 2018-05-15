<template>
    <div>
        <ul>
            <li v-for="post in posts" :key="post._id">
                <nuxt-link :to="`/posts/${post._id}`" style="text-decoration: none;">
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

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
</style>