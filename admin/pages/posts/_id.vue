<template>
    <div>
        <h1>{{ post.title }}</h1>

        <p>{{ post.abstract }}</p>

        <textarea rows="30" cols="160" v-model="post.md"></textarea>

        <div v-html="contentHtml"></div>
    </div>
</template>

<script>
import mdit from 'markdown-it';

const md = mdit({
    mdhtml: true,
    linkify: true,
    typographer: true
});

const compileMarkdown = txt => md.render(txt);

export default {
    computed: {
        contentHtml: function() {
            return compileMarkdown(this.post.md);
        }
    },

    async asyncData({ route }) {
        if (process.client) {
            const x= await fetch(`/gql?query=query { post(_id: "${route.params.id}") { published, title, abstract, md } }`).then(r => r.json()).then(({ data }) => data);
            console.log(x);
            return x;
        }
    }
};
</script>