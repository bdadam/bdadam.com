<template>
    <div>
        <a @click.prevent="$router.go(-1)" href="/">Back</a>

        <h1>{{ post.title }}</h1>
        <form>
            <label>meta.title</label>
            <input type="text" v-model="post.title">
        </form>
        <div style="display: flex; flex-direction: row;">
            <div style="width: 45%;">
                <textarea style="width: 100%; display: block; height: 100%;" v-model="post.content"></textarea>
            </div>
            <div style="width: 45%; margin-left: 4%;">
                <div v-html="contentHtml"></div>
            </div>
        </div>
    </div>
</template>

<script>
import mdit from 'markdown-it';

const md = mdit({
    html: true,
    linkify: true,
    typographer: true
});

const compileMarkdown = txt => md.render(txt);

export default {
    computed: {
        contentHtml: function() {
            return compileMarkdown(this.post.content);
        }
    },

    async asyncData({ route }) {
        if (process.client) {
            return await fetch(`/gql?query=query { post(_id: "${route.params.id}") { published, title, abstract, content } }`).then(r => r.json()).then(({ data }) => data);
        }
    }
};
</script>