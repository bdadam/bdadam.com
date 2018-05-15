const { Router } = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const router = Router();

const schema = buildSchema(`
    type Query {
        post(_id: ID!): Post
        posts: [Post]
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
};

router.use(graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

module.exports = router;