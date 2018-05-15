const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const dateFormat = require('dateformat');

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

const matter = require('gray-matter');
const writePost = (post, id) => {
    const content = `${(post.abstract || '').trim()}\n\n<!-- readmore -->\n\n${(post.content || '').trim()}`.replace(/\r/g, '');
    const slug = post.filename.replace(/\.md$/, '');
    const date = new Date(post.date);

    const fm = matter.stringify(`\n${content}`, {
        title: post.title,
        description: post.description || '',
        date: new Date(post.date),
        tags: post.tags || []
    });

    // const datePrefix = dateFormat(post.date, 'yyyy-mm-dd-HH-MM-ss');
    // fs.writeFileSync(`content/blog/${datePrefix}-${slug}.md`, fm);
    fs.writeFileSync(`content/blog/${id.toString().padStart(4, '0')}-${slug}.md`, fm);
};

(async () => {
    // await db.posts.ensureIndex({ fieldName: 'slug', unique: true });

    const postFiles = await findPosts();
    const posts = postFiles.map(file => ({ filename: path.basename(file), ...yfm.loadFront(fs.readFileSync(file), { contentKeyName: 'content' }) }));
    posts.sort((p1, p2) => {
        return new Date(p1.date) - new Date(p2.date);
    });

    fs.ensureDirSync('content/blog');

    let i = 1;
    posts.forEach(post => writePost(post, i++));

    // await Promise.all(posts.map(importPost));

    // db.posts.persistence.compactDatafile();
})();
