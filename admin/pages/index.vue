<template>
    <div>
        <ul>
            <li v-for="post in posts" :key="post._id">
                <nuxt-link :to="`/posts/${post._id}`">
                    <input type="checkbox" v-model="post.published">
                    <h2>{{ post.title }}</h2>
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
            return await fetch('/gql?query=query { posts { _id, published, title, abstract } }').then(r => r.json()).then(({ data }) => data);
        }
    }
};
</script>