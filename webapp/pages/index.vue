<script>
import Sidebar from '../components/Sidebar';
export default {
    layout: 'default',
    async asyncData() {
        if (process.client)
    },
    data() {
        return {
            latestArticles: [
                {
                    date: 'April 21, 2015',
                    url: '/blog/abc.html',
                    title: 'Dolore laborum incididunt qui ullamco excepteur nostrud incididunt culpa Lorem duis elit',
                    intro:
                        'Tempor adipisicing aliqua tempor in officia excepteur consequat non ad aliquip in ea. Sint commodo commodo ex minim deserunt amet cupidatat ex incididunt. Aliqua fugiat anim ipsum eiusmod non ullamco consequat eu. Veniam labore velit officia tempor. Non labore proident qui ullamco deserunt enim consequat nisi. Occaecat exercitation mollit incididunt veniam excepteur elit consectetur id esse incididunt veniam occaecat nostrud.',
                    hasMore: true,
                },
                {
                    date: 'April 13, 2015',
                    url: '/blog/qwe.html',
                    title: 'Eiusmod tempor proident culpa adipisicing sunt',
                    intro:
                        'Dolore tempor quis ut eu non non. Nostrud excepteur nulla occaecat cillum sit velit ipsum nostrud. Duis ullamco sit irure exercitation mollit tempor pariatur ipsum enim aute commodo veniam culpa quis.',
                    hasMore: true,
                },
                {
                    date: 'February 17, 2014',
                    url: '/blog/asdf.html',
                    title: 'NO READMORE - Ex sint sit fugiat labore',
                    intro:
                        'Pariatur reprehenderit pariatur anim ad culpa. Quis dolore id incididunt sunt. Incididunt non ut mollit veniam laborum ex sunt irure irure quis reprehenderit proident. Occaecat cillum qui culpa deserunt pariatur cillum ullamco qui. Proident ipsum dolore ex eiusmod enim dolore velit esse. Cillum excepteur aliquip duis nulla id incididunt commodo dolor. Fugiat amet id anim aliqua.',
                    hasMore: false,
                },
            ],
        };
    },
    components: {
        Sidebar,
    },
};
</script>

<template>
    <div class="page">
        <div class="sidebar">
            <Sidebar />
        </div>
        <div class="content">
            <h2>Popular articles</h2>
            <ul class="unstyled">
                <li v-for="article in latestArticles" :key="article.url">
                    <nuxt-link :to="article.url">{{article.title}}</nuxt-link>
                </li>
            </ul>

            <h2>Latest articles</h2>
            <ul class="unstyled article-list">
                <li v-for="article in latestArticles" :key="article.url">
                    <nuxt-link :to="article.url" class="title">{{article.title}}</nuxt-link>
                    <p class="date">{{article.date}}</p>
                    <p class="intro">{{ article.intro}}</p>
                    <nuxt-link
                        v-if="article.hasMore"
                        :to="article.url"
                        class="read-more"
                    >Read article</nuxt-link>
                </li>
            </ul>

            <nuxt-link to="/blog/">See all blog articles</nuxt-link>
        </div>
    </div>
</template>

<style lang="less" scoped>
.page {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.sidebar {
    flex: 1;
}

.content {
    flex: 3;
}

.article-list {
    list-style-type: none;
    padding: 0;

    li {
        margin-bottom: 20px;
    }

    .title {
        color: #333;
        font-size: 1.25rem;
        font-weight: bold;
        display: block;
        margin-bottom: 12px;
    }

    .date {
        margin-bottom: 4px;
    }

    .intro {
        margin-bottom: 4px;
    }

    .read-more {
    }
}
</style>

