const { promisify } = require('util');

const fs = require('fs-extra');

const glob = require('glob');

const find = promisify(glob);

const matter = require('gray-matter');

const sortBy = require('lodash/sortBy');
const reverse = require('lodash/reverse');

const readFile = promisify(fs.readFile);

module.exports = async (path) => {
    const filecontent = await readFile(`content/blog/${path}`);

    const post = {
        path,
        ...matter(filecontent, { excerpt: true, excerpt_separator: '<!-- readmore -->' })
    };

    return {
        _id: post.path,
        date: new Date(post.data.date),
        title: post.data.title,
        description: post.data.description,
        content: post.content,
        tags: post.data.tags,
        abstract: post.excerpt,
        published: post.data.published
    };
};