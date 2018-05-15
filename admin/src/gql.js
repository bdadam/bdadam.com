const { Router } = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const router = Router();

const schema = buildSchema(`
    type Query {
        posts: [Post]
        post(_id: ID!): Post
    }

    type Post {
        _id: ID!,
        date: String
        published: Boolean
        title: String
        abstract: String
        description: String
        content: String
        tags: [String]
    }
`);

const Datastore = require('nedb-promises');
const db = {
    posts: Datastore.create('posts.nedb')
};

const findPost = require('./services/findPost');
const findPosts = require('./services/findPosts');

const resolver = {
    async posts() {
        return findPosts();
    },
    async post({ _id }) {
        return findPost(_id);
    }
    //  async posts() {
    //     const posts = await db.posts.find({}).sort({ date: -1 }).exec()
    //     return posts;
    // },
    // async post({ _id }) {
    //     return db.posts.findOne({ _id });
    //     // console.log(_id);
    //     // return { title: 'TEST' };
    // }
};

router.use(graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

module.exports = router;