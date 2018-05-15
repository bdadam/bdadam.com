const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const { promisify } = require('util');

const yfm = require('yaml-front-matter');

const findPosts = () => promisify(glob)('../src/content/blog/*.md');

const Datastore = require('nedb-promises');

const db = {
    posts: Datastore.create('posts.nedb')
};

const updatePost = promisify(db.posts.update.bind(db.posts));

const importPost = async post => {
    const slug = post.filename.replace(/\.md$/, '');
    await db.posts.update({ slug }, {
        slug,
        title: post.title,
        description: post.description,
        published: 'published' in post ? post.published : true,
        date: post.date,
        tags: post.tags,

        abstract: (post.abstract || '').replace(/\r/g, ''),
        md: `${(post.abstract || '').trim()}\n\n${(post.content || '').trim()}`.replace(/\r/g, '')

    }, { upsert: true });
};

(async () => {
    await db.posts.ensureIndex({ fieldName: 'slug', unique: true });

    const postFiles = await findPosts();
    const posts = postFiles.map(file => ({ filename: path.basename(file), ...yfm.loadFront(fs.readFileSync(file), { contentKeyName: 'content' }) }));

    await Promise.all(posts.map(importPost));

    db.posts.persistence.compactDatafile();
})();
